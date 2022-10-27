package com.getout.call;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CallModule extends ReactContextBaseJavaModule {

    public CallModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void sendResponse(boolean block) {
        CallHandler.getInstance().respond(block);
    }

    @NonNull
    @Override
    public String getName() {
        return "CallModule";
    }
}
