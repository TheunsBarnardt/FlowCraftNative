import React, { useState } from "react";
import { View, StyleSheet, Dimensions, PanResponder, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useFormBuilder } from "./FormBuilderContext";
import FieldRenderer from "./FieldRenderer";
import { Text } from "../ui/text";
import { Ionicons } from "@expo/vector-icons";

const GRID_COLUMNS = 6;
const GRID_MARGIN = 8;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CELL_WIDTH = (SCREEN_WIDTH - (GRID_COLUMNS + 1) * GRID_MARGIN) / GRID_COLUMNS;

interface FormProps {
  setSelectedBlockId: (id: string | null) => void;
}

const Form: React.FC<FormProps> = ({ setSelectedBlockId }) => {
  const { formState, removeBlock, setBlocks } = useFormBuilder();
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pressing, setPressing] = useState(false);

  const handleDragEnd = ({ data }: { data: any[] }) => {
    setBlocks(data);
  };

  const handleSelectBlock = (id: string) => {
    console.log(`Selected block ID: ${id}`); // Debugging log
    setSelectedBlockId(id); // Update selected block ID
  };

  const renderItem = ({
    item,
    drag,
    isActive,
  }: {
    item: any;
    drag: () => void;
    isActive: boolean;
  }) => {
    // PanResponder to handle dragging logic
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (draggedItemId === item.id && isActive) {
          setIsDragging(true);
        }
      },
      onPanResponderRelease: () => {
        setDraggedItemId(null); // Stop dragging
        setIsDragging(false); // End dragging state
      },
    });

    return (
      <View
        style={[styles.gridItem, isActive ? styles.activeDragItem : {}, { width: CELL_WIDTH, height: CELL_WIDTH }]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.gridItemContent}
          onPress={() => {
            // Only trigger selection if it's not a drag and press is finalized
            if (!isDragging && !pressing) {
              console.log(`Block ${item.id} tapped, updating PropertyGrid.`); // Debugging log
              handleSelectBlock(item.id); // Set selected block
            }
          }}
          onPressIn={() => {
            setPressing(true); // Mark pressing started
          }}
          onPressOut={() => {
            setPressing(false); // Mark pressing finished
          }}
        >
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeBlock(item.id)}
          >
            <Ionicons name="close-circle" size={24} color="black" />
          </TouchableOpacity>

          {/* Add Property Grid Update Icon */}
          <TouchableOpacity
            style={styles.propertyGridButton}
            onPress={() => {
              console.log(`Block ${item.id} clicked, Property Grid updated.`);
              handleSelectBlock(item.id); // Trigger property grid update by selecting the block
            }}
          >
            <Ionicons name="settings" size={24} color="black" />
          </TouchableOpacity>

          {/* Drag Button */}
          <TouchableOpacity
            style={styles.dragButton}
            onPressIn={() => {
              drag(); // Start dragging
              setDraggedItemId(item.id); // Set dragged item ID
              setIsDragging(false); // Make sure dragging flag is reset
            }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>

        <FieldRenderer field={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {formState.fields.length === 0 ? (
        <Text style={styles.emptyText}>
          No fields added yet. Add a field to get started!
        </Text>
      ) : (
        <DraggableFlatList
          data={formState.fields}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onDragEnd={handleDragEnd}
          contentContainerStyle={styles.grid}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: GRID_MARGIN,
  },
  emptyText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginVertical: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    margin: GRID_MARGIN,
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#f8f9fa",
    justifyContent: "space-between",
    position: "relative", // Allow positioning of remove button, drag, and settings icon
  },
  activeDragItem: {
    opacity: 0.7,
    backgroundColor: "#d1e7fd",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#0d6efd",
  },
  fieldLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#495057",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
    borderRadius: 50, // Circular button
    padding: 4,
  },
  dragButton: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
    borderRadius: 50, // Circular button
    padding: 4,
  },
  propertyGridButton: {
    position: "absolute",
    top: 8,
    right: 40, // Slightly to the left of the remove button
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
    borderRadius: 50, // Circular button
    padding: 4,
  },
  gridItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Form;
