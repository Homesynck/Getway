import { NativeModules } from 'react-native';

const { SignIn, Register } = NativeModules;

export const login = async (username, password) => {
    return await SignIn.signIn(username, password);
};

export const sendPhoneNumber = async (number) => {
    //TODO call validate phone method
    const res = await Register.sendPhoneNumber(number);
    console.log("Promise received: ", res);
    return res;
}

export const verifyNumberWithCode = async (code) => {
    //TODO call method which verify code
    return true;
}

export const registration = async (user) => {
    //TODO call method which signup user
    return true;
}