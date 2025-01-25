import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Ionicons } from '@expo/vector-icons';
import { useFormBuilder } from './FormBuilderContext';

const Treeview: React.FC = () => {
  const { formState, setBlocks, removeBlock } = useFormBuilder();

  const handleDragEnd = ({ data }: { data: any[] }) => {
    // Update the blocks after drag ends
    setBlocks(data);
  };

  const renderItem = ({ item, drag, isActive }: { item: any; drag: () => void; isActive: boolean }) => (
    <View style={[styles.item, isActive ? styles.activeItem : {}]}>
      <TouchableOpacity onPress={drag} style={styles.dragButton}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text>{item.label}</Text>
      <TouchableOpacity onPress={() => removeBlock(item.id)} style={styles.removeButton}>
        <Ionicons name="close" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <DraggableFlatList
      data={formState.fields} // Make sure the correct data is passed here
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onDragEnd={handleDragEnd} // Ensure that the drag end updates the state correctly
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeItem: {
    backgroundColor: '#cce4ff',
  },
  dragButton: {
    marginRight: 8,
  },
  removeButton: {
    paddingLeft: 8,
  },
});

export default Treeview;
