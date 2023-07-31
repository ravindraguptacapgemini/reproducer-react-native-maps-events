import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import IXOutlinedTextInput from './IXOutlinedTextInput';
import LoadingButton from './LoadingButton';

class UrlSetupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSiteUrlFocused: false,
      notValidUrl: false,
    };
    this.urlField = this.props.url;
  }

  versionPress() {
    if (this.versionPressCount >= 6) {
      this.forceUpdate();
      return;
    }
    this.versionPressCount += 1;
  }

  renderLogo() {
    return (
      <View style={styles.logoArea}>
        <View style={styles.logoAreaContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.imageLogo} source={require('./intelexLogo.png')} resizeMode="contain" />
          </View>
        </View>
      </View>
    );
  }

  renderVersion() {
    return (
      <View style={styles.containerBottom}>
        <View style={[styles.versionContainer]} testID="versionContainer" accessibilityLabel="versionContainer">
          <Text style={styles.versionText} testID="versionText" accessibilityLabel="versionText" onPress={this.versionPress}>
            {'10.0.1'}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const HTTPS = 'https://';
    const { keyboardHeight } = this.props;
    const { isSiteUrlFocused } = this.state;
    const isKeyboardOpen = keyboardHeight !== 0;

    return (
      <View style={styles.urlForm}>
        {!isKeyboardOpen && this.renderLogo()}
        <View style={[styles.urlFormContainer, isKeyboardOpen && { marginBottom: keyboardHeight }]}>
          <Text style={styles.textUrlDescription}>{'Sample text description'}</Text>
          <View style={[styles.loginField, isSiteUrlFocused && styles.loginFocusedField]}>
            <IXOutlinedTextInput
              automationId="urlField"
              autoCapitalize="none"
              createRef={(ref) => {
                this.siteUrlField = ref;
              }}
              autoCorrect={false}
              defaultValue={this.urlField}
              editable={!this.props.isValidating}
              focusedColor={'#0076BD'}
              keyboardType="url"
              onBlur={() => {
                if (this.urlField === '') {
                  this.siteUrlField.setNativeProps({ text: '' });
                }
                this.setState({ isSiteUrlFocused: false });
              }}
              onChangeText={(e) => {
                this.urlField = e;
              }}
              onFocus={() => {
                if (this.urlField === '') {
                  this.siteUrlField.setNativeProps({ text: HTTPS });
                }
                this.setState({ isSiteUrlFocused: true });
              }}
              onSubmitEditing={this.validate}
              placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
              returnKeyType="next"
              style={styles.urlTextInput}
              underlineColorAndroid="transparent"
            />
            {isSiteUrlFocused
              && (
                <View style={styles.fieldHintContainer}>
                  <Text style={styles.fieldHintText}>{'Input your site url'}</Text>
                </View>
              )}
          </View>
          <View style={styles.containerNextButton}>
            <LoadingButton
              automationID="nextButton"
              text={'Next'}
              style={styles.loginButton}
              border={false}
              type="login"
              color={'black'}
              onPress={this.onPressNext}
              disabled={this.props.isValidating}
              isLoading={this.props.isValidating}
            />
          </View>
        </View>
        {!isKeyboardOpen && this.renderVersion()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  urlForm: {
    flex: 1,
    maxWidth: null,
  },
  logoArea: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 150,
    paddingBottom: 34,
  },
  logoAreaContainer: {
    flexDirection: 'column',
    width: '100%',
    aspectRatio: 16 / 9,
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'stretch',
    flex: 1,
    paddingTop: 32,
  },
  imageLogo: {
    flex: 1,
    height: null,
    width: null,
  },
  urlFormContainer: {
    paddingHorizontal: 32,
    paddingBottom: 8,
    paddingTop: 7,
    minHeight: 250,
  },
  textUrlDescription: {
    color: 'black',
    marginTop: 22,
    textAlign: 'center',
    fontSize: 14,
  },
  learnMoreLink: {
    color: 'red',
    marginTop: 3,
    textAlign: 'center',
    fontSize: 12,
  },
  loginField: {
    marginBottom: 16,
    marginTop: 7,
  },
  loginFocusedField: {
    marginBottom: 0,
  },
  urlTextInput: {
    color: 'grey',
    fontSize: 12,
    height: 36,
    textAlignVertical: 'center',
  },
  fieldHintContainer: {
    height: 17,
    marginLeft: 18,
    marginTop: 3,
  },
  fieldHintText: {
    color: 'blue',
    fontSize: 12,
  },
  loginButton: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 4,
    height: 50,
    elevation: 1,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 1,
    alignContent: 'center',
    backgroundColor: 'red',
    marginTop: 10,
  },
  containerNextButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerBottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  versionText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default UrlSetupForm;
