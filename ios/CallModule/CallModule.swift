
import Foundation
import CallKit

@objc(CallModuleiOS) class CallModule: NSObject {
    @objc public func updateBlacklist(_ blacklist: [String]) {
        let defaults = UserDefaults(suiteName: "group.com.getout")
        defaults?.removeObject(forKey: "blacklist")
        defaults?.set(blacklist, forKey: "blacklist")
        defaults?.synchronize()
        NSLog("Blacklist updated: %@", blacklist)

        CXCallDirectoryManager.sharedInstance.reloadExtension(withIdentifier: "org.reactjs.native.example.GetOut2.CallModule", completionHandler: nil)
    }

    @objc static func requiresMainQueueSetup() -> Bool { return true }
}

