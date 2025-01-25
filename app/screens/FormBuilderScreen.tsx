import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFormBuilder } from '../components/FormBuilder/FormBuilderContext';
import Form from '../components/FormBuilder/Form';
import PropertyGrid from '../components/FormBuilder/PropertyGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

import * as Icons from 'lucide-react-native';
import Treeview from '../components/FormBuilder/Treeview';

// Define available field types with icons
const fieldTypes: { type: 'accordion' | 'alert' | 'alert-dialog' | 'avatar' | 'badge' | 'button' | 'card' | 'input' | 'select' | 'vstack' | 'hstack'; label: string; icon: keyof typeof Icons }[] = [
  { type: 'accordion', label: 'Accordion', icon: 'Folder' },
  { type: 'alert', label: 'Alert', icon: 'AlertCircle' },
  { type: 'alert-dialog', label: 'Alert Dialog', icon: 'AlertTriangle' },
  { type: 'avatar', label: 'Avatar', icon: 'User' },
  { type: 'badge', label: 'Badge', icon: 'Star' },
  { type: 'button', label: 'Button', icon: 'Touchpad' },
  { type: 'card', label: 'Card', icon: 'CreditCard' },
  { type: 'input', label: 'Input', icon: 'Text' },
  { type: 'select', label: 'Select', icon: 'List' },
  { type: 'vstack', label: 'VStack', icon: 'FlipVertical' },
  { type: 'hstack', label: 'HStack', icon: 'FlipHorizontal' },
];

const FormBuilderScreen: React.FC = () => {
  const { addBlock } = useFormBuilder();
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [tab, setTab] = React.useState('account');

  const handleAddBlock = (type: 'accordion' | 'alert' | 'alert-dialog' | 'avatar' | 'badge' | 'button' | 'card' | 'input' | 'select' | 'vstack' | 'hstack') => {
    const newBlock = {
      id: `${type}-${Date.now()}`, // Unique ID
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      value: '',
      ...(type === 'select' && { options: ['Option 1', 'Option 2', 'Option 3'] }),
    };
    addBlock(newBlock);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {/* Side Navigation */}
      <Tabs
        value={tab}
        onValueChange={setTab}
        className='w-full max-w-[20%] mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full'>
          <TabsTrigger value='components' className='flex-1'>
            <Text>Components</Text>
          </TabsTrigger>
          <TabsTrigger value='outline' className='flex-1'>
            <Text>Outline</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='components'>
          <View
            style={{
              backgroundColor: '#f8f9fa',
              borderRightWidth: 1,
              borderRightColor: '#dee2e6',
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Add Fields</Text>
            <ScrollView>
              {fieldTypes.map(({ type, label, icon }) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => handleAddBlock(type)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 8,
                    marginBottom: 8,
                    borderRadius: 4,
                    backgroundColor: '#e9ecef',
                  }}
                >
                  {React.createElement(Icons[icon], { size: 20, color: "#495057", style: { marginRight: 8 } })}
                  <Text style={{ fontSize: 16, color: '#495057' }}>{label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TabsContent>
        <TabsContent value='outline'>
          <Treeview />
        </TabsContent>
      </Tabs>

      {/* Main Content */}
      <View style={{ flex: 1, flexDirection: 'row', padding: 16 }}>
        {/* Form Preview */}
        <ScrollView>
          <View style={{ flex: 1, marginRight: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Form Preview</Text>
            <Form setSelectedBlockId={setSelectedBlockId} />
          </View>
        </ScrollView>
        {/* Property Grid */}
        <View style={{ width: '20%', padding: 16, backgroundColor: '#f1f3f5', borderRadius: 8 }}>
          <PropertyGrid selectedBlockId={selectedBlockId} />
        </View>
      </View>
    </View>
  );
};

export default FormBuilderScreen;
