import { View, Text, Button, ActivityIndicator, Image } from "react-native";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { checkRequests } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { AirbnbRating } from "react-native-ratings";
import { getReview } from "../../../../../Redux/MechanicReducers/RequestStatusReducers";
import { profilePIc } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import PhoneCamera from "./Camera";

export default function Profile({ navigation }) {
  const [openCamera, setOpenCamera] = useState(false);
  const profile = useSelector(data);
  const { Profile } = useSelector((state) => state.informationSlice);
  const dispatch = useDispatch();
  const { myRating } = useSelector((state) => state.requestStatusSlice);
  const ID = profile.AccountData.personalInformation.UUID;

  useEffect(() => {
    dispatch(checkRequests(profile.AccountData.personalInformation.UUID));
    dispatch(
      getReview(profile.AccountData.personalInformation.UUID, "Profile")
    );
    dispatch(profilePIc(ID, dispatch));
  }, [dispatch]);
  if (myRating !== null) {
    return (
      <View>
        <View style={{ backgroundColor: "red", width: "50%", height: "30%" }}>
          {Profile === null ? (
            <Image
              source={require("../../../../../assets/Icons/pp.jpg")}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image
              source={{ uri: `data:image/jpg;base64,${Profile}` }}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </View>
        <Button
          title="Change Piture"
          onPress={() => {
            setOpenCamera(true);
          }}
        />
        <Text>ID: {profile.AccountData.personalInformation.UUID}</Text>
        <Text>
          Name: {profile.AccountData.personalInformation.Firstname}{" "}
          {profile.AccountData.personalInformation.Lastname}
        </Text>
        <Text>
          Rating: <AirbnbRating defaultRating={myRating.Rating} isDisabled />
        </Text>
        <Text>Contact: {profile.AccountData.personalInformation.Contact}</Text>
        <Text>
          Birthdate: {profile.AccountData.personalInformation.Birthdate}
        </Text>
        <Text>Address: {profile.AccountData.personalInformation.Address}</Text>
        <Text></Text>
        <Button
          title="Change Password"
          onPress={() => {
            navigation.navigate("ChangePass", {
              uuid: profile.AccountData.personalInformation.UUID,
            });
          }}
        />
        <Button
          title="Edit Profile"
          onPress={() => {
            navigation.navigate("ChangeProf");
          }}
        />
        <Button
          title="Delete Account"
          onPress={() =>
            navigation.navigate("Delete", {
              uuid: profile.AccountData.personalInformation.UUID,
            })
          }
        />
        <PhoneCamera openCamera={openCamera} setOpenCamera={setOpenCamera} />
      </View>
    );
  }
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}
