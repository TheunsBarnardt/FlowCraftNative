import React from 'react';
import {  View } from 'react-native';
import { Text } from '../ui/text';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';


const SelectBlock = ({
  label,
  value,
  options,
}: {
  label: string;
  value: string;
  options: string[];
}) => (
  <View>
    <Text>{label}</Text>
    <Select
      defaultValue={{
        value,
        label,
      }}
    >
      <SelectTrigger className="w-[250px]">
        <SelectValue
          className="text-foreground text-sm native:text-lg"
          placeholder={label}
        />
      </SelectTrigger>
      <SelectContent className="w-[250px]">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} label={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </View>
);

export default SelectBlock;
