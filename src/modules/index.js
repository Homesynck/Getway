import { NativeModules } from 'react-native';
import Contacts from "react-native-contacts";

const { SignIn, Register } = NativeModules;

export const login = async (username, password) => {
    return await SignIn.signIn(username, password);
};

export const sendPhoneNumber = async (number) => {
    return await Register.sendPhoneNumber(number);
}

export const verifyNumberWithCode = async (code) => {
    // const res = await Register.
    return null;
}

export const registration = async (user) => {
    if (username == null || password == null)
        return null;
    return await Register.signup(user);
}

export const getAllContacts = async () => {
    return await Contacts.getAll();
}