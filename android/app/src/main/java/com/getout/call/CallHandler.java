package com.getout.call;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.telecom.Call;
import android.telecom.CallScreeningService;
import android.util.Log;

public class CallHandler extends CallScreeningService {

    private static final String TAG = "CallHandler";
    private static final CallResponse BLOCK = new CallResponse.Builder().setDisallowCall(true).build();
    private static final CallResponse ALLOW = new CallResponse.Builder().setDisallowCall(false).build();

    private static CallHandler INSTANCE;

    private Call.Details details = null;

    public CallHandler() {
        INSTANCE = this;
        Log.d(TAG, "CallHandler()");
    }

    //Responds to an incoming call - must be called within 5 seconds of onScreenCall()
    public void respond(boolean block) {
        if(details == null) {
            Log.d(TAG, "Error: details is null");
            return;
        }

        respondToCall(details, block ? BLOCK : ALLOW);
    }

    @Override
    public void onScreenCall(Call.Details callDetails) {
        //Check for incoming calls
        if(callDetails.getCallDirection() != Call.Details.DIRECTION_INCOMING) return;

        Log.d(TAG, "Fetching call details...");
        details = callDetails;

        //Get the phone number (without the "tel:+1" part), timestamp, location, and whether to block
        String phoneNumber = Uri.decode(callDetails.getHandle().toString().replace("tel:%2B1", ""));
        long timestamp = callDetails.getCreationTimeMillis();
        String location = "Unknown"; //TODO: Get from geolocation library???

        //Send event to JS
        Log.d(TAG, "Details fetched! Sending to JS...");
        Bundle bundle = new Bundle();
        bundle.putString("phoneNumber", phoneNumber);
        bundle.putLong("timestamp", timestamp);
        bundle.putString("location", location);
        Intent service = new Intent(getApplicationContext(), CallHeadlessService.class);
        service.putExtras(bundle);
        startService(service);
        Log.d(TAG, "Sent to JS!");
    }

    //Getters
    public static CallHandler getInstance() { return INSTANCE; }
}
