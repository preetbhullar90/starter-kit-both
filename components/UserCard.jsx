// UserCard.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CurrentUserContext } from './CurrentUser';
import styles from '../styles';

export const UserCard = ({ user, containerWidth }) => {

    //CONTEXT
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const currentUsername = currentUser.username;
  const { username, name } = user;

  //handle user switching ()
  const handleUserSwitch = () => {
    setCurrentUser(user);
  };

  return (
    username !== currentUsername && (
      <TouchableOpacity onPress={handleUserSwitch}>
        <View style={[styles.userCard, { width: containerWidth }]}>
          <Text style={styles.userCardText}>{username}</Text>
        </View>
      </TouchableOpacity>
    )
  );
};
