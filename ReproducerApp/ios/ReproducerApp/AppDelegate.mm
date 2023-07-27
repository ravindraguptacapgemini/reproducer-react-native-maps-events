#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"ReproducerApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  NSString *mapsKey = @"QUl6YVN5Q1k0OVJpQmVZX2ZxRTh1b0c2WmF1VG9RU0VpNzZLNnB3";
  NSData *decodedData = [[NSData alloc] initWithBase64EncodedString:mapsKey options:0];
  NSString *decodedKey = [[NSString alloc] initWithData:decodedData encoding:NSUTF8StringEncoding];
  
  [GMSServices provideAPIKey:decodedKey];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
