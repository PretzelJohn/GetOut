package com.getout.call;

import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CallModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext context;

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
        this.context.startForegroundService(new Intent(this.context, CallService.class));
        Log.d("CallModule", "Service started");
    }

    @NonNull
    @Override
    public String getName() {
        return "CallModule";
    }
}
