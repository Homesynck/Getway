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

        try {
            Class.forName("com.getwayproject.util.VPSConnection");
        }catch (ClassNotFoundException e) {
            Log.d("VPSConnection Handler ->",
                    "Can't load VPSConnection class : Error ->" + e.getMessage());
        }
        
        Socket socket = VPSConnection.getSocket();
        System.out.println(socket);

        Channel ch = socket.channel("auth:lobby", new JSONObject());


        ch.on("new_msg", (msg) -> {
            System.out.println(msg.toString());
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
            Log.d("CONNECTION SUCCESS", msg.toString());
            promiseConnected.resolve(msg);

            return null;
        }).receive("error", (msg) -> {
            Log.d("ERROR", msg.toString());
            promiseConnected.reject("server", new JSONObject(msg).getString("reason"));
            return null;
        });
    }
}