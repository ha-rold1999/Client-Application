import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  handleLocation,
  handleContact,
  handleVehicle,
  handleDescription,
  handleService,
  postRequest,
} from "../../../../../Redux/RequestReducers/RequestReducer";
import { setTabEnable } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { server } from "../../../../../Static";
import FormStyle from "../../../../../Style/Component/StyleSignupComponent";
import PhoneCamera from "../ProfileViews/Camera";
import Icon from "react-native-vector-icons/FontAwesome";

export default function RequestService({ route, navigation }) {
  const [openCamera, setOpenCamera] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageURL] = useState("");
  const [vehicleError, setVehicleError] = useState();
  const [contactError, setContactError] = useState();
  const { service, contact, vehicle, description } = useSelector(
    (state) => state.requestServiceSlice
  );

  const { longitude, latitude } = useSelector((state) => state.locationSlice);

  const dispatch = useDispatch();
  const mechanicInfo = route.params;
  const mechanicID = mechanicInfo.mechanicID;
  const services = mechanicInfo.services;

  const userInfo = useSelector(data);
  const userID = userInfo && userInfo.AccountData.personalInformation.UUID;
  const Contact = userInfo && userInfo.AccountData.personalInformation.Contact;

  const image = `${server}/api/Upload/files/${userID}/PROBLEM`;
  if (!isLoaded) {
    setImageURL(image + "?" + new Date());
    setIsLoaded(true);
  }

  useEffect(() => {
    dispatch(handleContact(Contact));
    dispatch(handleService(service));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Problem Image */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "50%",
          padding: 10,
          elevation: 5,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "80%" }}
        />
        <View style={{ alignItems: "center" }}>
          <Pressable
            style={{
              backgroundColor: "#209589",
              paddingHorizontal: 50,
              marginTop: 10,
              paddingVertical: 10,
              borderRadius: 10,
              flexDirection: "row",
            }}
            onPress={() => {
              setOpenCamera(true);
            }}
          >
            <Icon
              name="camera-retro"
              size={20}
              style={{ color: "black", paddingRight: 10 }}
            />
            <Text style={{ color: "white" }}>Capture</Text>
          </Pressable>
        </View>
      </View>
      {/* Request Form */}
      <ScrollView>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
          {/* Service Picker */}
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Service</Text>
            <View style={{ borderWidth: 1, borderRadius: 10 }}>
              <Picker
                selectedValue={service}
                onValueChange={(itemValue) =>
                  dispatch(handleService(itemValue))
                }
              >
                {services.map(({ ServiceName, ServiceID, Price }) => (
                  <Picker.Item
                    label={ServiceName}
                    value={ServiceName + ":" + Price}
                    key={ServiceID}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Contact Form */}
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Contact</Text>
            <View style={FormStyle.textInputView}>
              <Image
                source={require("../../../../../assets/Icons/phone.png")}
                style={{ width: 30, height: 30, marginRight: 5 }}
              />
              <TextInput
                style={FormStyle.input}
                onChangeText={(text) => dispatch(handleContact(text))}
                value={contact}
              />
            </View>
          </View>
          {contactError && <Text style={{ color: "red" }}>{contactError}</Text>}

          {/* Vehicle Form */}
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Vehicle</Text>
            <View style={FormStyle.textInputView}>
              <Image
                source={require("../../../../../assets/Icons/vehicle.png")}
                style={{ width: 30, height: 30, marginRight: 5, marginLeft: 3 }}
              />
              <TextInput
                style={FormStyle.input}
                onChangeText={(text) => dispatch(handleVehicle(text))}
                value={vehicle}
              />
            </View>
          </View>
          {vehicleError && <Text style={{ color: "red" }}>{vehicleError}</Text>}

          {/* Description Form */}
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Description</Text>
            <View style={FormStyle.textInputView}>
              <Image
                source={require("../../../../../assets/Icons/desc.png")}
                style={{ width: 30, height: 30, marginRight: 5, marginLeft: 3 }}
              />
              <TextInput
                style={FormStyle.input}
                onChangeText={(text) => dispatch(handleDescription(text))}
                value={description}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Submit Button */}
      <View style={{ alignItems: "center", paddingBottom: 5 }}>
        <Pressable
          onPress={() => {
            if (!contact) {
              setContactError("Please Enter your phone number");
            } else if (!/^(09|\+639)\d{9}$/.test(contact)) {
              setContactError("Enter a valid phone number");
            } else {
              setContactError("");
            }
            if (!vehicle) {
              setVehicleError("Enter your vehicle");
              console.log(vehicleError);
            } else {
              setVehicleError("");
            }

            console.log("Contact Error: " + contact);
            console.log("Vehicle Error: " + vehicle);
            if (contactError === "" && vehicleError === "") {
              dispatch(postRequest({ userID: userID, mechanicID: mechanicID }));
              dispatch(setTabEnable(false));
              navigation.reset({
                index: 0,
                routes: [{ name: "Service" }],
              });
            }
          }}
          style={{
            paddingHorizontal: 50,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: "#209589",
          }}
        >
          <Text style={{ color: "white" }}>Submit Request</Text>
        </Pressable>
      </View>
      <PhoneCamera
        openCamera={openCamera}
        setOpenCamera={setOpenCamera}
        upload={"PROBLEM"}
      />
    </View>
  );
}
