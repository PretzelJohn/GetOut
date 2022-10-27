package com.getout.role;

import static android.content.Context.ROLE_SERVICE;

import android.app.Activity;
import android.app.role.RoleManager;
import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RoleModule extends ReactContextBaseJavaModule {

    public static final int REQUEST_CODE = 101;
    private final ReactApplicationContext context;

    public RoleModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
        context.addActivityEventListener(new RoleListener());
    }

    @ReactMethod
    public void requestRole(String role) {
        if(android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.Q) return;
        RoleManager roleManager = (RoleManager) context.getSystemService(ROLE_SERVICE);
        Intent intent = roleManager.createRequestRoleIntent("android.app.role." + role);
        Activity activity = getCurrentActivity();
        if(activity != null) activity.startActivityForResult(intent, REQUEST_CODE);
    }

    @NonNull
    @Override
    public String getName() {
        return "RoleModule";
    }
}
