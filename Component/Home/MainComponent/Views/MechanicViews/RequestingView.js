import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { fetchRequest } from "../../../../../Redux/RequestReducers/RequestReducer";
import { useDispatch, useSelector } from "react-redux";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import React, { useEffect, useState } from "react";

export default function RequestingView({ route }) {
  const [isLoading, setIsLoading] = useState(true);
  const params = route.params;
  const mechanicID = params.mechanicID;
  const userID = params.userID;
  const dispatch = useDispatch();

  dispatch(fetchRequest(mechanicID));
  const { requestData } = useSelector((state) => state.requestServiceSlice);

  //   const {isRequesting, requestID, mechanicID} = useSelector((state) => state.requestServiceSlice)

  useEffect(() => {
    const time = setInterval(() => {
      dispatch(fetchRequest(mechanicID));
      setIsLoading(false);
    }, 1000);
    return () => clearInterval(time);
  }, [dispatch]);

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {!isLoading && <Text>{requestData[0].Status}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({});
