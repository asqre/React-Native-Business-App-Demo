import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const router = useRouter();
  const { user } = useUser();

  const deleteBusiness = async () => {
    try {
      await deleteDoc(doc(db, "BussinessList", business?.id));
      router.back();
      ToastAndroid.show("Business Deleted!", ToastAndroid.LONG);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const onDelete = () => {
    Alert.alert(
      "Do you want to Delete?",
      "Do you really want to delete this business?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };

  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
          paddingTop: 45,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-sharp" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="white" />
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{ width: "100%", height: 340 }}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 20,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            padding: 20,
            marginTop: -20,
            backgroundColor: "#fff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 26,
            }}
          >
            {business?.name}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
            }}
          >
            {business?.address}
          </Text>
        </View>

        {user?.primaryEmailAddress?.emailAddress === business?.userEmail && (
          <TouchableOpacity onPress={() => onDelete()}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
