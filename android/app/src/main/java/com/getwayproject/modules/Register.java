package com.getwayproject.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.getwayproject.util.VPSConnection;
import com.github.openjson.JSONArray;
import com.github.openjson.JSONObject;

import ch.kuon.phoenix.Channel;
import ch.kuon.phoenix.Socket;

public class Register extends ReactContextBaseJavaModule {

    private final String TAG = "register";

    public Register(ReactApplicationContext applicationContext){
        super(applicationContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Register";
    }



    @ReactMethod
    public void signup(String username,
                       String email,
                       String password,
                       String passwordVerification,
                       Promise promiseConnected
    ){
        
        Socket socket = VPSConnection.getSocket();

        Channel ch = socket.channel("auth:lobby", new JSONObject());

        ch.on("new_msg", (msg) -> {
            return null;
        });
        ch.join(100).receive("ok", (msg) -> {
            JSONArray jsonA = msg.getJSONArray("nom");
            return null;
        });

        JSONObject params = new JSONObject();
        params.accumulate("register_token", "ceci_est_un_token");
        params.accumulate("login", username);
        params.accumulate("password", password);

        Log.d(TAG, params.toString());


        ch.push("register", params, socket.getOpts().getTimeout()).receive("ok", (msg ->{
            Log.d(TAG, msg.toString());
            promiseConnected.resolve(msg);

            return null;
        })).receive("error", (msg) -> {
            Log.e(TAG, msg.toString());
            promiseConnected.reject("server", new JSONObject(msg).getString("reason"));

            return null;
        });
    }

    @ReactMethod
    public void sendPhoneNumber(String phoneNumber, Promise promisePhoneSend){
        Socket socket = VPSConnection.getSocket();
        Channel ch = socket.channel("auth:lobby", new JSONObject());

        ch.on("new_msg", (msg) -> {
            Log.i(TAG, msg.toString());
            return null;
        });
        ch.join(100).receive("ok", (msg) -> {
            JSONArray jsonA = msg.getJSONArray("nom");
            return null;
        });

        JSONObject jsonPhoneNumber = new JSONObject();
        jsonPhoneNumber.accumulate("phone", phoneNumber);

        ch.push("validate_phone", jsonPhoneNumber, socket.getOpts().getTimeout()).receive("ok", (msg) ->{
            Log.d(TAG, msg.toString());
            promisePhoneSend.resolve(msg);
            return null;
        }).receive("error", (msg) -> {
            Log.e(TAG, msg.toString());
            promisePhoneSend.reject("server", new JSONObject(msg).getString("reason"));
            return null;
        });
    }
}
