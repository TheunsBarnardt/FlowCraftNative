import React from 'react';
import {  View } from 'react-native';
import { Text } from '../ui/text';

import { Badge } from '../ui/badge';


const BadgeBlock = ({ label, }: { label: string; }) => (
  <Badge>
  <Text>{label}</Text>
</Badge>
);

export default BadgeBlock;
