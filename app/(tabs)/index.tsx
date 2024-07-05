import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { data } from "../../lib/data";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1, paddingVertical: 4, paddingHorizontal: 15 }}>
          <View className="flex flex-row gap ">
            <View className="flex flex-row flex-1 gap-2 ">
              <View>
                <TouchableOpacity className=" bg-[#ddd]/50 w-9 rounded-full justify-center items-center h-9">
                  <FontAwesome name="user-circle-o" size={16} color="black" />
                </TouchableOpacity>
              </View>
              <View className="flex flex-row gap-x-2 px-1 items-center flex-1 bg-[#ddd]/50 rounded-2xl">
                <Ionicons name="search" size={16} />
                <TextInput className="flex-1" />
              </View>
              <View className="flex flex-row gap-x-2">
                <TouchableOpacity className="  bg-[#ddd]/50 w-9 rounded-full justify-center items-center h-9">
                  <AntDesign name="qrcode" size={16} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className=" bg-[#ddd]/50 w-9 rounded-full justify-center items-center h-9">
                  <FontAwesome name="bell" size={16} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="mt-6">
            <Text className="font-pbold text-2xl">Home</Text>
            <View className="border-[#808080] border rounded-2xl p-4 mt-4">
              <Text className="text-lg">Total assets</Text>

              <View className="flex flex-row gap-x-4 justify-between items-center">
                <View>
                  <Text className="font-pbold text-2xl">$23,349.09</Text>
                </View>
                <View>
                  <TouchableOpacity className="rounded-3xl flex items-center justify-center w-full h-12 px-4 bg-black">
                    <Text className="text-white text-sm font-pregular">
                      Deposit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text className="text-green-600 text-base inline-flex">
                  <AntDesign name="caretup" size={12} />
                  {"  "}$1,349.09 (1.04%){" "}
                  <Text className="text-black">Today</Text>
                </Text>
              </View>
              <View className="flex justify-between flex-row my-4">
                <View className="flex-col gap-y-1 justify-center items-center">
                  <TouchableOpacity className=" bg-[#ddd]/50 w-10 rounded-full justify-center items-center h-10 ">
                    <AntDesign name="plus" size={18} color="black" />
                  </TouchableOpacity>

                  <Text className="font-pregular text-center">Buy</Text>
                </View>
                <View className="flex-col gap-y-1 justify-center items-center">
                  <TouchableOpacity className=" bg-[#ddd]/50 w-10 rounded-full justify-center items-center h-10 ">
                    <AntDesign name="arrowup" size={18} color="black" />
                  </TouchableOpacity>

                  <Text className="font-pregular text-center">Send</Text>
                </View>
                <View className="flex-col gap-y-1 justify-center items-center">
                  <TouchableOpacity className=" bg-[#ddd]/50 w-10 rounded-full justify-center items-center h-10 ">
                    <AntDesign name="arrowdown" size={18} color="black" />
                  </TouchableOpacity>

                  <Text className="font-pregular text-center">Receive</Text>
                </View>
                <View className="flex-col gap-y-1 justify-center items-center">
                  <TouchableOpacity className=" bg-[#ddd]/50 w-10 rounded-full justify-center items-center h-10 ">
                    <FontAwesome name="bank" size={18} color="black" />
                  </TouchableOpacity>

                  <Text className="font-pregular text-center">Add Cash</Text>
                </View>
              </View>
            </View>

            <View className="border-[#808080] border rounded-2xl p-4 mt-8 ">
              <Text className="text-lg">Watchlist</Text>
              <View className=" gap-y-4 pt-4">
                {Object.values(data).map((item, i) => (
                  <View key={i} className="">
                    <View className="flex flex-row justify-between">
                      <View className="flex flex-row gap-x-4 rounded-full">
                        <Image
                          source={{
                            uri: item.logo,
                          }}
                          className="w-8 h-8 object-cover"
                        />
                        <View>
                          <Text className="font-pregular">{item.name}</Text>
                          <Text className="font-pregular text-[#808080]">
                            {item.symbol}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text className="font-pregular text-sm">
                          $23,457.40
                        </Text>
                        {item.infinite_supply ? (
                          <Text className="text-green-600 font-pregular text-xs inline-flex text-right ">
                            1.04%
                          </Text>
                        ) : (
                          <Text className="text-red-600 font-pregular text-xs inline-flex text-right ">
                            4.04%
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                ))}
                <TouchableOpacity className="p-4 bg-[#ddd] rounded-3xl">
                  <Text className="font-pmedium text-base text-center">
                    Go to market
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
