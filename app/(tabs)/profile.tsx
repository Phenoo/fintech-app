import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "../../lib/appwrite";

import * as SecureStore from "expo-secure-store";
import { Link, useRouter } from "expo-router";

const Tablayout = () => {
  const router = useRouter();

  const logout = async () => {
    await signOut();
    await SecureStore.deleteItemAsync("session");
    router.replace("(auth)/sign-in");
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={logout}>
        <Text>sign out</Text>
      </TouchableOpacity>

      <Link href={"/(auth)/sign-in"}>dddd</Link>
    </SafeAreaView>
  );
};

export default Tablayout;

const styles = StyleSheet.create({});
