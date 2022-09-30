package com.rn_fair_bill;
import android.os.Bundle; // <- add this necessary import
import com.facebook.react.ReactActivityDelegate;      //react-native-gesture-handler
import com.facebook.react.ReactRootView;         //react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;    //react-native-gesture-handler
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash; // <- add this necessary import

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "rn_fair_bill";
  }



  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // 
 
}
@Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
        protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}