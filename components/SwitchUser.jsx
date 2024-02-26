import React, { useEffect, useContext, useState} from "react";
import {
    View,
    Text,
    Button,
    Image,
    ImageBackground,
    useWindowDimensions
  } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { CurrentUserContext } from "./CurrentUser";
import { UserList } from "./UserList";
import { UserCard } from "./UserCard";
import { fetchUsers } from "../utils";

//main styles file
import styles from "../styles"


const SwitchUser = () => {

    //window dimensions
    const containerWidth = useWindowDimensions().width * 0.8;

    //CONTEXT
    const { currentUser } = useContext(CurrentUserContext)

    //STATES
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    //GET ALL USERS
    useEffect(() => {
        fetchUsers()
        .then((result) => {
            setAvailableUsers(result)
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
        <ImageBackground
        source={require("../_media_/layered-steps-haikei.png")}
        style={styles.backgroundImage}>
        <View style={styles.switchUserPageContainer}>
          <View style={styles.switchUserPageHeader}>
            <Button title="Back" style={{ fontSize: 20 }} color="#a3adf2" onPress={onGoHomeClick} />
          </View>
          <View style={styles.switchUserPageContent}>
            <Text style={styles.switchUserPageText}>
              {'You are currently logged in as '}
              <Text style={{ fontWeight: 'bold' }}>{currentUser.username}</Text>
              {' Switch account below or click the button to go back.'}
            </Text>
            <View style={styles.userListContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.userListScrollContainer}>
                {availableUsers.map((user, index) => (
                  <UserCard key={index} user={user} containerWidth={containerWidth} />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center', padding: 0 }}>
      <Image style={{marginBottom: 20}} source={require('../_media_/icons8-swipe-64.png')} />
    </View>
        </ImageBackground>
      );
    };

    export default SwitchUser;
  

    // return (
    //     <View style={styles.switchUserPageBackground}> 
    //         <Text style={styles.SwitchUserPageText}>{`You are currently logged in as ${currentUser.username}. Switch account below or click the button to go back.`}</Text>
    //         <Button title="Back" color="yellow" onPress={onGoHomeClick} />
    //         <UserList availableUsers={availableUsers} />
    //     </View>
    // )


  //HANDLE THE SCROLLVIEW FUNCTIONALITY
  // const handleScroll = (event) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   const itemHeight = 50;
  //   const index = Math.floor(offsetY / itemHeight);
  //   setSelectedItem(availableUsers[index]);
  // };