package com.getout.call;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class JSStartService extends HeadlessJsTaskService {
    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        startForeground(2, JSStartServiceNotification.build(getApplicationContext(), "GetOut", "Starting..."));
        return new HeadlessJsTaskConfig("StartService", extras == null ? null : Arguments.fromBundle(extras), 15000, true);
    }
}
