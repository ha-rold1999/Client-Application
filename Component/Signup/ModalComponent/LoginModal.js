import { Modal, View } from "react-native";
import modelStyle from "../../../Style/Component/Modal/StyleModelComponent";
import Loading from "./ModalLoading";
import UsernameError from "./LoginModalMessage/UsernameErrorMessage";
import PasswordError from "./LoginModalMessage/PasswordErrorMessage";
import Success from "./LoginModalMessage/SuccessMessage";

export default function LoginFail(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
    >
      <View style={modelStyle.container}>
        <View style={modelStyle.modal}>
          {props.isLoading && <Loading />}
          {props.isExist && (
            <UsernameError
              setModalVisible={props.setModalVisible}
              modalVisible={props.modalVisible}
            />
          )}
          {props.isPasswordWrong && (
            <PasswordError
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
