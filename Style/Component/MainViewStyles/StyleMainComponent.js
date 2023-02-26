import { StyleSheet } from "react-native";

const MainView = StyleSheet.create({
  flatView: {
    width: "100%",
    marginTop: 5,
  },
  card: {
    marginHorizontal: "5%",
    marginBottom: "5%",
    backgroundColor: "#E8F1F8",
    height: 100,
    borderRadius: 5,
    elevation: 5,
    justifyContent: "center",
    padding: 5,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
  },
  addressText: {
    fontSize: 15,
  },
});

export default MainView;
