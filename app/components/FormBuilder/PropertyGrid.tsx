// app/components/FormBuilder/PropertyGrid.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useFormBuilder } from './FormBuilderContext';

interface PropertyGridProps {
  selectedBlockId: string | null;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ selectedBlockId }) => {
  const { formState, updateBlock } = useFormBuilder();
  const [properties, setProperties] = useState<{ label: string; value: any; options?: string[] } | null>(null);

  useEffect(() => {
    if (selectedBlockId) {
      const selectedBlock = formState.fields.find((field) => field.id === selectedBlockId);
      if (selectedBlock) {
        setProperties(selectedBlock);
      }
    }
  }, [selectedBlockId, formState.fields]);

  const handleUpdate = (key: string, value: any) => {
    if (selectedBlockId) {
      setProperties((prev) => prev && { ...prev, [key]: value });
      updateBlock(selectedBlockId, { [key]: value });
    }
  };

  if (!properties) {
    return (
      <View>
        <Text style={{ fontSize: 16, color: '#6c757d' }}>Select a block to view and edit properties</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Property Grid</Text>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: 'bold' }}>Label:</Text>
        <TextInput
          value={properties.label}
          onChangeText={(text) => handleUpdate('label', text)}
          style={{
            borderWidth: 1,
            borderColor: '#ced4da',
            borderRadius: 4,
            padding: 8,
            marginTop: 4,
          }}
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: 'bold' }}>Value:</Text>
        <TextInput
          value={String(properties.value)}
          onChangeText={(text) => handleUpdate('value', text)}
          style={{
            borderWidth: 1,
            borderColor: '#ced4da',
            borderRadius: 4,
            padding: 8,
            marginTop: 4,
          }}
        />
      </View>

      {properties.options && (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold' }}>Options:</Text>
          <TextInput
            value={properties.options.join(', ')}
            onChangeText={(text) => handleUpdate('options', text.split(',').map((opt) => opt.trim()))}
            style={{
              borderWidth: 1,
              borderColor: '#ced4da',
              borderRadius: 4,
              padding: 8,
              marginTop: 4,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default PropertyGrid;
