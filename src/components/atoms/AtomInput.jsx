import React from 'react';
import { TextInput, StyleSheet, TextInputProps, TextStyle, ViewStyle } from 'react-native';

const AtomInput = ({ inputStyle, containerStyle, ...props }) => {
    return (
        <TextInput
            style={[styles.input, inputStyle]}
            placeholderTextColor="#ccc"
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
});

export default AtomInput;