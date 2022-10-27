package com.getout.call;

import android.app.Service;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;

import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;

public class CallService extends Service {

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Context context = getApplicationContext();
        Bundle bundle = new Bundle();
        bundle.putString("phoneNumber", null);
        bundle.putLong("timestamp", -1);
        bundle.putString("location", null);
        Intent headlessService = new Intent(context, CallHeadlessService.class);
        headlessService.putExtras(bundle);
        context.startService(headlessService);
        HeadlessJsTaskService.acquireWakeLockNow(context);
        startForeground(1, CallNotification.build(getApplicationContext(), "GetOut", "Call blocking is enabled!"));
        return START_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
