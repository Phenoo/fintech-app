import {
  AppState,
  AppStateStatic,
  AppStateStatus,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "inactive-storage",
});

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const recordtime = () => {
    storage.set("startTime", Date.now());
  };

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    console.log("🚀 ~ handleAppStateChange ~ nextAppState", nextAppState);

    if (nextAppState === "background") {
      recordtime();
    } else if (
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      const elapsed = Date.now() - (storage.getNumber("startTime") || 0);
      console.log("🚀 ~ handleAppStateChange ~ elapsed:", elapsed);

      if (elapsed > 3000) {
        router.replace("/lock");
      }
    }
    appState.current = nextAppState;
  };

  return children;
};
