import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });

    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    try {
      setLoading(true);
      setBusinessList([]);
      const q = query(
        collection(db, "BussinessList"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
      });
    } catch (error) {
      console.error("Error getting BusinessList:: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {businessList?.length && loading == false > 0 ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : loading == true ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{
            marginTop: "50%",
          }}
        />
      ) : (
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            color: Colors.GRAY,
            textAlign: "center",
            marginTop: "50%",
          }}
        >
          No Business Fond
        </Text>
      )}
    </View>
  );
}
