import {
  Modal,
  View,
  Pressable,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import modelStyle from "../../../Style/Component/Modal/StyleModelComponent";
import Loading from "./ModalLoading";
import Warning from "./SignUpModalMessage/WarningMessage";
import Success from "./SignUpModalMessage/SuccessMessage";

export default function SingnupConfirmation(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!modalVisible);
      }}
    >
      <View style={modelStyle.container}>
        <View style={modelStyle.modal}>
          {props.isLoading && <Loading />}
          {props.isError && (
            <Warning
              setModalVisible={props.setModalVisible}
              modalVisible={props.modalVisible}
            />
          )}
          {props.isSuccess && (
            <Success
              setModalVisible={props.setModalVisible}
              modalVisible={props.modalVisible}
              navigation={props.navigation}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
