import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";

import WelcomePage from "./components/WelcomePage";
import CommentPage from "./components/ReviewPage";
import SwitchUser from "./components/SwitchUser";
import ARScene from "./components/ARScene";
import ARScene2 from "./components/ARScene2";

import { ViroARSceneNavigator } from "@viro-community/react-viro";
import MapView, { Marker, Circle } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

const Stack = createStackNavigator();



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
          headerTitle: "Home",
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
                <View
                  style={{
                    bottom: 5,
                    right: 5,
                    width: 150,
                    height: 150,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderTopColor: "#545fb2",
                    borderLeftColor: "#545fb2",
                    borderRightColor: "#545fb2",
                    overflow: "hidden",
                    position: "absolute",

                    borderBottomColor: "#545fb2",
                    borderTopWidth: 4,
                    borderRightWidth: 4,
                    borderLeftWidth: 4,
                    borderBottomWidth: 4,
                  }}
                >
                  <MapView
                    style={styles.map}
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
                      radius={200}
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
                </View>
              )}
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ReviewPage"
          component={CommentPage}
          options={{
            ...Platform.select({
              ios: {
                headerShown: true,
                headerTitle: "Add a review",
                gestureEnabled: true,
                headerBackTitle: "AR camera"
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
                headerTitle: "Switch user",
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
