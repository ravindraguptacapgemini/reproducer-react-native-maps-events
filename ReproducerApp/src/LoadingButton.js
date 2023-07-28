import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View } from 'react-native';

import IXButton from './IXButton';
import IXText from './IXText';

class LoadingButton extends IXButton {
  render() {
    const { text, isLoading } = this.props;
    const textProperties = this.getTextTheme();

    return (
      <IXButton {...this.props}>
        <View style={styles.alignmentContainer}>
          <IXText
            text={text}
            linesNum={this.props.numberOfLines}
            style={textProperties}
          />
        </View>
      </IXButton>
    );
  }
}

LoadingButton.displayName = 'LoadingButton';

LoadingButton.propTypes = {
  isLoading: PropTypes.bool,
};

const styles = StyleSheet.create({
  alignmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loader: {
    paddingHorizontal: 10,
    paddingTop: 2,
    position: 'absolute',
    left: -40,
  },
});

export default LoadingButton;
