package com.getway.modules;

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
import com.github.homesynck.connect.Directory;
import com.github.homesynck.data.FileException;
import com.github.homesynck.data.FileManager;
import com.github.homesynck.data.FileSynck;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class FileSync extends ReactContextBaseJavaModule {
    private final static String TAG = "FileSync";
    private final FileManager fileManager;
    private final FileSynck fileSynck;
    private final ReactContext reactContext;
    private Map<String, String> filesDictionary;

    public FileSync(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        String STORAGE_DIRECTORY = super.getReactApplicationContext()
                .getFilesDir().getAbsolutePath();
        this.fileManager = new FileManager(STORAGE_DIRECTORY);
        this.fileSynck = new FileSynck(this.fileManager, "");
        fileSynck.setOnUpdate(update -> onFileModified());
        filesDictionary = new HashMap<>();
    }

    @NonNull
    @Override
    public String getName() {
        return "FileSync";
    }

    /**
     * It will be called once, (at the register of an user)
     * @param data data to be pushed on the server
     * @param promiseSync promise to resolve
     */
    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void syncData(ReadableArray data, Promise promiseSync) {
        List<Object> serializedData = data.toArrayList();
        // creating the new directory
        Directory.create("test", "Directory test", "", success -> {
            serializedData.forEach(o -> {
                fileSynck.pushUpdate(o.toString(), pushSuccess -> {}, error -> {
                    promiseSync.reject("homesynck", error);
                });
            });
            promiseSync.resolve(success);
        }, error -> {
            promiseSync.reject("homesynck", error);
        });
        this.filesDictionary = fileManager.getFiles();
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void editFile(JSONObject content, Promise editPromise) {

        try {
            String fileName = content.getString("recordId");
            String filePath = filesDictionary.keySet().stream()
                    .filter(path -> path.contains(fileName)).findAny().orElse(null);
            fileManager.editFile(filePath, content.toString());
            editPromise.resolve("All is good");
        } catch (JSONException | IOException e) {
            e.printStackTrace();
            editPromise.reject("homesynck", "There was a problem");
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void deleteFile(JSONObject content, Promise deletePromise) {

        try {
            String fileName = content.getString("recordId");
            String filePath = filesDictionary.keySet().stream()
                    .filter(path -> path.contains(fileName)).findAny().orElse(null);
            fileManager.deleteFile(filePath);
            deletePromise.resolve("All is good");
        } catch (JSONException | FileException e) {
            e.printStackTrace();
            deletePromise.reject("homesynck", "There was a problem");
        }
    }

    public void onFileModified() {
        // call this method on the api when the server receive updates
        WritableMap params = Arguments.createMap();
        sendFileModified(this.reactContext, "FileNotSync", params);
    }

    @ReactMethod
    public void sendFileModified(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void getData(Promise dataPromise) {
        this.filesDictionary = fileManager.getFiles();
//        filesDictionary.values().forEach(f -> Log.i(TAG, f));
        List<String> data = filesDictionary.values().stream().collect(Collectors.toList());

        dataPromise.resolve(data);
    }
}

