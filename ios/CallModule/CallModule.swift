
import Foundation
import CallKit

@objc(CallModuleiOS) class CallModule: NSObject {
    @objc public func updateBlacklist(_ blacklist: [String]) {
        let defaults = UserDefaults.standard
        defaults.removeObject(forKey: "getoutBlacklist")
        defaults.set(blacklist, forKey: "getoutBlacklist")
        defaults.synchronize()
        NSLog("Blacklist updated: %@", blacklist)

        CXCallDirectoryManager.sharedInstance.reloadExtension(withIdentifier: "org.reactjs.native.example.GetOut2.CallModule", completionHandler: nil)
    }

    @objc static func requiresMainQueueSetup() -> Bool { return true }
}

