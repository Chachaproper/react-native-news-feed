package com.helloapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

// Required package
import io.invertase.firebase.RNFirebasePackage; // <-- Add this line
// Optional packages - add as appropriate
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage; // Firebase Remote Config
import io.invertase.firebase.crash.RNFirebaseCrashPackage; // Firebase Crash Reporting
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // Firebase Realtime Database

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),  // <-- Add this line
            // Add these packages as appropriate
            new RNFirebaseAuthPackage(),
            new RNFirebaseRemoteConfigPackage(),
            new RNFirebaseCrashPackage(),
            new RNFirebaseDatabasePackage(),
            new VectorIconsPackage(),
            new ReactVideoPackage(),
            new ReactNativeDocumentPicker(),
            new RCTCameraPackage(),
            new LinearGradientPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
