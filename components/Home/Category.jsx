import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { query, collection, getDocs } from "firebase/firestore";
import CategoryItem from "./CategoryItem";
import { db } from "../../config/FirebaseConfig";
import { useRouter } from "expo-router";

export default function Category({ explore = false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    try {
      setCategoryList([]);
      const q = query(collection(db, "Category"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setCategoryList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      console.error("Error getting Category:: ", error);
    }
  };

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push("/businesslist/" + item.name);
    } else {
      onCategorySelect(item.name);
    }
  };

  return (
    <View>
      {!explore && (
        <View
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
            }}
          >
            Category
          </Text>
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
            View All
          </Text>
        </View>
      )}

      <FlatList
        data={categoryList}
        renderItem={({ item, Index }) => (
          <CategoryItem
            category={item}
            key={Index}
            onCategoryPress={(category) => onCategoryPressHandler(item)}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: 20,
        }}
      />
    </View>
  );
}
