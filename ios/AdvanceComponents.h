
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNAdvanceComponentsSpec.h"

@interface AdvanceComponents : NSObject <NativeAdvanceComponentsSpec>
#else
#import <React/RCTBridgeModule.h>

@interface AdvanceComponents : NSObject <RCTBridgeModule>
#endif

@end
