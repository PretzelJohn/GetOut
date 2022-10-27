package com.getout.call;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class CallHeadlessService extends HeadlessJsTaskService {
    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if(extras == null) return null;
        startForeground(1, CallNotification.build(getApplicationContext(), "GetOut", "Incoming call..."));
        return new HeadlessJsTaskConfig("CallHandler", Arguments.fromBundle(extras), 5000, true);
    }
}
