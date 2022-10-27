package com.getout.call;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class CallBootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if(!intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED)) return;
        context.startForegroundService(new Intent(context, CallService.class));
    }
}
