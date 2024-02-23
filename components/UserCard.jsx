import { useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity
  } from "react-native";
import { CurrentUserContext } from "./CurrentUser";

export const UserCard = ({ user }) => {

    // Context and extracting variables
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const currentUsername = currentUser.username;
    const { username, name } = user;

    // Handle click to switch user
    const handleUserSwitch = () => {
        setCurrentUser(user);
    };

    return (
        username !== currentUsername ? (
            <TouchableOpacity onPress={handleUserSwitch}>
                <View style={{ borderWidth: 1, borderColor: 'black', padding: 10, marginVertical: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>{username}</Text>
                    <Text>{name}</Text>
                </View>
            </TouchableOpacity>
        ) : null
    );
}