import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../scenes/authentication/login.screen";
import Register from "../scenes/authentication/register.screen";
import ForgotPassword from "../scenes/authentication/forgot-password.screen";

const Stack = createStackNavigator();

const LoginNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

export default LoginNavigator;
