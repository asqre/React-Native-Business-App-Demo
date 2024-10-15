import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetBusinessDetailById();
  }, []);

  const GetBusinessDetailById = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "BussinessList", businessid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBusiness({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting BusinessDetail: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{ marginTop: "50%" }}
        />
      ) : (
        <View>
          {/* Intro */}
          <Intro business={business} />

          {/* Action Button */}
          <ActionButton business={business} />

          {/* About Section */}
          <About business={business} />

          {/* Review Section */}
          <Reviews business={business} />
        </View>
      )}
    </ScrollView>
  );
}
