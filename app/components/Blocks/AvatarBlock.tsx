import React from 'react';
import {  View } from 'react-native';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const AvatarBlock = ({ label}: { label: string;  }) => (
  <View>
    <Avatar alt="Zach Nugent's Avatar">
        <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
        <AvatarFallback>
          <Text>ZN</Text>
        </AvatarFallback>
      </Avatar>
  </View>
);

export default AvatarBlock;
