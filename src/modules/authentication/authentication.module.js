import { NativeModules } from 'react-native';
const { SignIn } = NativeModules;

export const handleLogin = async e => {
    e.preventDefault();
    try {
        const res = await SignIn.signIn(username, password);
        console.log(res);
        navigation.navigate("Register");
    } catch (error) {
        console.error(error.message);
        setErrorMessage(error.message);
    }
}