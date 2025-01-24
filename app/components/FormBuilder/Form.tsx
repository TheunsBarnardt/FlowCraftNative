import React from 'react';
import { View } from 'react-native';
import { useFormBuilder } from './FormBuilderContext';
import FieldRenderer from './FieldRenderer';


const Form = () => {
  const { formState } = useFormBuilder();

  return (
    <View>
      {formState.fields.map((field) => (
        <View key={field.id}>
          <FieldRenderer field={field} />
        </View>
      ))}
    </View>
  );
};

export default Form;
