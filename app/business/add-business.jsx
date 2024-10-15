import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();
  const [categoryList, setCategoryList] = useState([]);
  const [businessData, setBusinessData] = useState({
    image: null,
    name: "",
    address: "",
    contact: "",
    website: "",
    about: "",
    category: "",
  });
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });

    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    setBusinessData({ ...businessData, image: result?.assets[0]?.uri });
  };

  const GetCategoryList = async () => {
    try {
      setCategoryList([]);
      const q = query(collection(db, "Category"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setCategoryList((prev) => [
          ...prev,
          { label: doc.data().name, value: doc.data().name },
        ]);
      });
    } catch (error) {
      console.error("Error getting Category:: ", error);
    }
  };

  const handleChange = (field, value) => {
    setBusinessData({
      ...businessData,
      [field]: value,
    });
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    try {
      const fileName = Date.now().toString() + ".jpg";

      const res = await fetch(businessData.image);
      const blob = await res.blob();

      const imageRef = ref(storage, "business-app/" + fileName);

      await uploadBytes(imageRef, blob).then((res) => {
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          saveBusinessDetail(downloadUrl);
        });
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const saveBusinessDetail = async (imageUrl) => {
    await setDoc(doc(db, "BussinessList", Date.now().toString()), {
      ...businessData,
      imageUrl: imageUrl,
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
    });
    setLoading(false);
    ToastAndroid.show("New Business Added...", ToastAndroid.LONG);
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Add New Business
      </Text>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 16,
          color: Colors.GRAY,
        }}
      >
        Fill all details in order to add new business
      </Text>

      <TouchableOpacity
        style={{
          marginTop: 20,
        }}
        onPress={() => onImagePick()}
      >
        {!businessData.image ? (
          <Image
            source={require("./../../assets/images/placeholder.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Image
            source={{ uri: businessData.image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          placeholder="Name"
          name="name"
          onChangeText={(text) => handleChange("name", text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />

        <TextInput
          placeholder="Address"
          name="address"
          onChangeText={(text) => handleChange("address", text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Contact"
          name="contact"
          onChangeText={(text) => handleChange("contact", text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />

        <TextInput
          placeholder="Website"
          name="website"
          onChangeText={(text) => handleChange("website", text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />

        <TextInput
          placeholder="About"
          name="about"
          onChangeText={(text) => handleChange("about", text)}
          multiline
          numberOfLines={5}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            height: 100,
          }}
        />

        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        >
          <RNPickerSelect
            onValueChange={(value) =>
              setBusinessData({ ...businessData, category: value })
            }
            items={categoryList}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={loading}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => onAddNewBusiness()}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
