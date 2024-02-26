import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

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
      source={require("../_media_/layered-steps-haikei.png")}
      style={styles.backgroundImage}
    >
  <View style={styles.container}>
    
    <Image source={require('../_media_/review-ar-05.png')} style={styles.logo} />

    {/* <Text style={styles.subtitle}>Discover Places Near You</Text> */}
    <Text style={styles.subtitle}>{`Welcome, ${userFirstName}!`}</Text>


    <TouchableOpacity style={styles.button} onPress={onSwitchUserClick}>
          <Text style={styles.text}>Change User</Text>
        </TouchableOpacity>

    <View style={styles.buttonGroupContainer}>

      <View style={styles.buttonGroup}>

        <TouchableOpacity onPress={onStartAR}>
          <Image source={require('../_media_/3d_11365719.png')} style={styles.arIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onStartAR}>
          <Text style={styles.text}>START {'\n'}(Google API)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={onFakeAR}>
          <Image source={require('../_media_/3d_11365719.png')} style={styles.arIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onFakeAR}>
          <Text style={styles.text}>START {'\n'}(Own API)</Text>
        </TouchableOpacity>

      </View>
    </View>
  </View>
    </ImageBackground>
);
};
export default WelcomePage;
