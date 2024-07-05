import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Slot, SplashScreen, Stack, useRouter } from "expo-router";
// import {
//   useFonts,
//   DMSans_900Black,
//   DMSans_400Regular,
//   DMSans_500Medium,
//   DMSans_700Bold,
//   DMSans_600SemiBold,
//   DMSans_300Light,
// } from "@expo-google-fonts/inter";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";

import {
  useFonts as useFontsAbo,
  MontaguSlab_700Bold,
} from "@expo-google-fonts/montagu-slab";

import {
  useFonts as useFontsLob,
  LobsterTwo_700Bold,
} from "@expo-google-fonts/lobster-two";

import { PlaidProvider } from "react-native-use-plaid";
import GlobalProvider from "../context/context";
import { UserInactivityProvider } from "../components/UserInactivity";
import { FontAwesome5 } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": DMSans_400Regular,
    "Inter-Medium": DMSans_500Medium,
    "Inter-SemiBold": DMSans_500Medium,
    "Inter-Black": DMSans_700Bold,
    DMSans_700Bold,
  });

  const [fontsLoadedAbo, fontErrorAbo] = useFontsAbo({
    "Inter-Bold": MontaguSlab_700Bold,
  });

  const [fontsLoadedLob, fontErrorLob] = useFontsLob({
    "Inter-Lob": LobsterTwo_700Bold,
  });

  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded || fontsLoadedAbo || fontsLoadedLob)
      SplashScreen.hideAsync();
    if (fontError || fontErrorAbo) throw new Error();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <UserInactivityProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="lock"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </UserInactivityProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
