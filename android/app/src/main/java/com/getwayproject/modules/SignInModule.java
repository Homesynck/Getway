package com.getwayproject.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.github.homesynck.connect.Session;

import java.util.Arrays;


public class SignInModule extends ReactContextBaseJavaModule {
    private final Session session;
    private final String TAG = "SignIn";

    public SignInModule(ReactApplicationContext reactContext) {
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

        session.login(username, password, success -> {
            String response = Arrays.toString(success);
            Log.d(TAG, response);
            connectedPromise.resolve(response);
        }, error -> {
            Log.e(TAG, error);
            connectedPromise.reject("homesynck", error);
        });
    }
}