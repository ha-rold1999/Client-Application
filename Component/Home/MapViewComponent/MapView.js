import { StyleSheet, Text, View } from 'react-native'
import MapView,{Marker} from 'react-native-maps'
import React from 'react'
import { useSelector } from 'react-redux'
import { PROVIDER_GOOGLE } from 'react-native-maps/lib/ProviderConstants'

export default function LocationView() {
    const {longitude, latitude} = useSelector((state)=>state.locationSlice)
  return (
    <View>
      <MapView
      styles={{width:"100%", height:"100%", backgroundColor:"red"}}
      provider="google"
      
      ></MapView>
    </View>
  )
}