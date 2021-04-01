package com.getwayproject.modules;

import android.os.Build;
import android.os.Environment;
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
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.github.homesynck.Response;
import com.github.homesynck.connect.Connection;
import com.github.homesynck.connect.Directory;
import com.github.homesynck.data.FileManager;
import com.github.homesynck.data.FileSynck;
import com.github.openjson.JSONArray;
import com.github.openjson.JSONException;
import com.github.openjson.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class FileSync extends ReactContextBaseJavaModule {
    private final static String TAG = "FileSync";
    private FileManager fileManager;
    private FileSynck fileSynck;
    private final ReactContext reactContext;
    private Map<String, String> filesDictionary;

    public FileSync(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        filesDictionary = new HashMap<>();
    }


    @NonNull
    @Override
    public String getName() {
        return "FileSync";
    }

    @ReactMethod
    public void openDirectory(Promise promise) {
        String storageDirectory = Environment.getExternalStorageDirectory().getAbsolutePath() + "/Documents/" + Connection.getUser_id();
        Log.i(TAG, "STORAGE FOLDER: " + storageDirectory);
        this.fileManager = new FileManager(storageDirectory);
        Response directoryResponse = Directory.open("app-react");
        Log.i(TAG, Connection.getDirectoryId());
        if (!directoryResponse.isCorrect())
            promise.reject("startSyncing", directoryResponse.getResponse());
        this.fileSynck = new FileSynck(this.fileManager, "");
        promise.resolve("Directory opened");
    }

    @ReactMethod
    public void startSyncing(Promise promise) {
        Response syncResponse = fileSynck.startSyncing();
        if (!syncResponse.isCorrect())
            promise.reject("startSyncing", syncResponse.getResponse());
        promise.resolve("Sync ready");
    }

    @ReactMethod
    public void setOnUpdate() {
        fileSynck.setOnUpdate(update -> onFileModified());
    }

    /**
     * It will be called once, (at the register of an user)
     *
     * @param data        data to be pushed on the server
     * @param promiseSync promise to resolve
     */
    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void syncData(ReadableArray data, Promise promiseSync) {
        List<JSONObject> serializedData = new ArrayList<>();

        for (int i = 0; i < data.size(); ++i) {
            ReadableMap readableMap = data.getMap(i);
            Map<String, Object> objectMap = readableMap.toHashMap();
            JSONObject contentParsed = new JSONObject();

            objectMap.keySet().forEach(key -> contentParsed.accumulate(key, objectMap.get(key)));
            serializedData.add(contentParsed);
        }

        List<String> errors = new ArrayList<>();
        // creating the new files
        serializedData.forEach(o -> {
            String fileName = o.getString("recordID");
            Log.i(TAG, "File name: " + fileName);
            Log.i(TAG, "Content -> " + o.toString());
            try {
                fileManager.editFile("/contacts/" + fileName, o.toString());
            } catch (IOException e) {
                errors.add(e.toString());
            }
        });

        if (!errors.isEmpty())
            promiseSync.reject("syncData", errors.toString());

        Response pushInstructionsResponse = fileSynck.pushInstructions();
        if (!pushInstructionsResponse.isCorrect())
            promiseSync.reject("syncData", pushInstructionsResponse.getResponse());

        promiseSync.resolve("Data synchronized successfully");
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void editFile(ReadableMap fileObject, Promise editPromise) {
        Log.i(TAG, "Enter on editFile method");
        Map<String, Object> objectMap = fileObject.toHashMap();

        JSONObject contentParsed = new JSONObject();

        objectMap.keySet().forEach(key -> contentParsed.accumulate(key, objectMap.get(key)));

        this.filesDictionary = fileManager.getFiles();

        try {
            String fileName = contentParsed.getString("recordID");
            fileManager.editFile("/contacts/" + fileName, contentParsed.toString());
        } catch (IOException e) {
            editPromise.reject("editFile", "You can't edit this file!");
        }

        Response pushInstructionsResponse = fileSynck.pushInstructions();
        if (!pushInstructionsResponse.isCorrect())
            editPromise.reject("editFile", pushInstructionsResponse.getResponse());

        editPromise.resolve("File edited successfully");
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void deleteFile(ReadableMap fileObject, Promise deletePromise) {

        Map<String, Object> objectMap = fileObject.toHashMap();

        JSONObject contentParsed = new JSONObject();

        this.filesDictionary = fileManager.getFiles();

        objectMap.keySet().forEach(key -> contentParsed.accumulate(key, objectMap.get(key)));

        String fileName = contentParsed.getString("recordID");

        try {
            fileManager.deleteFile("/contacts/" + fileName);
        } catch (IOException e) {
            deletePromise.reject("deleteFile", "Can't delete this file");
        }

        Response pushInstructionsResponse = fileSynck.pushInstructions();
        if (!pushInstructionsResponse.isCorrect())
            deletePromise.reject("deleteFile", pushInstructionsResponse.getResponse());

        deletePromise.resolve("File deleted successfully");
    }

    public void onFileModified() {
        // call this method on the api when the server receive updates
        WritableMap params = Arguments.createMap();
        params.putString("update", "new update");
        Log.i(TAG, "new update");
        sendFileModified(this.reactContext, "NewUpdate", params);
    }

    public void sendFileModified(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void getData(Promise dataPromise) {
        this.filesDictionary = fileManager.getFiles();

        WritableNativeArray results = new WritableNativeArray();
        filesDictionary.values().forEach(r -> {
            JSONObject json = new JSONObject(r);
            WritableMap map = convertJsonToMap(json);
            Log.i(TAG, map.toString());
            results.pushMap(map);
        });

        dataPromise.resolve(results);
    }

    private static WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof  Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof  Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String)  {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }

    private static WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = new WritableNativeArray();

        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                array.pushMap(convertJsonToMap((JSONObject) value));
            } else if (value instanceof  JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof  Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof  Double) {
                array.pushDouble((Double) value);
            } else if (value instanceof String)  {
                array.pushString((String) value);
            } else {
                array.pushString(value.toString());
            }
        }
        return array;
    }
}
