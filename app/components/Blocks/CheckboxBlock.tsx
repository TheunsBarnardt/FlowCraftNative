import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

const CheckboxBlock = ({ label }: { label: string }) => {
  const [checked, setChecked] = useState(false);

  return (
    <View className="flex-row gap-3 items-center">
      <Checkbox aria-labelledby="terms" checked={checked} onCheckedChange={setChecked} />
      <Label nativeID="terms" onPress={() => setChecked((prev) => !prev)}>
        {label}
      </Label>
    </View>
  );
};

export default CheckboxBlock ;
