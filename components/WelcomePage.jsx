import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const WelcomePage = ({ onStartAR }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome "Wanderlust_123" !</Text>
      <Button title="Start ReviewAR Now!" onPress={onStartAR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aquamarine",
  },
  title: {
    color: 'black',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomePage;
