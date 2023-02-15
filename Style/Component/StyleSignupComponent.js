import { StyleSheet } from "react-native";

const FormStyle = StyleSheet.create({
  input: {
    fontSize: 20,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  form: {
    width: "90%",
    height: "90%",
  },
  label: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  button: {
    backgroundColor: "red",
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
});

export default FormStyle;
