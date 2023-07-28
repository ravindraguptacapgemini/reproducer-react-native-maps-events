import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';

class IXButton extends Component {
  getContainerTheme(buttonSettings = {}) {
    const type = buttonSettings.type || this.props.type;
    const border = buttonSettings.border || this.props.border;

    return ([
      border && styles.buttonBorder,
      {
        backgroundColor: 'red',
        borderColor: 'black',
      },
    ]);
  }

  getTextTheme(buttonSettings = {}) {
    const type = buttonSettings.type || this.props.type;

    return (
      [
        styles.baseTextSize,
        { color: 'black' },
        { fontSize: 14 },
        { fontWeight: 'regular' },
      ]
    );
  }

  getIconTheme(buttonSettings = {}) {
    const disabled = buttonSettings.disabled || this.props.disabled;

    const textProperties = this.getTextTheme();

    return textProperties.concat({
      opacity: (disabled) ? 0.5 : 1,
      fontSize: 14,
    });
  }

  render() {
    const {
      disabled, onPress, style, automationID, highlightOnPress,
    } = this.props;
    const containerProperties = this.getContainerTheme();

    // wrapper layer around touchable so only the contents of the button change
    // opacity on press. let prop style override calculated ones in case odd
    // customizations are needed, like the ones from CircleButton.
    return (
      <View style={[containerProperties, styles.centerContents, style]}>
        {
          highlightOnPress
            ? (
              <TouchableHighlight
                key={automationID}
                disabled={disabled}
                onPress={!disabled ? onPress : () => { }}
                underlayColor={intelexTheme.BULLETIN_BUTTON_ACTION_HIGHLIGHT}
                style={styles.addHeight}
                accessible={false}
              >

                {this.props.children}
              </TouchableHighlight>
            )
            : (
              <TouchableOpacity
                key={automationID}
                disabled={disabled}
                onPress={!disabled ? onPress : () => {
                }}
                style={styles.addHeight}
                accessible={false}
              >

                {this.props.children}
              </TouchableOpacity>
            )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerContents: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonBorder: {
    borderRadius: 4,
    borderWidth: 1,
  },
  addHeight: {
    paddingVertical: 7,
  },
  baseTextSize: {
    fontSize: 12,
  },
});

export default IXButton;
