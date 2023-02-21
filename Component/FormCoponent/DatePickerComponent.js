import { View, Text, Pressable, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import DateTimePickerModal from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function DatePicker(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState();

  return (
    <>
      <Pressable
        onPress={() => {
          setDatePickerVisibility(true);
        }}
      >
        <View style={FormStyle.textInputView}>
          <Image
            source={require("../../assets/Icons/calendar.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ fontSize: 20 }}>{props.birthdate}</Text>
        </View>
      </Pressable>
      {isDatePickerVisible && (
        <DateTimePickerModal
          value={new Date()}
          mode="date"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate.toLocaleDateString();
            setDatePickerVisibility(false);
            setDateOfBirth(currentDate);
            props.setBirthdate(currentDate);
          }}
        />
      )}
    </>
  );
}
