import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  LayoutAnimation,
  UIManager,
  Keyboard,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import UrlSetupForm from './UrlSetupForm';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
  }

  componentDidMount() {
    this.createKeyboardListeners()
  }

  componentDidUpdate() {
    const animationSettings = {
      duration: 500,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    };
    LayoutAnimation.configureNext(animationSettings);
  }

  componentWillUnmount() {
    // Remove Navigation Listener Subscriptions
    if (this.willFocusSubscription) {
      this.willFocusSubscription();
    }

    if (this.willBlurSubscription) {
      this.willBlurSubscription();
    }
  }

  createKeyboardListeners() {
    const isAndroid = Platform.OS === 'android';
    this.keyboardShowListener = Keyboard.addListener(isAndroid ? 'keyboardDidShow' : 'keyboardWillShow', this.keyboardWillShow);
    this.keyboardHideListener = Keyboard.addListener(isAndroid ? 'keyboardDidHide' : 'keyboardWillHide', this.keyboardWillHide);
  }

  removeKeyboardListeners = () => {
    if (this.keyboardShowListener) {
      this.keyboardShowListener.remove();
    }
    if (this.keyboardHideListener) {
      this.keyboardHideListener.remove();
    }
    this.setState({ keyboardHeight: 0 });
  }

  keyboardWillShow(event) {
    this.setState({ keyboardHeight: event.endCoordinates.height });
  }

  keyboardWillHide() {
    if (this.state.keyboardHeight !== 0) {
      this.setState({ keyboardHeight: 0 });
    }
  }

  render() {
    const { isLoading, keyboardHeight, showingQRScanner } = this.state;
    const formProps = { keyboardHeight, showingQRScanner };
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'white'} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} testID="touchableWithoutFeedback" accessibilityLabel="touchableWithoutFeedback" accessible={false}>
          <View style={styles.container}>
            <View style={styles.loginContainer} testID="loginContainer" accessibilityLabel="loginContainer">
              <UrlSetupForm {...formProps} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  loginContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LoginScreen;
