package com.getwayproject.modules;


import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.getwayproject.util.VPSConnection;
import com.github.openjson.JSONArray;
import com.github.openjson.JSONObject;

import ch.kuon.phoenix.Channel;
import ch.kuon.phoenix.Socket;

public class SignInModule extends ReactContextBaseJavaModule {

    private final String TAG = "signin";

    public SignInModule(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "SignIn";
    }

    @ReactMethod
    public void signIn(String username, String password, Promise promiseConnected) {
        
        Socket socket = VPSConnection.getSocket();
        Log.i(TAG, socket.toString());

        Channel ch = socket.channel("auth:lobby", new JSONObject());


        ch.on("new_msg", (msg) -> {
            Log.i(TAG, msg.toString());
            return null;

        });
        ch.join(100).receive("ok", (msg) -> {
            JSONArray jsonA = msg.getJSONArray("nom");
            return null;
        });

        JSONObject connectionParams = new JSONObject();
        connectionParams.accumulate("login", username);
        connectionParams.accumulate("password", password);


        ch.push("login", connectionParams,socket.getOpts().getTimeout()).receive("ok", (msg) -> {
            Log.d(TAG, msg.toString());
            promiseConnected.resolve(msg);

            return null;
        }).receive("error", (msg) -> {
            Log.e(TAG, msg.toString());
            promiseConnected.reject("server", new JSONObject(msg).getString("reason"));
            return null;
        });
    }
}