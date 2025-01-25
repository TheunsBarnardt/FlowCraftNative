import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useFormBuilder } from './FormBuilderContext';
import { CheckIcon } from 'lucide-react-native';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface PropertyGridProps {
  selectedBlockId: string | null;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ selectedBlockId }) => {
  const { formState, updateBlock } = useFormBuilder();
  const [properties, setProperties] = useState<{
    label: string;
    value: any;
    options?: string[];
    children?: any[];
    type?: string;
  } | null>(null);

  // Update properties when the selected block changes
  useEffect(() => {
    if (selectedBlockId) {
      const selectedBlock = formState.fields.find((field) => field.id === selectedBlockId);
      if (selectedBlock) {
        setProperties(selectedBlock);
      }
    }
  }, [selectedBlockId, formState.fields]);

  // Handle property updates
  const handleUpdate = (key: string, value: any) => {
    if (selectedBlockId) {
      setProperties((prev) => prev && { ...prev, [key]: value });
      updateBlock(selectedBlockId, { [key]: value });
    }
  };

  // Handle adding a new block to VStack/HStack
  const handleAddChildBlock = (type: string) => {
    if (selectedBlockId && (properties?.type === 'vstack' || properties?.type === 'hstack')) {
      const newBlock = {
        id: `${type}-${Date.now()}`, // Unique ID
        type,
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
        value: '',
        ...(type === 'select' && { options: ['Option 1', 'Option 2', 'Option 3'] }),
      };
      const updatedChildren = [...(properties.children || []), newBlock];
      handleUpdate('children', updatedChildren);
    }
  };

  if (!properties) {
    return (
      <View>
        <Text style={{ fontSize: 16, color: '#6c757d' }}>
          Select a block to view and edit properties
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
        Property Grid
      </Text>

      {/* Label */}
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

      {/* Value */}
      {properties.type !== 'vstack' && properties.type !== 'hstack' && (
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
      )}

      {/* Options for Select */}
      {properties.type === 'select' && (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold' }}>Options:</Text>
          <TextInput
            value={properties.options?.join(', ') || ''}
            onChangeText={(text) =>
              handleUpdate('options', text.split(',').map((opt) => opt.trim()))
            }
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

      {/* Add Children to VStack/HStack */}
      {(properties.type === 'vstack' || properties.type === 'hstack') && (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold' }}>Add Child Block:</Text>
          <Select onValueChange={(value) => value && handleAddChildBlock(value.value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Block Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Field Types</SelectLabel>
                <SelectItem label='Input' value="input">Input</SelectItem>
                <SelectItem label='Select' value="select">Select</SelectItem>
                <SelectItem label='Button' value="button">Button</SelectItem>
                {/* Add more block types as needed */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      )}
    </ScrollView>
  );
};

export default PropertyGrid;