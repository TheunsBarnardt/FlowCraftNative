import React, { useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useFormBuilder } from "./FormBuilderContext";
import FieldRenderer from "./FieldRenderer";
import { Text } from "../ui/text";
import { Ionicons } from "@expo/vector-icons";

// Define the grid layout constants
const GRID_COLUMNS = 6; // Number of columns for the grid
const GRID_MARGIN = 8; // Margin between grid items
const SCREEN_WIDTH = Dimensions.get("window").width;
const CELL_WIDTH = (SCREEN_WIDTH - (GRID_COLUMNS + 1) * GRID_MARGIN) / GRID_COLUMNS; // Calculate cell width based on screen size

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
    console.log(`Selected block ID: ${id}`);
    setSelectedBlockId(id); // Update the selected block for property grid
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
    // Calculate grid position based on index
    const gridPosition = Math.floor(item.index % GRID_COLUMNS); // Ensure it stays within the grid width
    const gridWidth = (SCREEN_WIDTH - (GRID_COLUMNS + 1) * GRID_MARGIN) / GRID_COLUMNS;

    return (
      <View
        style={[
          styles.gridItem,
          isActive ? styles.activeDragItem : {},
          { width: gridWidth, marginLeft: gridPosition * (GRID_MARGIN + gridWidth) }, // Align to grid
        ]}
      >
        <TouchableOpacity
          style={styles.gridItemContent}
          onPress={() => {
            if (!isDragging && !pressing) {
              console.log(`Block ${item.id} tapped, updating PropertyGrid.`);
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
            <Ionicons name="close-circle" size={16} color="black" />
          </TouchableOpacity>

          {/* Drag icon */}
          <TouchableOpacity
            style={styles.dragButton}
            onPressIn={() => {
              drag(); // Start dragging
              setDraggedItemId(item.id); // Set dragged item ID
              setIsDragging(false); // Reset dragging flag
            }}
          >
            <Ionicons name="menu" size={16} color="black" />
          </TouchableOpacity>

          {/* Property Grid update icon */}
          <TouchableOpacity
            style={styles.propertyGridButton}
            onPress={() => handleSelectBlock(item.id)} // Select block to update property grid
          >
            <Ionicons name="settings" size={16} color="black" />
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
    paddingTop: 40,
    backgroundColor: "#f8f9fa",
    justifyContent: "space-between",
    position: "relative", // Allow positioning of remove button, drag icon, and property grid icon
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
    top: -32,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
    borderRadius: 50, // Circular button
    padding: 4,
  },
  dragButton: {
    position: "absolute",
    top: -32,
    right: 35,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
    borderRadius: 50, // Circular button
    padding: 4,
  },
  propertyGridButton: {
    position: "absolute",
    top: -32,
    right: 62,
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
