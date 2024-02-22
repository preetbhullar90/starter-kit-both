import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";

import WelcomePage from "./components/WelcomePage";
import CommentPage from "./components/CommentPage";
import SwitchUser from "./components/SwitchUser";
import ARScene from "./components/ARScene";
import ARScene2 from "./components/ARScene2";

import { ViroARSceneNavigator } from "@viro-community/react-viro";
import MapView, { Marker, Circle } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

const Stack = createStackNavigator();

//Go to switch user page
const onSwitchUserClick = () => {
  navigation.navigate("SwitchUser");
};

// Main App component
const App = () => {
  const [position, setPosition] = useState(null);
  const [showARView, setShowARView] = useState(false);
  const [showOwnDataARView, setShowOwnDataARView] = useState(false);

  const handleStartAR = () => {
    setShowARView(true);
  };

  const handleFakeAR = () => {
    setShowOwnDataARView(true);
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

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: "AR camera",
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <View style={styles.container}>
              {!showARView && !showOwnDataARView && (
                <WelcomePage
                  onStartAR={handleStartAR}
                  onFakeAR={handleFakeAR}
                />
              )}
              {showARView && (
                <ViroARSceneNavigator
                  autofocus={true}
                  initialScene={{ scene: ARScene }}
                  style={{ flex: 1 }}
                />
              )}

              {showOwnDataARView && (
                <ViroARSceneNavigator
                  autofocus={true}
                  initialScene={{ scene: ARScene2 }}
                  style={{ flex: 1 }}
                />
              )}

              {position && (showARView || showOwnDataARView) && (
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
          )}
        </Stack.Screen>

        <Stack.Screen
          name="CommentPage"
          component={CommentPage}
          options={{
            ...Platform.select({
              ios: {
                headerShown: true,
                headerTitle: "Add a review",
                gestureEnabled: true,
              },
              android: {
                headerShown: false,
                gestureEnabled: true,
              },
            }),
          }}
        />

        <Stack.Screen 
          name="SwitchUser"
          component={SwitchUser}
          options={{
            ...Platform.select({
              ios: {
                headerShown: true,
                headerTitle: "Add a review",
                gestureEnabled: true,
              },
              android: {
                headerShown: false,
                gestureEnabled: true,
              },
            }),
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
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
});

// Export App component
export default App;
