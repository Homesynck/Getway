package com.getwayproject.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.github.homesynck.accounts.Session;

import java.util.Arrays;


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

        session.register(username, password, token, success -> {
            String response = Arrays.toString(success);
            Log.d(TAG, response);
            signedPromise.resolve(response);
        }, error -> {
            Log.e(TAG, error);
            signedPromise.reject("homesynck", error);
        });
    }

    @ReactMethod
    public void sendPhoneNumber(String phoneNumber, Promise promisePhoneSend){

        session.phoneValidation(phoneNumber, success -> {
            Log.d(TAG, success);
            promisePhoneSend.resolve(success);
        }, error -> {
            Log.e(TAG, error);
            promisePhoneSend.reject("homesynck", error);
        });
    }
}
