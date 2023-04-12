import * as React from "react";
import { useState } from "react";

export const UserContext = React.createContext();

export function UserContextProvider({children}) {
    const {userInfo, setUserInfo} = useState({}); 
        return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
        )
}

export function useContext() {
    const context = React.useContext(UserContext)

    if (context === undefined) {
        throw new console.error();
    }
    return context
}