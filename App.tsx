import React, { useState } from "react";
import { View } from "react-native";
import WelcomePage from "./components/WelcomePage";
import ARView from "./components/ARView"; // Import ARView component
import {
  ViroARSceneNavigator,
} from "@viro-community/react-viro";

export default () => {
  const [showARView, setShowARView] = useState(false);

  const handleStartAR = () => {
    setShowARView(true);
  };

  return (
    <>
      {!showARView && <WelcomePage onStartAR={handleStartAR} />}
      {showARView && (
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{ scene: ARView }}
          style={{ flex: 1 }}
        />
      )}
    </>
  );
};
