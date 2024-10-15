import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function MenuList() {
  const { signOut } = useAuth();
  const router = useRouter();

  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("./../../assets/images/add-file.png"),
      path: "/business/add-business",
    },
    {
      id: 1,
      name: "My Business",
      icon: require("./../../assets/images/business.png"),
      path: "/business/my-business",
    },
    {
      id: 1,
      name: "Share App",
      icon: require("./../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 1,
      name: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "logout",
    },
  ];

  const onMenuClick = (item) => {
    if (item.path === "logout") {
      signOut();
      return;
    }

    if (item.path === "share") {
      Share.share({
        message:
          "Download the Business Directory app, Download Url: https://play.google.com/store/apps/details?id=com.asqre.businessdirectory",
      });
      return;
    }
    router.push(item.path);
  };

  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 16,
                flex: 1,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text
        style={{
          fontFamily: "outfit",
          textAlign: "center",
          marginTop: 50,
          color: Colors.GRAY,
        }}
      >
        Developed by asqre @2024
      </Text>
    </View>
  );
}
