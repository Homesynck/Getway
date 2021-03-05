import { NativeModules } from 'react-native';

const { SignIn } = NativeModules;

export const login = async (username, password) => {
    return await SignIn.signIn(username, password);
};
