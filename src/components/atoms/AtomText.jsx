import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

const AtomText = ({ children, textStyle, ...props }) => {
  return (
    <Text style={[textStyle]} {...props}>
      {children}
    </Text>
  );
};

export default AtomText;