package com.getwayproject.modules;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.github.homesynck.Response;
import com.github.homesynck.connect.Session;

public class Register extends ReactContextBaseJavaModule {
    private final Session session;
    private static final String TAG = "Register";

    public Register(ReactApplicationContext applicationContext) {
        super(applicationContext);
        this.session = Session.getSession();
    }

    @NonNull
    @Override
    public String getName() {
        return "Register";
    }

    @ReactMethod
    public void signup(ReadableMap user, Promise signedPromise) {

        String username = user.getString("username");
        String password = user.getString("password");
        String token = "";

        Response registerResponse = session.register(username, password, token);
        if (!registerResponse.isCorrect())
            signedPromise.reject("register", registerResponse.getResponse());
        signedPromise.resolve(registerResponse.getResponse());
    }

    @ReactMethod
    public void sendPhoneNumber(String phoneNumber, Promise promisePhoneSend) {

        Response phoneValidationResponse = session.phoneValidation(phoneNumber);
        if (!phoneValidationResponse.isCorrect())
            promisePhoneSend.reject("register", phoneValidationResponse.getResponse());
        promisePhoneSend.resolve(phoneValidationResponse.getResponse());
    }
}
