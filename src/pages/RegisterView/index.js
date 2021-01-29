import React, { useState } from 'react'
import { Text, View } from 'react-native';

const RegisterNumber = (switchStep) => {

    const [number, setNumber] = useState("");

    return (
        <View>
            <AppInput
                value={number}
                placeholder="Enter your phone number"
                onChange={number => setNumber(number)}
            />
            <AppButton text="Register you phone number" onPress={switchStep(2)} />
            <Text>Login</Text>

        </View>
    )

};

const VerifyNumber = (switchStep) => {

    const [code, setCode] = useState("");

    return (
        <View>
            <AppInput
                value={code}
                placeholder="Enter you verify code"
                onChange={code => setCode(code)}
            />
            <AppButton text="Verify my phone number" onPress={switchStep(3)} />

        </View>
    )

};

const RegisterInformation = (switchStep) => {

    const [user, setUser] = useState({
        username: "",
        password: "",
        password2: "",
        email: ""

    });



    return (
        <View>
            <AppInput
                value={username}
                placeholder="Enter an username"
                onChange={code => setCode(code)}
            />
            <View>
                <AppInput
                    value={password}
                    placeholder="Enter a password"
                    onChange={password => setCode(password)}
                />
                <Text>Your password must be at least with 8 characters ...</Text>
            </View>
            <View>
                <AppInput
                    value={password2}
                    placeholder="Retype your password"
                    onChange={password2 => setCode(password2)}
                />
                <Text>You have to enter the same password</Text>
            </View>
            <AppInput
                value={email}
                placeholder="Enter you verify code"
                onChange={email => setCode(email)}
            />
            <AppButton text="Confirm my registration" onPress={switchStep(3)} />
            <Text>Login</Text>

        </View>
    )

};


const Register = () => {

    const [registerStep, setRegisterStep] = useState(1);
    const registerStepList = [
        {
            step: <RegisterNumber switchStep={setRegisterStep(2)} />
        },
        {
            step: <VerifyNumber switchStep={setRegisterStep(3)} />
        },
        {
            step: <RegisterInformation switchStep={setRegisterStep(4)} />
        }
    ];

    const step = registerStepList[registerStep].step;
}

export default Register;