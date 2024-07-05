import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

import homepic from "../assets/undraw_Bitcoin_P2P_re_1xqa.png";

const HomePage = () => {
  return (
    <View className="h-full bg-white flex justify-center flex-col gap-4">
      <View className="flex justify-between h-full p-6 items mt-10 pt-20">
        <View className="flex justify-between flex-1 flex-col gap-4 items-center">
          <Image
            source={homepic}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />
          <View>
            <Text className="text-2xl font-pmedium text-center">
              We are just getting started
            </Text>
            <Text className="text-gray-500 text-center font-pmedium mt-1">
              We are shaping the future of currency and are committed to
              delivering the most secure, edge-cutting financial solutions.
              Welcome Aboard
            </Text>
          </View>
          <View className="flex justify-center items-center w-full m-2 ">
            <TouchableOpacity
              onPress={() => {
                router.push("/(auth)/sign-up");
              }}
              className=" p-4 h-14 flex justify-center  rounded-3xl w-full bg-black text-white"
            >
              <Text className="text-white text-center text-base font-pregular">
                Get started
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/(auth)/sign-in");
              }}
              className=" p-4 h-14 flex justify-center  rounded-3xl w-full bg-[#ddd] mt-4 text-white"
            >
              <Text className="text-black text-center text-base font-pregular">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
