import { Platform } from "react-native";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
import * as SecureStore from "expo-secure-store";

const address = Platform.OS === "ios" ? "localhost" : "10.0.2.2";

const createDwollaCustomer = async (userData) => {
  console.log(userData);
  try {
    const response = await fetch(
      `http://${address}:8080/api/create_dwolla_customer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@example.com",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.location; // Assuming the API returns { location: 'customer_url' }
    } else {
      const errorData = await response.json();
      console.error("Failed to create Dwolla customer:", errorData);
      throw new Error("Failed to create Dwolla customer");
    }
  } catch (error) {
    console.error("Error occurred while creating Dwolla customer:", error);
    throw error;
  }
};

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.desco.taurus",
  projectId: "6678286e001cdd32333d",
  databaseId: "667829dd00171e02c698",
  userCollectionId: "667829fe000330c17461",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId) // Your project ID
  .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const databases = new Databases(client);

export async function createUser({ password, email, ...userData }) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      userData.firstName
    );

    if (!newAccount) throw Error;

    // if (!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer");

    // const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
    // console.log(dwollaCustomerId);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        userId: newAccount.$id,
        email: email,
        ...userData,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

// Register User

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    const sessionMain = JSON.stringify(session);
    save("session", sessionMain);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("userId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
