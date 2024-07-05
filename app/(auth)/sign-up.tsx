import {
  Button,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CountryList, CountryPicker } from "react-native-country-codes-picker";

import * as LocalAuthentication from "expo-local-authentication";

import * as Haptics from "expo-haptics";

import DateTimePicker from "@react-native-community/datetimepicker";

import DatePicker from "react-native-date-picker";

import logo from "../../assets/icons8-money-50.png";
import FormField from "../../components/Formfield";

import { format } from "date-fns";

import PagerView from "react-native-pager-view";
import { router, useRouter } from "expo-router";
import { createUser } from "../../lib/appwrite";
import LinkAccount from "./link-account";

import rocket from "../../assets/undraw_Outer_space_re_u9vd.png";

import security from "../../assets/undraw_Security_on_re_e491.png";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const SignUpScreen = () => {
  const [index, setIndex] = React.useState(0);
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    ssn: "",
  });
  const [countryCode, setCountryCode] = React.useState("+1");
  const [show, setShow] = React.useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [account, setAccount] = useState();
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onBiometricAuthPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      router.replace("/(tabs)/");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    handleInputChange("dateOfBirth", currentDate.toDateString());
  };

  const onNumberPress = (number: number) => {
    setCode([...code, number]);
  };

  const numberBackspace = () => {
    setCode(code.slice(0, -1));
  };

  const validateStepOne = () => {
    const { firstName, lastName, email, password } = formData;
    return firstName && lastName && email && password;
  };

  const validateStepTwo = () => {
    const { mobileNumber, dateOfBirth, address, city, state, postalCode, ssn } =
      formData;
    return (
      mobileNumber &&
      dateOfBirth &&
      address &&
      city &&
      state &&
      postalCode &&
      ssn
    );
  };

  const handleNextStep = () => {
    if (index === 0 && validateStepOne()) {
      setIndex(1);
    } else if (index === 1 && validateStepTwo()) {
    } else {
      alert("Please fill out all fields correctly.");
    }
  };
  const handlePreviousStep = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      router.push("/(auth)/sign-in");
    }
  };

  const handleSubmit = async () => {
    const data = {
      public_token: account,
      ...formData,
    };

    try {
      const newUser = await createUser(data);
      console.log("User signed up successfully:", newUser);
      router.replace("/(tabs)/");
    } catch (error) {
      console.error("Sign up failed:", error);
      alert("Sign up failed, please try again.");
    }
  };

  const validatePassword = (pwd: string) => {
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(pwd);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 15 }}>
          <TouchableOpacity
            className=" mt-4 bg-[#ddd]/50 w-10 rounded-full justify-center items-center h-10 mb-4"
            onPress={handlePreviousStep}
          >
            <Ionicons name="chevron-back" size={18} />
          </TouchableOpacity>
          {index === 0 && (
            <View className="h-full flex-1" key="1" style={{ flex: 1 }}>
              <View className="flex-1">
                <Text className="text-2xl mb-2 font-pbold">
                  Let's get started
                </Text>
                <View>
                  <Image
                    source={rocket}
                    resizeMode="contain"
                    style={{ width: "100%", height: 300 }}
                  />
                </View>
              </View>
              <View className="gap-4">
                <View className="border rounded-xl p-4 flex flex-row items-center gap-x-4">
                  <View>
                    <View className="bg-black w-6 h-6 flex justify-center rounded-full">
                      <Text className="text-white font-pmedium text-xs text-center">
                        1
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View>
                      <Text className="text-lg font-pmedium">
                        Create your account
                      </Text>
                      <Text className="font-pmedium opacity-50 text-xs">
                        Adding your location and account details{" "}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="border rounded-xl p-4 flex flex-row items-center gap-x-4">
                  <View>
                    <View className="bg-black w-6 h-6 flex justify-center rounded-full">
                      <Text className="text-white font-pmedium text-xs text-center">
                        2
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View>
                      <Text className="text-lg font-pmedium">
                        Secure your account
                      </Text>
                      <Text className="font-pmedium opacity-50 text-xs">
                        Using your email and password
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="border rounded-xl p-4 flex flex-row items-center gap-x-4">
                  <View>
                    <View className="bg-black w-6 h-6 flex justify-center rounded-full">
                      <Text className="text-white font-pmedium text-xs text-center">
                        1
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View>
                      <Text className="text-lg font-pmedium">
                        Verify your identity
                      </Text>
                      <Text className="font-pmedium opacity-50 text-xs">
                        Providing your ID card or passport
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  className="bg-black p-4 rounded-3xl"
                  onPress={() => setIndex(1)}
                >
                  <Text className="text-white text- text-center font-pmedium">
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {index === 1 && (
            <View className="flex-1">
              <View>
                <Text className="text-2xl font-pbold">
                  What's your name as it appears on official documents?
                </Text>
              </View>
              <View className=" mt-4 flex-1 flex-col justify-between">
                <View>
                  <FormField
                    title="First Name"
                    placeholder="First Name"
                    value={formData.firstName}
                    handleChangeText={(value) =>
                      handleInputChange("firstName", value)
                    }
                    otherStyles="mt-4"
                  />
                  <FormField
                    title="Last Name"
                    placeholder="Last Name"
                    value={formData.lastName}
                    handleChangeText={(value) =>
                      handleInputChange("lastName", value)
                    }
                    otherStyles="mt-8"
                  />
                </View>
                <View>
                  <TouchableOpacity
                    className="bg-black p-4 rounded-3xl"
                    onPress={() => setIndex(2)}
                  >
                    <Text className="text-white text- text-center font-pmedium">
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {index === 2 && (
            <View className="flex-1">
              <View>
                <Text className="text-2xl font-pbold">
                  What's your email address?
                </Text>
              </View>
              <View className=" mt-4 flex-1 flex-col justify-between">
                <View>
                  <FormField
                    title="Email"
                    keyboardType="email-address"
                    placeholder="Email Address"
                    value={formData.email}
                    handleChangeText={(value) =>
                      handleInputChange("email", value)
                    }
                    otherStyles="mt-4"
                  />
                </View>
                <View>
                  <TouchableOpacity
                    className="bg-black p-4 rounded-3xl"
                    onPress={() => setIndex(3)}
                  >
                    <Text className="text-white text- text-center font-pmedium">
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {index === 3 && (
            <View className="flex-1">
              <View>
                <Text className="text-2xl font-pbold">
                  What's your phone number?
                </Text>
              </View>
              <View className=" mt-4 flex-1 flex-col justify-between">
                <View>
                  <View style={{}}>
                    <Text className="mb-1 mt-4 text-sm text-black font-pmedium">
                      Phone Number
                    </Text>
                    <View className="flex flex-row items-center">
                      <TouchableOpacity
                        onPress={() => setShow(true)}
                        style={{
                          width: "20%",
                          height: 56,
                          backgroundColor: "black",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="rounded-l-2xl"
                      >
                        <Text
                          className="font-pregular text-base"
                          style={{ color: "white" }}
                        >
                          {countryCode}
                        </Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder="Enter your number"
                        placeholderTextColor={"#111"}
                        value={formData.mobileNumber}
                        keyboardType="name-phone-pad"
                        onChangeText={(value) =>
                          handleInputChange("mobileNumber", value)
                        }
                        className="flex-1 pl-2  bg-[#ddd]/50 rounded-l-none rounded-r-2xl  border h-14 "
                      />
                    </View>
                    <CountryPicker
                      lang="en"
                      show={show}
                      pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setShow(false);
                      }}
                    />
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    className="bg-black p-4 rounded-3xl"
                    onPress={() => setIndex(4)}
                  >
                    <Text className="text-white text- text-center font-pmedium">
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {index === 5 && (
            <View className="flex-1">
              <View>
                <Text className="text-2xl font-pbold">How old are you?</Text>
              </View>

              <View className=" mt-4 flex-1 flex-col justify-between">
                <View className="mt-4">
                  <Text className="my-2 text-sm text-black font-pmedium">
                    Date of birth
                  </Text>
                  {showPicker && (
                    <DateTimePicker
                      mode="date"
                      display="spinner"
                      onChange={onChange}
                      value={date}
                    />
                  )}
                  {showPicker && (
                    <TouchableOpacity
                      onPress={() => setShowPicker(false)}
                      className="bg-gray-400 p-2 rounded-md w-20 flex justify-center items-center mx-auto"
                    >
                      <Text className="text-center">Cancel</Text>
                    </TouchableOpacity>
                  )}
                  {!showPicker && (
                    <TouchableOpacity
                      onPress={togglePicker}
                      className="border flex justify-center bg-[#ddd]/50 rounded-2xl"
                    >
                      <Text className="p-5 items-center flex-row font-pregular">
                        {formData.dateOfBirth || "Sat Aug 15, 2010"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    className="bg-black p-4 rounded-3xl"
                    onPress={() => setIndex(6)}
                  >
                    <Text className="text-white text- text-center font-pmedium">
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {index === 6 && (
            <View className="flex-1">
              <View>
                <Text className="text-2xl font-pbold">
                  What's your password?
                </Text>
              </View>
              <View className=" mt-4 flex-1 flex-col justify-between">
                <View>
                  <FormField
                    title="Password"
                    placeholder="Password"
                    value={formData.password}
                    handleChangeText={(value) =>
                      handleInputChange("password", value)
                    }
                    otherStyles="mt-4"
                  />
                  <View className="mt-6">
                    <View className="flex flex-row gap-4">
                      <Text
                        style={{
                          color:
                            formData.password.length < 8 ? "gray" : "green",
                        }}
                      >
                        <Ionicons name="shield-checkmark" size={18} />
                      </Text>
                      <Text
                        style={{
                          color:
                            formData.password.length < 8 ? "gray" : "green",
                        }}
                      >
                        8 characters
                      </Text>
                    </View>
                    <View className="flex flex-row gap-4 mt-0.5">
                      <Text
                        style={{
                          color: validatePassword(formData.password)
                            ? "green"
                            : "gray",
                        }}
                      >
                        <Ionicons name="shield-checkmark" size={18} />
                      </Text>
                      <Text
                        style={{
                          color: validatePassword(formData.password)
                            ? "green"
                            : "gray",
                        }}
                      >
                        A symbol, number, upper-case letter
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View>
                    <Text className="mb-6">
                      By tapping the "Create Account" button, you agree to
                      Desco's{" "}
                      <Text className="text-sky-700 underline">
                        {" "}
                        User Agreement
                      </Text>{" "}
                      and{" "}
                      <Text className="text-sky-700 underline">
                        Privacy Policy
                      </Text>{" "}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="bg-black p-4 rounded-3xl"
                    onPress={() => setIndex(7)}
                  >
                    <Text className="text-white text- text-center font-pmedium">
                      Create Account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {index === 7 && (
            <View className="flex-1">
              <View>
                <Text className="text-2xl font-pbold">
                  Choose a faster way to login to your device
                </Text>
              </View>
              <View className="flex-1 mt-4">
                <Image
                  source={security}
                  resizeMode="contain"
                  style={{ width: "100%", height: 300 }}
                />
                <View className="justify-end flex-1">
                  <TouchableOpacity
                    onPress={onBiometricAuthPress}
                    className="rounded-3xl mt-8 flex items-center justify-center h-14 bg-black"
                  >
                    <Text className="text-white text-base font-pregular">
                      Use Face ID
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIndex(8)}
                    className="rounded-3xl mt-4 flex items-center justify-center h-14 bg-[#ddd]"
                  >
                    <Text className="text-black text-base font-pregular">
                      Create a PIN
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {index === 8 && (
            <View className="h-full pb-36">
              <View className=" flex-1 justify-between flex-col">
                <View>
                  <Text className="text-2xl font-pbold">Create a PIN</Text>
                </View>
                <View className="">
                  <View>
                    <View style={[styles.codeView]}>
                      <View className="border-b border-b-gray-400 w-14  justify-center items-center">
                        <Text
                          style={styles.number}
                          className="text-center font-pregular"
                        >
                          {code[0]}
                        </Text>
                      </View>
                      <View className="border-b border-b-gray-400 w-14  justify-center items-center">
                        <Text style={styles.number} className="text-center">
                          {code[1]}
                        </Text>
                      </View>
                      <View className="border-b border-b-gray-400 w-14  justify-center items-center">
                        <Text style={styles.number} className="text-center">
                          {code[2]}
                        </Text>
                      </View>
                      <View className="border-b border-b-gray-400 w-14  justify-center items-center">
                        <Text style={styles.number} className="text-center">
                          {code[3]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.numbersView}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {[1, 2, 3].map((number) => (
                          <TouchableOpacity
                            key={number}
                            onPress={() => onNumberPress(number)}
                            disabled={code.length > 3}
                          >
                            <Text
                              style={[
                                styles.number,
                                { color: code.length > 3 ? "gray" : "black" },
                              ]}
                            >
                              {number}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {[4, 5, 6].map((number) => (
                          <TouchableOpacity
                            key={number}
                            onPress={() => onNumberPress(number)}
                            disabled={code.length > 3}
                          >
                            <Text
                              style={[
                                styles.number,
                                { color: code.length > 3 ? "gray" : "black" },
                              ]}
                            >
                              {number}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {[7, 8, 9].map((number) => (
                          <TouchableOpacity
                            key={number}
                            onPress={() => onNumberPress(number)}
                            disabled={code.length > 3}
                          >
                            <Text
                              style={[
                                styles.number,
                                { color: code.length > 3 ? "gray" : "black" },
                              ]}
                            >
                              {number}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity>
                          <Text>{"  "}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onNumberPress(0)}>
                          <Text
                            style={[
                              styles.number,
                              { color: code.length > 3 ? "gray" : "black" },
                            ]}
                          >
                            0
                          </Text>
                        </TouchableOpacity>

                        <View style={{ minWidth: 30 }}>
                          {code.length > 0 && (
                            <TouchableOpacity onPress={numberBackspace}>
                              <Text style={styles.number}>
                                <MaterialCommunityIcons
                                  name="backspace-outline"
                                  size={26}
                                  color="black"
                                />
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className="flex-1 mt-4">
                    <View className="">
                      <TouchableOpacity
                        style={{
                          backgroundColor: code.length === 4 ? "black" : "gray",
                        }}
                        onPress={() => setIndex(9)}
                        className="rounded-3xl mt-8 flex items-center justify-center h-12 "
                      >
                        <Text className="text-white text-base font-pregular">
                          Continue
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {index === 4 && (
            <View key="2" className="h-full" style={{ flex: 1 }}>
              <View>
                <Text className="text-2xl font-pbold">
                  Can you tell us where you live?
                </Text>
              </View>
              <View className="justify-center flex-1">
                <FormField
                  title="Address"
                  placeholder="Enter your address"
                  value={formData.address}
                  handleChangeText={(value) =>
                    handleInputChange("address", value)
                  }
                  otherStyles="mt-4"
                />
                <FormField
                  title="City"
                  placeholder="Enter your city"
                  value={formData.city}
                  handleChangeText={(value) => handleInputChange("city", value)}
                  otherStyles="mt-4"
                />
                <FormField
                  title="State"
                  placeholder="Enter your state"
                  value={formData.state}
                  handleChangeText={(value) =>
                    handleInputChange("state", value)
                  }
                  otherStyles="mt-4"
                />
                <FormField
                  title="Postal Code"
                  placeholder="Example: 12093"
                  value={formData.postalCode}
                  handleChangeText={(value) =>
                    handleInputChange("postalCode", value)
                  }
                  otherStyles="mt-4"
                />
                <FormField
                  title="SSN"
                  placeholder="Example: 1234"
                  value={formData.ssn}
                  handleChangeText={(value) => handleInputChange("ssn", value)}
                  otherStyles="mt-4"
                />
              </View>

              <View className="">
                <TouchableOpacity
                  onPress={() => setIndex(5)}
                  className="rounded-3xl mt-8 flex items-center justify-center h-12 bg-black"
                >
                  <Text className="text-white text-base font-pregular">
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {index === 9 && (
            <LinkAccount
              account={account}
              setAccount={setAccount}
              handleSubmit={handleSubmit}
              setIndex={setIndex}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginVertical: 80,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numbersView: {
    marginHorizontal: 80,
    gap: 40,
  },
  number: {
    fontSize: 24,
  },
});
