import { View, Text, FlatList } from "react-native";
import MechanicCard from "./Views/MechanicCardComponent";
import MainView from "../../../Style/Component/MainViewStyles/StyleMainComponent";
import { useEffect, useState } from "react";

export default function Main() {
  const apiKey = "API_SECRET-42e016b219421dc83d180bdee27f81dd";

  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    fetch("http://203.177.71.218:5003/api/Sessions/AvailableMechanics", {
      method: "GET",
      headers: { "Content-Type": "application/json", "AYUS-API-KEY": apiKey },
    })
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          setDATA([...DATA, element]);
        });
      })
      .catch((error) => console.log("error: " + error));
  }, []);

  DATA.forEach((item) => {
    console.log(item.accountStatus.Shop.ShopName);
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <MechanicCard item={item} />}
        style={MainView.flatView}
      />
    </View>
  );
}
