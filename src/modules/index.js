import { NativeModules } from 'react-native';

const { SignIn } = NativeModules;

export const login = async (username, password) => {
    try {
        console.log("Hello i'm here !");
        const signin = await SignIn.signIn(username, password); //TODO call java method
        console.log(signin);
    } catch (error) {
        console.log(error);
    }
};
