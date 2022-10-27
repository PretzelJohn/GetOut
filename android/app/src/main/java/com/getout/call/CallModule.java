package com.getout.call;

import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CallModule extends ReactContextBaseJavaModule {

    public CallModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void sendResponse(boolean block, boolean useContacts) {
        CallHandler.getInstance().respond(block, useContacts);
    }

    @NonNull
    @Override
    public String getName() {
        return "CallModule";
    }
}
