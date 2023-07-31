import React from 'react';
import {
  Animated, StyleSheet, TextInput, View,
} from 'react-native';
import getAutomationID from './automationHelper';

export default class IXOutlinedTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };

    this.isFocusedAnimated = new Animated.Value((props.value === '' || props.value === null) ? 0 : 1);
  }

  componentDidUpdate() {
    this.isFocusedAnimated = new Animated.Value((this.props.value === '' || this.props.value === null) ? 0 : 1);
    Animated.timing(this.isFocusedAnimated, {
      toValue: (this.state.isFocused || (this.props.value !== '' && this.props.value !== null)) ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // borderCorlor is not supported by native animated module
    }).start();
  }

  onBlur = () => {
    this.setState({ isFocused: false }, this.props.onBlur);
  }

  onFocus = () => {
    this.setState({ isFocused: true }, this.props.onFocus);
  }

  render() {
    if (!this.isFocusedAnimated) {
      return null;
    }
    const {
      createRef,
      focusedColor,
      placeholder,
      placeholderTextColor,
      style,
      passwordObscured,
    } = this.props;
    const animatedStyles = {
      innerContainer: {
        borderColor: this.isFocusedAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [placeholderTextColor, focusedColor],
        }),
        borderWidth: this.isFocusedAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2],
        }),
        paddingHorizontal: this.isFocusedAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 15],
        }),
        paddingVertical: this.isFocusedAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [5, 4],
        }),
      },
      label: {
        color: this.isFocusedAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [placeholderTextColor, focusedColor],
        }),
        fontSize: this.isFocusedAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 12],
        }),
        left: this.isFocusedAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 8],
        }),
        paddingHorizontal: this.isFocusedAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 8],
        }),
        top: this.isFocusedAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [28, 2],
        }),
        zIndex: this.isFocusedAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 2],
        }),
      },
    };

    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.label, animatedStyles.label]}>{placeholder}</Animated.Text>
        <Animated.View style={[styles.innerContainer, animatedStyles.innerContainer]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 10 }}>
              <TextInput
                {...this.props}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                placeholder=""
                ref={createRef}
                style={[style, styles.input, animatedStyles.input]}
                secureTextEntry={passwordObscured}
                accessible={false}
                {...getAutomationID(this.props.automationId)}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  innerContainer: {
    borderRadius: 4,
  },
  label: {
    backgroundColor: '#fff',
    position: 'absolute',
  },
  input: {
    zIndex: 1,
    height: 47,
    padding: 3,
  },
  loginPasswordVisibilityIcon: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'right',
  },
});
