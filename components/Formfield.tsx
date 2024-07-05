import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-sm text-black font-pmedium">{title}</Text>

      <View className=" h-14 px-4 bg-black-100 rounded-2xl bg-[#ddd]/50 border border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-pregular text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#111"
          autoCorrect={false}
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Password" || title === "Confirm Password") &&
            !showPassword
          }
          {...props}
        />

        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <Ionicons name="eye" size={20} />
            ) : (
              <Ionicons name="eye-off" size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
