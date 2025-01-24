import React from 'react';
import {  View } from 'react-native';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


const ButtonBlock = ({ label }: { label: string;}) => (
  <Button>
  <Text>{label}</Text>
</Button>
);

export default ButtonBlock;
