package com.getout.call;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.telecom.Call;
import android.telecom.CallScreeningService;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.getout.MainActivity;
import com.getout.R;

@RequiresApi(api = Build.VERSION_CODES.N)
public class CallHandler extends CallScreeningService {

    @Override
    public void onScreenCall(Call.Details callDetails) {
        //Check android version
        if(Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            Log.d("MainActivity", "Error: Android OS version is less than 10");
            return;
        }

        //Check for incoming calls
        if(callDetails.getCallDirection() != Call.Details.DIRECTION_INCOMING) return;


        //Get the phone number (without the "tel:+1" part), timestamp, location, and whether to block
        String phoneNumber = Uri.decode(callDetails.getHandle().toString().replace("tel:%2B1", ""));
        long timestamp = callDetails.getCreationTimeMillis();
        String location = "Unknown"; //TODO: Get from geolocation library???
        boolean blocked = false; //TODO: Get from JS instead of hardcoding


        //TODO: Insert call into database
        //insert(phoneNumber, timestamp, location, blocked);


        //Send a notification if blocked
        //TODO: Uncomment the below "if" statement, or move to JS
        //if(blocked) {
            Intent intent = new Intent(getApplicationContext(), MainActivity.class);
            NotificationChannel channel = new NotificationChannel("102", "com.getout.notifs.blocked", NotificationManager.IMPORTANCE_DEFAULT);
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
            Notification.Builder notif = new Notification.Builder(getApplicationContext(), "102")
                    .setSmallIcon(R.drawable.node_modules_reactnativedynamicsearchbar_build_dist_localassets_cleariconwhite)
                    .setContentTitle("GetOut")
                    .setContentText("Blocked call from: "+phoneNumber.substring(0, 3)+"-"+phoneNumber.substring(3, 6)+"-"+phoneNumber.substring(6))
                    .setContentIntent(PendingIntent.getActivity(getApplicationContext(), 0, intent, PendingIntent.FLAG_IMMUTABLE));
            manager.notify(102, notif.build());
        //}


        //Sends a response - must be called within 5 seconds
        CallResponse response = new CallResponse.Builder()
                .setDisallowCall(blocked)
                .setSkipCallLog(false)
                .setRejectCall(false)
                .setSilenceCall(false)
                .setSkipNotification(false)
                .build();
        respondToCall(callDetails, response);
    }
}
