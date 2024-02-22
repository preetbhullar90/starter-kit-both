import React, { useEffect, useContext, useState} from "react";

import {
    View,
    Text,
    ScrollView
  } from "react-native";

import { CurrentUserContext } from "./CurrentUser";

const SwitchUser = () => {

    //CONTEXT
    const { currentUser } = useContext(CurrentUserContext)

    //STATE
    const [availableUsers, setAvailableUsers] = useState([]);

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

    console.log(availableUsers[0].username)

    //HANDLE THE SCROLLVIEW FUNCTIONALITY
    const [selectedItem, setSelectedItem] = useState(null);

    const handleScroll = (event) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const itemHeight = 50; // Adjust according to your layout
      const index = Math.floor(offsetY / itemHeight);
      setSelectedItem(items[index]);
    };

    return (
        <View>
            <Text>{`You are currently logged in as ${currentUser.username}. Switch account below.`}</Text>
            <ScrollView onScroll={handleScroll}>
                {availableUsers.map((user, index) => (
                    <Text key={index}>{user.username}</Text>
                ))}
            </ScrollView>
        </View>
    )

}

export default SwitchUser;