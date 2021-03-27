package com.getwayproject.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Arrays;

import accounts.Session;

public class SignInModule extends ReactContextBaseJavaModule {
    private final Session session;
    private final String TAG = "SignIn";

    public SignInModule(ReactApplicationContext reactContext){
        super(reactContext);
        this.session = Session.getSession();
    }

    @NonNull
    @Override
    public String getName() {
        return "SignIn";
    }

    @ReactMethod
    public void signIn(String username, String password, Promise connectedPromise) {

        session.login(username, password, msg -> {
            String response = Arrays.toString(msg);
            Log.d(TAG, response);
            connectedPromise.resolve(response);
            return null;
        });
    }
}