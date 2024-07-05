import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

// import { icons } from "../../constants";
// import { Loader } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  const size = Platform.OS === "ios" ? 28 : 22;
  return <Ionicons size={size} style={styles.tabBarIcon} {...props} />;
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});

const TabLayout = () => {
  //   const { loading, isLogged } = useGlobalContext();

  //   if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#111",
          tabBarInactiveTintColor: "#808080",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#ddd",
            alignItems: "center",
            justifyContent: "center",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cards"
          options={{
            title: "Cards",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "card" : "card-outline"}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="transactions"
          options={{
            title: "Transactions",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "wallet-sharp" : "wallet-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
