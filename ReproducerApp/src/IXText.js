import React from 'react';
import { Text, StyleSheet } from 'react-native';

const IXText = ({
  italics, bolds, text, style, mandatory, linesNum, automationId, unitTestID,
}) => {
  const _mandatory = mandatory ? <Text style={styles.mandatoryIndicator}>*</Text> : null;
  const _text = text;
  return (
    <Text
      style={[
        styles.base,
        italics && styles.italics,
        bolds && styles.bolds,
        style,
      ]}
      numberOfLines={linesNum}
    >
      {_text}
      {_mandatory}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: 'grey',
  },
  italics: {
    fontStyle: 'italic',
  },
  bolds: {
    fontWeight: 'bold',
  },
  mandatoryIndicator: {
    color: 'green',
  },
});

export default IXText;