//IMPORT CONTEXT AND CREATE IT
import React, { createContext, useState } from 'react';

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    //STATE TO TRACK USER
    const [currentUser, setCurrentUser] = useState({
        user_id: 3,
        username: "alex_the_great",
        name: "Alexander Williams"
    });
    //RENDER CHILDREN WITH ACCESS TO STATE
    return (
        <CurrentUserContext.Provider value ={{ currentUser, setCurrentUser }} >
            { children }
        </CurrentUserContext.Provider>
    )
};