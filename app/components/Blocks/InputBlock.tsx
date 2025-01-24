import React from 'react';
import {  View } from 'react-native';
import { Text } from '../ui/text';
import { Input } from '../ui/input';


const InputBlock = ({ label, value }: { label: string; value: string }) => (
  <View>
    <Text>{label}</Text>
    <Input value={value} />
  </View>
);

export default InputBlock;
