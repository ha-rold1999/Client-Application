import { StyleSheet } from "react-native";
const modelStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    width: "80%",
    paddingTop: 20,
    borderRadius: 10,
    elevation: 10,
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    padding: 5,
  },
  textSucces: {
    color: "#E8F1F8",
    backgroundColor: "#209589",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  textFail: {
    color: "#E8F1F8",
    backgroundColor: "#02599B",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  activity: {
    alignItems: "center",
  },
  activityText: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
});
export default modelStyle;
