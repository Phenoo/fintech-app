import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FormField from "./Formfield";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "../assets/icons8-money-50.png";
import { Link, router } from "expo-router";
import { signIn, signOut } from "../lib/appwrite";

const Container = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/(tabs)/");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      className="h-full"
    >
      <ScrollView keyboardDismissMode="on-drag">
        <KeyboardAvoidingView>
          <View className="flex-1 w-full flex justify-center h-full px-4 my-6">
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                width: "100%",
              }}
            >
              <View className="space-y-1 mt-8">
                <Text className="text-2xl font-pbold tex">Sign in</Text>
                <Text className="text-base font-pregular">
                  Please enter your details
                </Text>
              </View>

              <View className="justify-center mt-4">
                <FormField
                  title={"Email"}
                  keyboardType="email-address"
                  placeholder={"Email Address"}
                  otherStyles={"mt-4"}
                  value={form.email}
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                />
                <FormField
                  title={"Password"}
                  placeholder={"Password"}
                  otherStyles={"mt-6"}
                  value={form.password}
                  handleChangeText={(e) => setForm({ ...form, password: e })}
                />
              </View>
              <TouchableOpacity
                onPress={submit}
                className="rounded-3xl mt-8 flex items-center justify-center w-full h-14 bg-black"
              >
                <Text className="text-white text-base font-pregular">
                  Submit
                </Text>
              </TouchableOpacity>

              <Pressable
                className="my-6"
                onPress={() => router.push("/(auth)/sign-up")}
              >
                <Text className="text-center">
                  Don't have an account?{" "}
                  <Text className="text-gray-500">Sign Up</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({});
