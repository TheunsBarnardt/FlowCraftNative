import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  value: string;
}

export const Input: React.FC<InputProps> = ({ value, ...props }) => {
  return <TextInput value={value} {...props} />;
};
