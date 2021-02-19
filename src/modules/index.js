import {NativeModules} from 'react-native';

const { Getway } = NativeModules;

export const login = async credentials => {
    try {
        return await Getway.connect(username, password) //TODO call java method
    } catch (error) {
        return error;
    }
};