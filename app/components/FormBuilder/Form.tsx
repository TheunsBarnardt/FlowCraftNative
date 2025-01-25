import React from 'react';
import { View } from 'react-native';
import { useFormBuilder } from './FormBuilderContext';
import FieldRenderer from './FieldRenderer';
import { Text } from '../ui/text';
import { Button } from '../ui/button';


const Form = () => {
  const { formState,removeBlock  } = useFormBuilder();
  return (
    <View>
      {formState.fields.map((field) => (
        <View key={field.id} style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{field.label}</Text>
            <Button onPress={() => removeBlock(field.id)} ><Text>Remove</Text></Button>
          </View>
          <FieldRenderer field={field} />
        </View>
      ))}
    </View>
  );
};

export default Form;
