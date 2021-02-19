package com.getwayproject;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class GetwayModule extends ReactContextBaseJavaModule {

    public GetwayModule(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Getway";
    }

    @ReactMethod
    public void sayHi(Callback errorCallback, Callback successCallback){
        try {
            System.out.println("sout : Salut ! C'est Java.");
            successCallback.invoke("Callback : Salutation ! C'est java !");
        }catch (IllegalViewOperationException e){
            errorCallback.invoke(e.getMessage());
        }
    }
}
