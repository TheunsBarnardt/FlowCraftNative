import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useFormBuilder } from "./FormBuilderContext";
import FieldRenderer from "./FieldRenderer";
import { Text } from "../ui/text";
import { Ionicons } from "@expo/vector-icons";

interface FormProps {
  setSelectedBlockId: (id: string | null) => void;
}

const Form: React.FC<FormProps> = ({ setSelectedBlockId }) => {
  const { formState, removeBlock, setBlocks } = useFormBuilder();
  const [pressing, setPressing] = useState(false);

  const handleDragEnd = ({ data }: { data: any[] }) => {
    setBlocks(data);
  };

  const handleSelectBlock = (id: string) => {
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
  }) => (
    <View style={[styles.gridItem, isActive ? styles.activeDragItem : {}]}>
      <TouchableOpacity
        style={styles.gridItemContent}
        onPress={() => !pressing && handleSelectBlock(item.id)}
        onPressIn={() => setPressing(true)}
        onPressOut={() => setPressing(false)}
      >
        <TouchableOpacity style={styles.removeButton} onPress={() => removeBlock(item.id)}>
          <Ionicons name="close-circle" size={16} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.propertyGridButton} onPress={() => handleSelectBlock(item.id)}>
          <Ionicons name="settings" size={16} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
      <FieldRenderer field={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      {formState.fields.length === 0 ? (
        <Text style={styles.emptyText}>No fields added yet. Add a field to get started!</Text>
      ) : (
        <DraggableFlatList
          data={formState.fields}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onDragEnd={handleDragEnd}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginVertical: 20,
  },
  list: {
    paddingVertical: 8,
  },
  gridItem: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 8,
    padding: 8,
    paddingTop: 40,
    backgroundColor: "#f8f9fa",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 10,
  },
  activeDragItem: {
    opacity: 0.7,
    backgroundColor: "#d1e7fd",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#0d6efd",
  },
  removeButton: {
    position: "absolute",
    top: -32,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
    padding: 4,
  },
  propertyGridButton: {
    position: "absolute",
    top: -32,
    right: 36,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
    padding: 4,
  },
  gridItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Form;
