package com.getwayproject.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.Arrays;

import accounts.Session;

public class Register extends ReactContextBaseJavaModule {
    private final Session session;
    private static final String TAG = "Register";

    public Register(ReactApplicationContext applicationContext){
        super(applicationContext);
        this.session = Session.getSession();
    }

    @NonNull
    @Override
    public String getName() {
        return "Register";
    }

    @ReactMethod
    public void signup(ReadableMap user, Promise signedPromise){

        String username = user.getString("username");
        String password = user.getString("password");
        String token = "";

        session.register(username, password, token, msg -> {
            String response = Arrays.toString(msg);
            Log.d(TAG, response);
            signedPromise.resolve(response);
            return null;
        });
    }

    @ReactMethod
    public void sendPhoneNumber(String phoneNumber, Promise promisePhoneSend){

        session.phoneValidation(phoneNumber, msg -> {
            Log.d(TAG, msg);
            promisePhoneSend.resolve(msg);
            return null;
        });
    }
}
