import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function explore() {
  const [businesslist, setBusinessList] = useState([]);

  const GetBusinessByCategory = async (category) => {
    try {
      setBusinessList([]);
      const q = query(
        collection(db, "BussinessList"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    } catch (error) {
      console.error("Error fetching List", error);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        paddingTop:45
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        Explore More
      </Text>

      {/* search bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
          gap: 10,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            flex: 1,
          }}
        />
      </View>

      {/* category */}
      <Category
        explore={true}
        onCategorySelect={(category) => GetBusinessByCategory(category)}
      />

      {/* Bussiness List */}
      <ExploreBusinessList businesslist={businesslist} />
    </View>
  );
}
