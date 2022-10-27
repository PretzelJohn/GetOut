package com.getout.call;

public class CallContact {
    private final String id, phoneNumber, displayName;

    public CallContact(String id, String phoneNumber, String displayName) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.displayName = displayName;
    }

    public String getId() { return this.id; }
    public String getPhoneNumber() { return this.phoneNumber; }
    public String getDisplayName() {
        if(this.displayName.isEmpty()) return this.phoneNumber;
        return this.displayName;
    }
}
