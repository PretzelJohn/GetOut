package com.getout.call;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

public class CallBootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if(!intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED)) return;
        Bundle bundle = new Bundle();
        bundle.putBoolean("BootComplete", true);
        Intent service = new Intent(context, JSStartService.class);
        service.putExtras(bundle);
        context.startForegroundService(service);
    }
}
