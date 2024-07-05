import React, { useCallback, useEffect, useState } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  View,
  ScrollView,
  Image,
} from "react-native";

import { PlaidLink, LinkExit, LinkSuccess } from "react-native-plaid-link-sdk";

import { create, open } from "react-native-plaid-link-sdk/dist/PlaidLink";

import logo from "../../assets/icons8-money-50.png";

import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { router } from "expo-router";

function isValidString(str: string): boolean {
  if (str && str.trim() !== "") {
    return true;
  }
  return false;
}

const LinkAccount = ({ account, setAccount, handleSubmit, setIndex }: any) => {
  // Render using the link_token integration. Refer to the docs
  // https://plaid.com/docs/#create-link-token on how to create
  // a new link_token.

  // Use event emitter to get real time events during a Link Session.

  const [text, onChangeText] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  const [linkToken, setLinkToken] = useState(null);
  const address = Platform.OS === "ios" ? "localhost" : "10.0.2.2";

  console.log(linkToken, "link");

  const createLinkToken = useCallback(async () => {
    await fetch(`http://${address}:8080/api/create_link_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: address }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLinkToken(data.link_token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setLinkToken]);

  // const handleSetAccessToken = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://${address}:8080/api/set_access_token`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           public_token: "public-sandbox-7f1e5772-3927-478d-8943-4a248992b4df",
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.text();
  //       console.error("Failed to set access token:", errorData);
  //       return;
  //     }

  //     const data = await response.json();
  //     console.log("Access token set successfully:", data);
  //   } catch (error) {
  //     console.error("Error occurred while setting access token:", error);
  //   }
  // };

  // const handleGetAccounts = async () => {
  //   try {
  //     const response = await fetch(`http://${address}:8080/api/transactions`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.text();
  //       console.error("Failed to get accounts:", errorData);
  //       return;
  //     }

  //     const data = await response.json();
  //     console.log("Accounts retrieved successfully:", data);
  //   } catch (error) {
  //     console.error("Error occurred while getting accounts:", error);
  //   }
  // };
  useEffect(() => {
    // handleGetAccounts();

    createLinkToken();
    // handleSetAccessToken();
  }, []);

  return (
    <View
      className="w-full  h-full  "
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View className="space-y-1 mt-4">
        <Text className="text-2xl font-pbold mb-2 ">Link your account</Text>
        <Text className="text-base font-pregular mb-8">
          Link your bank account to Descopay to get started.
        </Text>
      </View>
      {!account ? (
        <PlaidLink
          tokenConfig={{
            token: linkToken ? linkToken : "",
            noLoadingState: false,
          }}
          onSuccess={async (success: LinkSuccess) => {
            await fetch(`http://${address}:8080/api/exchange_public_token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ public_token: success.publicToken }),
            }).catch((err) => {
              console.log(err);
            });
            console.log("success");
            setAccount(success.publicToken);
            console.log("ś");
            // router.push("/(tabs)/index");
            // navigation.navigate('Success', success);
          }}
          onExit={(response: LinkExit) => {
            console.log(response);
          }}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Connect Account</Text>
          </View>
        </PlaidLink>
      ) : (
        <>
          <TouchableOpacity
            onPress={handleSubmit}
            className="rounded-3xl mt-8 flex items-center justify-center h-12 bg-black"
          >
            <Text className="text-white text-base font-pregular">
              Finish Setup
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LinkAccount;

const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    paddingHorizontal: 32,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingBottom: 32,
  },
  body: {
    flex: 1,
    paddingHorizontal: 32,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  baseText: {
    fontSize: 16,
    marginTop: 8,
    color: "#4B4B4B",
    textAlign: "left",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 36,
    marginHorizontal: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  buttonContainer: {
    elevation: 4,
    backgroundColor: "#000",
    width: "100%",
    justifyContent: "center",
    height: 48,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    backgroundColor: "#000",
    alignSelf: "center",
    textTransform: "capitalize",
    fontFamily: "pregular",
  },
});
