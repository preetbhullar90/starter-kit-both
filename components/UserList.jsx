import { FlatList } from "react-native";

import { UserCard } from "./UserCard"

//main styles file
import styles from "../styles"

export const UserList = ({ availableUsers }) => {


    const renderItem = ({ item }) => (
        <UserCard user={item} />
    );

    return (
        <FlatList
            data={availableUsers}
            renderItem={renderItem}
            keyExtractor={(user, index) => index.toString()}
        />
    )

}