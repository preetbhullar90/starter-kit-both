import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import WelcomePage from "./components/WelcomePage";

import { ViroARSceneNavigator } from "@viro-community/react-viro";
import MapView, { Marker, Circle } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

import ARSceneWithLocation from "./components/ARScene";

// Main App component
const App = () => {
  const [position, setPosition] = useState(null);
  const [showARView, setShowARView] = useState(false);

  const handleStartAR = () => {
    setShowARView(true);
  };

  // Get device's current position
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setPosition(position.coords);
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  }, []);

  // Render MapView and ARSceneNavigator
  return (
    <View style={styles.container}>
      {!showARView && <WelcomePage onStartAR={handleStartAR} />}
      {showARView && (
       
          <ViroARSceneNavigator
            autofocus={true}
            initialScene={{ scene: ARSceneWithLocation }}
            style={{ flex: 1 }}
          />
         
        
      )}

      {position && showARView && (
        <MapView
          style={styles.map}
          minZoomLevel={13}
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Circle
            center={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
            radius={500} 
            fillColor="rgba(255, 0, 0, 0.2)"
            strokeColor="rgba(255, 0, 0, 0.5)"
          />
          <Marker
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: 150,
    width: 150,
    position: "absolute",
  },

  helloWorldTextStyle: {
    fontStyle: "bold",
    fontSize: 11,
    color: "#fff",
    textAlign: "center",
    zIndex: 2,
  },
});

// Export App component
export default App;
