import { StyleSheet } from "react-native";

const LoginForm = StyleSheet.create({
  img: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  form: { flex: 0.7, width: "100%" },
  checkBox: { flexDirection: "row", marginHorizontal: "5%" },
  loginButton: {
    backgroundColor: "#209589",
    alignItems: "center",
    marginHorizontal: "20%",
    borderRadius: 20,
    marginTop: "10%",
    padding: 5,
  },
  loginText: { fontSize: 20, fontWeight: "800", color: "white", margin: 5 },
  input: {
    borderWidth: 1,
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  label: { fontSize: 15 },
  inputView: {
    paddingHorizontal: "5%",
    paddingBottom: "5%",
  },
});

export default LoginForm;
