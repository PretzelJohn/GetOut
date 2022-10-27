package com.getout.call;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.RequiresApi;

public class CallBootReceiver extends BroadcastReceiver {

    private final static String TAG = "CallBootReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        if(!intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED)) return;
        Log.d(TAG, "onReceive()");
        Bundle bundle = new Bundle();
        bundle.putString("phoneNumber", null);
        bundle.putString("timestamp", null);
        bundle.putString("location", null);
        Intent service = new Intent(context, CallHeadlessService.class);
        service.putExtras(bundle);
        context.startForegroundService(service);
    }
}
