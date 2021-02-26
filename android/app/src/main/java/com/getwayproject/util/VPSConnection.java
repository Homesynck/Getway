package com.getwayproject.util;

import java.util.HashMap;

import ch.kuon.phoenix.Socket;

public class VPSConnection {
    private static Socket socket;

    static {
        newSocket();
    }

    public static Socket getSocket(){
        return socket;
    }

    private static void newSocket() {

        Socket.Options opts = new Socket.Options();
        opts.setTimeout(5000);
        opts.setHeartbeatIntervalMs(100000);
        opts.setRejoinAfterMs((tries) -> tries * 500);
        opts.setReconnectAfterMs((tries) -> tries * 500);
        opts.setLogger((tag, msg) ->
        {
            System.out.println(tag + " " + msg);
            return null;
        });

        HashMap<String, Object> params = new HashMap<>();
        params.put("user_token", "supersecret");
        opts.setParams(params); // params

        socket = new Socket("ws://149.202.42.98:4000/socket", opts);
        socket.connect();

        System.out.println("Socket instanciation ->" +socket.toString());

        socket.onError((String msg) -> {
            System.out.println("There was an error with the connection!");
            return null;
        });
        socket.onClose((Integer code, String msg) -> {
            System.out.println("The connection closed!");
            return null;
        });
    }
}
