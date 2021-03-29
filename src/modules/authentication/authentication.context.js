import React, { createContext } from "react";

const AuthContext = createContext({
    authState : 'NOT_SIGNED_IN',
    setAuthState : () => {}
});

export default AuthContext;