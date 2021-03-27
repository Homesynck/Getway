package com.getwayproject.modules;

import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.List;

public class FileSync extends ReactContextBaseJavaModule {
    private final static String TAG = "FileSync";
    private static String STORAGE_DIRECTORY;

    private final ReactContext reactContext;

    public FileSync(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        STORAGE_DIRECTORY = super.getReactApplicationContext().getFilesDir().getAbsolutePath();
    }

    @NonNull
    @Override
    public String getName() {
        return "FileSync";
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void syncData(ReadableArray data, Promise promiseSync) {
        List<Object> serializedData = data.toArrayList();
        serializedData.forEach(o -> Log.i(TAG, String.valueOf(o)));
        // TODO 1 contact by files
        // TODO file creating
        promiseSync.resolve("YES");
    }

    public void sendFileModified(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public void onFileModified() {
        // event method
        // on content or file updated
        // notify method calls this method
        WritableMap params = Arguments.createMap();
        params.putString("sync", "A file is not sync");
        sendFileModified(this.reactContext, "FileNotSync", params);
    }
}

