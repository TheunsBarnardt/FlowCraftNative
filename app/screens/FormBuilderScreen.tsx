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
  const { addBlock } = useFormBuilder();

  const addInputField = () => {
    addBlock({
      id: 'input-1',
      type: 'accordion',
      label: 'Text Input',
      value: '',
    });
    addBlock({
      id: 'select-1',
      type: 'select',
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
