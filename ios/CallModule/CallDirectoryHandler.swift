//
//  CallDirectoryHandler.swift
//  CallModule
//
//  Created by Nicholas Nguyen on 11/1/22.
//

import Foundation
import CallKit

class CallDirectoryHandler: CXCallDirectoryProvider {

    override func beginRequest(with context: CXCallDirectoryExtensionContext) {
        context.delegate = self

        // Check whether this is an "incremental" data request. If so, only provide the set of phone number blocking
        // and identification entries which have been added or removed since the last time this extension's data was loaded.
        // But the extension must still be prepared to provide the full set of data at any time, so add all blocking
        // and identification phone numbers if the request is not incremental.
      
        NSLog("begin request")
        addAllBlockingPhoneNumbers(to: context)
        context.completeRequest()
    }

    private func addAllBlockingPhoneNumbers(to context: CXCallDirectoryExtensionContext) {
        // Retrieve all phone numbers to block from data store. For optimal performance and memory usage when there are many phone numbers,
        // consider only loading a subset of numbers at a given time and using autorelease pool(s) to release objects allocated during each batch of numbers which are loaded.
        //
        // Numbers must be provided in numerically ascending order.
        let allPhoneNumbers: [String] = getBlacklist()
        NSLog("allPhoneNumbers: %@", allPhoneNumbers)
        for phoneNumber in allPhoneNumbers {
            let phInt = Int64(phoneNumber as String)
            context.addBlockingEntry(withNextSequentialPhoneNumber: phInt!)
            NSLog("Blocked number added")
        }
    }

    private func getBlacklist() -> [String] {
      let defaults = UserDefaults(suiteName: "group.com.getout")
      let blacklist: [String]? = defaults?.stringArray(forKey: "blacklist")
      NSLog("blacklist in UserDefaults is: %@", blacklist ?? [])
      return blacklist ?? []
    }
  
}

extension CallDirectoryHandler: CXCallDirectoryExtensionContextDelegate {

    func requestFailed(for extensionContext: CXCallDirectoryExtensionContext, withError error: Error) {
        // An error occurred while adding blocking or identification entries, check the NSError for details.
        // For Call Directory error codes, see the CXErrorCodeCallDirectoryManagerError enum in <CallKit/CXError.h>.
        //
        // This may be used to store the error details in a location accessible by the extension's containing app, so that the
        // app may be notified about errors which occurred while loading data even if the request to load data was initiated by
        // the user in Settings instead of via the app itself.
    }

}
