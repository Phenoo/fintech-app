import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Lock = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text>Lock</Text>
      </View>
    </SafeAreaView>
  );
};

export default Lock;

const styles = StyleSheet.create({});
