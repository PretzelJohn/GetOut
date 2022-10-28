package com.getout.call;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;

import androidx.core.app.NotificationCompat;

import com.getout.R;

public class JSStartServiceNotification {
    private final static String CHANNEL_ID = "102";
    private final static NotificationChannel CHANNEL = new NotificationChannel(CHANNEL_ID, "com.getout.notifs.start", NotificationManager.IMPORTANCE_DEFAULT);

    public static Notification build(Context context, String title, String message) {
        NotificationManager manager = context.getSystemService(NotificationManager.class);
        manager.createNotificationChannel(CHANNEL);
        NotificationCompat.Builder notif = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(R.drawable.node_modules_reactnativedynamicsearchbar_build_dist_localassets_cleariconwhite)
                .setContentTitle(title)
                .setContentText(message)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setSilent(true)
                .setOngoing(true);
        return notif.build();
    }
}
