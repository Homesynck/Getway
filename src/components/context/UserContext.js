import React, {
    createContext,
    useState, useEffect
} from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const logUser = () => {
        // api call
    };

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;
