package com.getout.role;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.BaseActivityEventListener;

public class RoleListener extends BaseActivityEventListener {

    @Override
    //Listens for the RoleModule#requestRole result
    public void onActivityResult(final Activity activity, int requestCode, int resultCode, final Intent data) {
        if (requestCode != RoleModule.REQUEST_CODE) return;
        if (resultCode == android.app.Activity.RESULT_OK) {
            Log.d("RoleListener", "GetOut is the default app!");
        } else {
            Log.d("RoleListener", "GetOut is not the default app!");
            activity.finish();
        }
    }
}
