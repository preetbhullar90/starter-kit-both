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
 
  <View style={styles.container}>
    
    <Image source={require('../_media_/review-ar-03.png')} style={styles.logo} />

    <Text style={styles.subtitle}>Discover Places Near You</Text>
    <Text style={styles.subtitle}>{`Welcome, ${userFirstName}!`}</Text>
    <Button title="Change user" color="yellow" onPress={onSwitchUserClick}/>
    <View style={styles.buttonGroupContainer}>

      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={onStartAR}>
          <Image source={require('../_media_/augmented-reality.png')} style={styles.arIcon} />
        </TouchableOpacity>
        <Pressable style={styles.button} onPress={onStartAR}>
          <Text style={styles.text}>START {'\n'}(Google API)</Text>
        </Pressable>
      </View>


      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={onFakeAR}>
          <Image source={require('../_media_/augmented-reality.png')} style={styles.arIcon} />
        </TouchableOpacity>
        <Pressable style={styles.button} onPress={onFakeAR}>
          <Text style={styles.text}>START {'\n'}(Own API)</Text>
        </Pressable>

      </View>
    </View>
  </View>
    
);
};
export default WelcomePage;
