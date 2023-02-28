import { StyleSheet, Text, View } from 'react-native'
import { fetchRequest } from '../../../../../Redux/RequestReducers/RequestReducer'
import { useDispatch, useSelector } from 'react-redux'
import { data } from '../../../../../Redux/AccountInfoReducers/AccountReducers'
import React, { useEffect } from 'react'

export default function RequestingView({route}) {
    const params = route.params;
    const mechanicID = params.mechanicID;
    const userID = params.userID

    const {requestData} = useSelector((state)=>state.requestServiceSlice)

    console.log("mechanic: "+mechanicID);
    console.log("user: "+userID)

//   const {isRequesting, requestID, mechanicID} = useSelector((state) => state.requestServiceSlice)

    const dispatch = useDispatch();
    useEffect(()=>{
        const time = setInterval(() => {
            dispatch(fetchRequest(mechanicID));
          }, 10000);
          return () => clearInterval(time);
    },[dispatch])




  return (
    <View>
      <Text>{requestData[0].Status}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})