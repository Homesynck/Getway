package com.getwayproject.modules;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.github.homesynck.connect.Session;

public class UserModule extends ReactContextBaseJavaModule {

    public UserModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "UserModule";
    }

    @ReactMethod
    public void getUsername(Promise promise) {
        promise.resolve(Session.getSession().getName());
    }
}
