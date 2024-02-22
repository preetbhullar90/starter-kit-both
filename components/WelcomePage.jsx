import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler"; //  TouchableOpacity button to Explore Later...
import { useNavigation } from "@react-navigation/native";

//IMPORT CONTEXT FUNCTIONALITY AND CURRENTUSER CONTEXT
import { useContext, useState } from 'react';
import { CurrentUserContext } from "./CurrentUser";

const WelcomePage = ({ onStartAR, onFakeAR }) => {


  //GRAB CONTEXT
  const { currentUser } = useContext(CurrentUserContext);
  const userFirstName = currentUser.name.split(" ")[0];

  //Go to switch user page
  const navigation = useNavigation();

  const onSwitchUserClick = () => {
    navigation.navigate("SwitchUser");
  };

  return (
    <ImageBackground
      source={require("../_media_/background-02.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>{`Welcome ${userFirstName}...`}</Text>
        <Button title="Change user" color="white" onPress={onSwitchUserClick}/>
        <Image
          source={require("../_media_/review-ar-04.png")}
          style={styles.logoImage}
        />
        <Button title="Start with Google-API!" onPress={onStartAR} color="black" />{/* Find a way to style buttons */ }
        <Button title="Start with Own-API!" onPress={onFakeAR} color="black" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 20,
    left: 20,
  },
  logoImage: {
    marginTop: 60,
  },
});

export default WelcomePage;
