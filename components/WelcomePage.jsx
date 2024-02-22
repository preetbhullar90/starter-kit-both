import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import { useContext, useState } from 'react';
import { CurrentUserContext } from "./CurrentUser";


const WelcomePage = ({ onStartAR, onFakeAR }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const userFirstName = currentUser.name.split(" ")[0];
  return (
    <View style={styles.container}>
      <Image source={require('../_media_/review-ar-03.png')} style={styles.logo} />
      
      <Text style={styles.subtitle}>Discover Places Near You</Text>
      <Text style={styles.subtitle}>{`Welcome, ${userFirstName}!`}</Text>

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E3B4E",
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subtitle: {
    color: '#8F9BB3',
    fontSize: 18,
    marginBottom: 15,
  },
  arIcon: {
    width: 75,
    height: 75,
    marginTop: 25,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign:"center"
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '80%', 
    marginTop: 15, 
  },
  buttonGroup: {
    flex: 1,
    alignItems: 'center', 
  },
});


export default WelcomePage;
