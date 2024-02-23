import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler"; //  TouchableOpacity button to Explore Later...
import { useNavigation } from "@react-navigation/native";

//main styles file
import styles from "../styles"

//IMPORT CONTEXT FUNCTIONALITY AND CURRENTUSER CONTEXT
import { useContext } from 'react';
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
        <Button title="Change user" color="yellow" onPress={onSwitchUserClick}/>
        <Image
          source={require("../_media_/review-ar-04.png")}
          style={styles.logoImage}
        />
        <Button style={styles.startARButton} title="Start with Google-API!" onPress={onStartAR} />
        <Button style={styles.startARButton} title="Start with Own-API!" onPress={onFakeAR} />
      </View>
    </ImageBackground>
  );
};


export default WelcomePage;
