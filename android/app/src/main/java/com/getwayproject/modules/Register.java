package com.getwayproject.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.getwayproject.util.VPSConnection;
import com.github.openjson.JSONObject;

import ch.kuon.phoenix.Channel;
import ch.kuon.phoenix.Socket;

public class SignUpModule extends ReactContextBaseJavaModule {

    public SignUpModule(ReactApplicationContext applicationContext){
        super(applicationContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "SignUp";
    }

    public void signup(String username, String password, String phoneNumber, Promise promiseConnected){

        try{
            Class.forName("com.getwayproject.util.VPSConnection");
        }catch (ClassNotFoundException e){
            Log.d("VPSConnectionHandler ->",
                    "Can't load VPSConnection class : Error ->" + e.getMessage());
        }

        Socket socket = VPSConnection.getSocket();
        System.out.println(socket);

        Channel ch = socket.channel("auth:lobby", new JSONObject());

        JSONObject connectionparams = new JSONObject();
        connectionparams.accumulate("login", username);
        connectionparams.accumulate("password", password);
        connectionparams.accumulate("phone", phoneNumber);


        ch.push("register", connectionparams, socket.getOpts().getTimeout()).receive("ok", (msg ->{
            System.out.println("Connection réussie : " + msg.toString());
            promiseConnected.resolve(msg);

            return null;
        })).receive("error", (msg) -> {
            System.out.println("ERREUR : " + msg);
            promiseConnected.reject("server", new JSONObject(msg).getString("reason"));

            return null;
        });
    }
}
