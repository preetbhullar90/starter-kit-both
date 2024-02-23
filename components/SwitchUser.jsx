import React, { useEffect, useContext, useState} from "react";
import {
    View,
    Text,
    ScrollView,
    Button
  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CurrentUserContext } from "./CurrentUser";
import { UserList } from "./UserList";

//main styles file
import styles from "../styles"


const SwitchUser = () => {

    //CONTEXT
    const { currentUser } = useContext(CurrentUserContext)

    //STATES
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    //GET ALL USERS
    useEffect(() => {
        fetch('https://reviewar-be.onrender.com/api/users')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result.users, "<<<see")
            setAvailableUsers(result.users)
        })
        .catch((error) => {
            console.log("Error getting users :(", error)
        })
    }, [])

    //HANDLE CLICKING HOME BUTTON
    const navigation = useNavigation();
    const onGoHomeClick = () => {
        navigation.navigate("Home");
    };

  

    return (
        <View style={styles.switchUserPageBackground}> 
            <Text style={styles.SwitchUserPageText}>{`You are currently logged in as ${currentUser.username}. Switch account below or click the button to go back.`}</Text>
            <Button title="Back" color="yellow" onPress={onGoHomeClick} />
            <UserList availableUsers={availableUsers} />
        </View>
    )

}

export default SwitchUser;


  //HANDLE THE SCROLLVIEW FUNCTIONALITY
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const itemHeight = 50;
    const index = Math.floor(offsetY / itemHeight);
    setSelectedItem(availableUsers[index]);
  };