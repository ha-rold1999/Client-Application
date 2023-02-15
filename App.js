import LaodingScreen from "./Component/LoadingComponent";
import InitialScreen from "./Component/InitialComponent";
import { useState } from "react";

export default function App() {
  let [isLoading, loading] = useState(true);

  setTimeout(() => {
    loading(false);
  }, 3000);

  if (isLoading) {
    return <LaodingScreen />;
  }
  return <InitialScreen />;
}
