import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../ui/text'; // Adjust to your Text component
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useFormBuilder } from './FormBuilderContext';

const DragDrop = () => {
  const { formState, setBlocks } = useFormBuilder();

  // Render each item in the list
  const renderItem = ({ item, drag, isActive }: any) => (
    <View
      style={[styles.itemContainer, { backgroundColor: isActive ? 'lightgray' : 'white' }]}
      onStartShouldSetResponder={() => true} // Enables dragging
      onResponderGrant={() => drag()} // Starts the drag when touched
    >
      <Text>{item.label}</Text>
    </View>
  );

  // Handle the end of the drag event
  const handleDragEnd = ({ data }: any) => {
    console.log('Drag Ended - New Data: ', data); // Log the new order
    setBlocks(data); // Update state with the new order
  };

  return (
    <DraggableFlatList
      data={formState.fields} // Bind the state fields to the draggable list
      renderItem={renderItem}
      keyExtractor={(item) => item.id} // Make sure each item has a unique id
      onDragEnd={handleDragEnd} // Handle the end of the drag
      scrollEnabled // Enable scrolling
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default DragDrop;
