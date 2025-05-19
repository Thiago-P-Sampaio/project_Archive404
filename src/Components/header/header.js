import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
} from "react-native";

export default function Header() {
  const statusBarHeight =
    Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 24;

  return (
    <View
      style={[styles.headerContainer, { paddingTop: statusBarHeight + 24 }]}
    >
      <View style={styles.avatarRow}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBe6Lrai5rlwmAfhe0H2DMmDT0vcDYWAE_iw&s",
          }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <Text style={styles.username}>Archive404</Text>
      </View>
      <View style={styles.navContainer}>
        <Text style={styles.navItemInactive}>Consoles</Text>
        <Text style={styles.navItemActive}>Coleção</Text>
        <Text style={styles.navItemInactive}>Conquistas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#232729",
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24, 
    marginBottom: 18, 
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 21.5, 
    backgroundColor: "#111",
    marginRight: 12,
  },
  username: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    fontStyle: "italic",
    textAlign: "left",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: 8,
  },
  navItemActive: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "400",
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
    paddingBottom: 2,
  },
  navItemInactive: {
    color: "#ccc",
    fontSize: 18,
    fontWeight: "400",
  },
});
