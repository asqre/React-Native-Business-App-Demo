import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { db } from "../../config/FirebaseConfig";
import { query, collection, getDocs, limit } from "firebase/firestore";
import PopularBussinessCard from "./PopularBussinessCard";

export default function PopularBussiness() {
  const [bussinessList, setBussinessList] = useState([]);

  useEffect(() => {
    GetBussinessList();
  }, []);

  const GetBussinessList = async () => {
    try {
      setBussinessList([]);
      const q = query(collection(db, "BussinessList"), limit(10));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setBussinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    } catch (error) {
      console.log("Error getting BussinessList: ", error);
    }
  };

  return (
    <View>
      <View
        style={{
          padding: 20,
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Bussiness
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>

      <FlatList
        data={bussinessList}
        renderItem={({ item, index }) => (
          <PopularBussinessCard bussiness={item} key={index} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
