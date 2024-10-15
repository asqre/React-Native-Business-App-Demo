import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PopularBussinessCard({ bussiness }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + bussiness?.id)}
      style={{
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginLeft: 20,
      }}
    >
      <Image
        source={{ uri: bussiness?.imageUrl }}
        style={{ width: 200, height: 130, borderRadius: 15 }}
      />

      <View style={{ marginTop: 7, gap: 5 }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 17,
          }}
        >
          {bussiness?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 13,
            color: Colors.GRAY,
          }}
        >
          {bussiness?.address}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Image
              source={require("./../../assets/images/star.png")}
              style={{ width: 15, height: 15 }}
            />
            <Text style={{ fontFamily: "outfit" }}>4.5</Text>
          </View>

          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 12,
              color: "#fff",
              padding: 3,
              backgroundColor: Colors.PRIMARY,
              borderRadius: 5,
            }}
          >
            {bussiness?.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
