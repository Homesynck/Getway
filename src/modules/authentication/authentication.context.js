import React, { createContext } from "react";

const AuthContext = createContext({
    authState : {
        status: 'NOT_SIGNED_IN'
    },
    setAuthState : () => {}
});

export default AuthContext;