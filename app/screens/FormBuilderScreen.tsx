// app/screens/FormBuilderScreen.tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useFormBuilder } from '../components/FormBuilder/FormBuilderContext';
import DragDrop from '../components/FormBuilder/DragDrop';
import Form from '../components/FormBuilder/Form';
import { FormBuilderScreenNavigationProp } from '../navigation/types';


interface FormBuilderScreenProps {
  navigation: FormBuilderScreenNavigationProp;
}

const FormBuilderScreen: React.FC<FormBuilderScreenProps> = ({ navigation }) => {
  const { addField } = useFormBuilder();

  const addInputField = () => {
    addField({
      id: 'input-1',
      type: 'input',
      label: 'Text Input',
      value: '',
    });
    addField({
      id: 'select-1',
      type: 'card',
      label: 'Select Input',
      value: '',
    });
  };

  return (
    <View>
      <Button title="Add Input Field" onPress={addInputField} />
      <DragDrop />
      <Form />
    </View>
  );
};

export default FormBuilderScreen;
