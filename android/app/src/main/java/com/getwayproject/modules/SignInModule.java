package com.getwayproject.modules;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.github.homesynck.Response;
import com.github.homesynck.connect.Session;


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

        Response signInResponse = session.login(username, password);
        if(!signInResponse.isCorrect())
            connectedPromise.reject("signIn", signInResponse.getResponse());
        connectedPromise.resolve(signInResponse.getResponse());
    }
}