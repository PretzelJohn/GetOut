//
//  RCTCallModule.m
//  GetOut
//
//  Created by Nicholas Nguyen on 11/2/22.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

//@implementation RCTCallModule

// To export a module named RCTCallModule
@interface RCT_EXTERN_MODULE(CallModuleiOS, NSObject)
    RCT_EXTERN_METHOD(updateBlacklist: (NSArray*)list)
@end

// RCT_EXPORT_MODULE(CallModuleiOS);

// RCT_EXPORT_METHOD(sendBlacklist:(NSArray *)list)
// {
//   Blacklist *blacklist = [[Blacklist alloc] init];
//   [Blacklist updateBlacklist](list);
//   RCTLogInfo(@"Test is Running %@", list);
// }

//@end

