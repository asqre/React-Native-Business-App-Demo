import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinessList({ businesslist }) {
  return (
    <ScrollView>
      <FlatList
        data={businesslist}
        scrollEnabled
        renderItem={({ item, index }) => (
          <BusinessListCard key={index} business={item} />
        )}
      />

      <View
        style={{
          height: 200,
        }}
      ></View>
    </ScrollView>
  );
}
