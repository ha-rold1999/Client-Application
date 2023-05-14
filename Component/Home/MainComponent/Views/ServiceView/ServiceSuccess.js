import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  PermissionsAndroid,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postTransaction,
  endSession,
} from "../../../../../Redux/MechanicReducers/RequestStatusReducers";
import { useState } from "react";
import Loading from "../../Loading";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";

export default function ServiceSuccess({ route }) {
  const dispatch = useDispatch();
  const { transactionID } = useSelector((state) => state.requestStatusSlice);
  const [isLoading, setIsLoading] = useState(true);
  const SessionID = route.params;
  const UUID = SessionID.SessionID;
  const ServiceName = SessionID.ServiceName;
  const Fee = SessionID.Fee;
  const sessionDetails = SessionID.SessionDetails;
  console.log("Session Details: " + JSON.stringify(sessionDetails, null, 2));
  useEffect(() => {
    setTimeout(() => {
      if (transactionID === null) {
        dispatch(postTransaction(ServiceName, Fee));
        return;
      }

      dispatch(endSession(UUID, transactionID));
      setIsLoading(false);
    }, 5000);
  }, [transactionID]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  }

  if (transactionID === null) {
    return (
      <View>
        <Text>ServiceSuccess</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../../../assets/Icons/done.png")}
          style={{ width: 300, height: 300, marginBottom: 10 }}
        />
        <Text style={{ fontSize: 30, fontWeight: "700" }}>Service Ended</Text>
        <Pressable
          style={{
            backgroundColor: "#209589",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
          }}
          onPress={() => {
            const save = async () => {
              const date = new Date();
              console.log("Date: " + date);
              if (Platform.OS === "android") {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                  console.log("Write permission denied");
                  return;
                }
              }
              const htmlContent = `
                      <!DOCTYPE html>
                          <html>
                            <head>
                              <title>Service Receipt</title>
                              <style>
                                /* Define the CSS style for the receipt */
                                body {
                                  font-family: Arial, sans-serif;
                                  margin: 0;
                                  padding: 0;
                                  text-align: center;
                                  background-color: #f2f2f2;
                                }

                                .container {
                                  max-width: 600px;
                                  margin: 0 auto;
                                  padding: 20px;
                                  border: 1px solid #ccc;
                                  border-radius: 10px;
                                  background-color: #fff;
                                }

                                h1 {
                                  font-size: 32px;
                                  margin-bottom: 20px;
                                }

                                h3 {
                                  font-size: 18px;
                                  margin-top: 10px;
                                }

                                table {
                                  width: 100%;
                                  border-collapse: collapse;
                                  margin-bottom: 20px;
                                }

                                th {
                                  background-color: #f2f2f2;
                                  padding: 10px;
                                  font-size: 18px;
                                }

                                td {
                                  border: 1px solid #ccc;
                                  padding: 10px;
                                  font-size: 16px;
                                }

                                .total {
                                  font-weight: bold;
                                }

                                .thankyou {
                                  font-size: 20px;
                                  margin-top: 30px;
                                }
                              </style>
                            </head>
                            <body>
                              <div class="container">
                                <h1>Service Receipt</h1>
                                <h3>Service ID: ${UUID}</h3>
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Service</th>
                                      <th>Vehicle</th>
                                      <th>Date/Time</th>
                                      <th>Fee</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>${ServiceName}</td>
                                      <td>${
                                        sessionDetails
                                          .split("|")[4]
                                          .split(":")[1]
                                      }</td>
                                      <td>${date}</td>
                                      <td>PHP${Fee}</td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p class="thankyou">Thank you for trusting AYUS!</p>
                              </div>
                            </body>
                          </html>`;
              try {
                const downloadDocument = await Print.printToFileAsync({
                  html: htmlContent,
                });
                const pdfURI = downloadDocument.uri;
                const pdfName = "receipt.pdf";
                const fileURI = `${FileSystem.documentDirectory}${pdfName}`;
                await FileSystem.copyAsync({ from: pdfURI, to: fileURI });
                await Sharing.shareAsync(fileURI);
              } catch (e) {
                console.log(e);
              }
            };

            save();
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Print Receipt</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
