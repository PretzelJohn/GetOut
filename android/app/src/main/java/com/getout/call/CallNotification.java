package com.getout.call;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.RequiresApi;

import com.getout.MainActivity;
import com.getout.R;

public class CallNotification {
    private final static String CHANNEL_ID = "101";
    private final static NotificationChannel CHANNEL = new NotificationChannel(CHANNEL_ID, "com.getout.notifs.blocked", NotificationManager.IMPORTANCE_HIGH);

    public static Notification build(Context context, String title, String message) {
        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);
        NotificationManager manager = context.getSystemService(NotificationManager.class);
        manager.createNotificationChannel(CHANNEL);
        Notification.Builder notif = new Notification.Builder(context, CHANNEL_ID)
                .setSmallIcon(R.drawable.node_modules_reactnativedynamicsearchbar_build_dist_localassets_cleariconwhite)
                .setContentTitle(title)
                .setContentText(message)
                .setContentIntent(pendingIntent)
                .setVisibility(Notification.VISIBILITY_PUBLIC)
                .setOngoing(true);
        return notif.build();
    }
}
