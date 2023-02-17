import { StyleSheet } from "react-native";

const FormStyle = StyleSheet.create({
  input: {
    fontSize: 20,
    width: "90%",
  },
  steps: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "5%",
  },
  label: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  button: {
    backgroundColor: "#209589",
    marginTop: "20%",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "white",
  },
  sideNote: {
    paddingTop: 10,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#61afe1",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  prevButton: {
    backgroundColor: "#d1f6fb",
    borderRadius: 10,
    color: "#61afe1",
  },
  submitButton: {
    backgroundColor: "#209589",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  textInputView: {
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: 5,
  },
});

export default FormStyle;
