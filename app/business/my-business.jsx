import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import BusinnessListCard from "../../components/Explore/BusinessListCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function MyBusiness() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Business",
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    user && GetUserBusiness();
  }, []);

  const GetUserBusiness = async () => {
    try {
      setLoading(true);
      setBusinessList([]);
      const q = query(
        collection(db, "BussinessList"),
        where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 45,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        My Business
      </Text>

      <FlatList
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinnessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
