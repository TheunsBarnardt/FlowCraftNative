import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormBuilder } from './FormBuilderContext';
import FieldRenderer from './FieldRenderer';
import { Text } from '../ui/text';
import { Button } from '../ui/button';

interface FormProps {
  setSelectedBlockId: (id: string | null) => void;
}

const Form: React.FC<FormProps> = ({ setSelectedBlockId }) => {
  const { formState, removeBlock } = useFormBuilder();

  const handleSelectBlock = (id: string) => {
    setSelectedBlockId(id); // Set the selected block ID
  };

  return (
    <View style={styles.container}>
      {formState.fields.length === 0 ? (
        <Text style={styles.emptyText}>No fields added yet. Add a field to get started!</Text>
      ) : (
        formState.fields.map((field) => (
          <TouchableOpacity
            key={field.id}
            onPress={() => handleSelectBlock(field.id)} // Trigger block selection
            style={styles.fieldContainer}
          >
            <View style={styles.header}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <Button onPress={() => removeBlock(field.id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </Button>
            </View>
            <FieldRenderer field={field} />
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginVertical: 20,
  },
  fieldContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#495057',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#dc3545', // Red background for delete
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default Form;
