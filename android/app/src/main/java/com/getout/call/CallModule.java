package com.getout.call;

import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CallModule extends ReactContextBaseJavaModule {

    private final static String TAG = "CallModule";
    private final ReactApplicationContext context;
    private Intent service = null;

    public CallModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @ReactMethod
    public void sendResponse(boolean block) {
        CallHandler.getInstance().respond(block);
    }

    @ReactMethod
    public void startService() {
        if(this.service != null) return;
        this.service = new Intent(this.context, CallService.class);
        this.context.startForegroundService(service);
        Log.d(TAG, "Service started");
    }

    @ReactMethod
    public void stopService() {
        if(this.service == null) return;
        this.context.stopService(this.service);
        this.service = null;
        Log.d(TAG, "Service stopped");
    }

    @NonNull
    @Override
    public String getName() {
        return TAG;
    }
}
