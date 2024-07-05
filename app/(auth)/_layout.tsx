import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/context";
import * as SecureStore from "expo-secure-store";

import logo from "../../assets/icons8-money-50.png";

const AuthLayout = () => {
  const [session, setSession] = useState(null);

  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    setSession(result);
  }

  useEffect(() => {
    getValueFor("session");
  });

  if (session) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerTransparent: true,
            headerBackButtonMenuEnabled: false,
            headerLeft: () => <View></View>,
            headerTitle: () => (
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View>
                  <Image
                    source={logo}
                    resizeMode="contain"
                    width={25}
                    height={25}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </View>
                <View>
                  <Text className="font-pblack text-base uppercase">
                    Descopay
                  </Text>
                </View>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerTransparent: true,
            headerBackButtonMenuEnabled: false,
            headerLeft: () => <View></View>,
            headerTitle: () => (
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View>
                  <Image
                    source={logo}
                    resizeMode="contain"
                    width={25}
                    height={25}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </View>
                <View>
                  <Text className="font-pblack text-base uppercase">
                    Descopay
                  </Text>
                </View>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="link-account"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
