import { FlatList } from "react-native";

import { UserCard } from "./UserCard"

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