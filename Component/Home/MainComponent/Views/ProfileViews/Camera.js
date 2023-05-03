import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Camera } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { server } from "../../../../../Static";

export default function PhoneCamera(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [uploading, setUploading] = useState(false);
  const cameraRef = useRef(null);
  const formData = new FormData();
  const profile = useSelector(data);
  const UUID = profile.AccountData.personalInformation.UUID;

  useEffect(() => {
    (async () => {
      const cameraStat = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStat.status === "granted");
    })();
  }, []);

  const capture = async () => {
    if (cameraRef) {
      try {
        const options = { format: "png" };
        const data = await cameraRef.current.takePictureAsync(options);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.openCamera}>
      <View style={styles.container}>
        {!image ? (
          <>
            <Camera
              style={{ flex: 1 }}
              type={type}
              flashMode={flash}
              ref={cameraRef}
            />
            <Button title="Capture" onPress={capture} />
          </>
        ) : (
          <>
            {uploading && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
              >
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            <Button
              title="Close Camera"
              onPress={() => props.setOpenCamera(!props.openCamera)}
            />
            <Image source={{ uri: image }} style={{ flex: 1 }} />
            {
              <Button
                title="Save Image"
                onPress={() => {
                  formData.append("files", {
                    uri: image,
                    name: "photo.png",
                    type: "image/png",
                  });

                  setUploading(true);

                  if (props.upload === "PROFILE") {
                    fetch(`${server}/api/Upload`, {
                      method: "POST",
                      headers: {
                        UserID: UUID,
                        Filename: "PROFILE",
                      },
                      body: formData,
                    })
                      .then((res) => res.json())
                      .then((response) => {
                        props.setIsLoaded(false);
                        setUploading(false);
                        props.setOpenCamera(!props.openCamera);
                      })
                      .catch((err) => console.log("ERROR: " + err));
                  } else if (props.upload === "LICENSE") {
                    fetch(`${server}/api/Upload`, {
                      method: "POST",
                      headers: {
                        UserID: UUID,
                        Filename: "LICENSE",
                      },
                      body: formData,
                    })
                      .then((res) => res.json())
                      .then((response) => {
                        props.setIsLoaded(false);
                        props.setHasLicense(true);
                        setUploading(false);
                        props.setOpenCamera(!props.openCamera);
                      })
                      .catch((err) => console.log("ERROR: " + err));
                  } else {
                    fetch(`${server}/api/Upload`, {
                      method: "POST",
                      headers: {
                        UserID: UUID,
                        Filename: "PROBLEM",
                      },
                      body: formData,
                    })
                      .then((res) => res.json())
                      .then(() => {
                        setUploading(false);
                        props.setOpenCamera(!props.openCamera);
                      })
                      .catch((err) => console.log("ERROR: " + err));
                  }
                }}
              />
            }
            <Button
              title="Retake"
              onPress={() => {
                setImage(null);
              }}
            />
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
