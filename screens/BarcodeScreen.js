import React, { useState, useMemo, useEffect, useCallback, memo, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const BarcodeScreen = memo(({ route }) => {
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [showFields, setShowFields] = useState(false);
  const barcodeInputRef = useRef(null);

  const savedData = route.params?.savedData || [];

  const matchedItem = useMemo(() => {
    return savedData.find((item) => item.Barcode === barcode) || {};
  }, [barcode, savedData]);

  const handleBarcodeChange = useCallback((value) => {
    setBarcode(value);
  }, []);

  const setNameAndID = useCallback(
    (values) => {
      const { Name, ID } = values;
      setName(Name || "Not Found");
      setID(ID || "Not Found");
    },
    [setName, setID]
  );
  
  useEffect(() => {
    if (!matchedItem.Name && !matchedItem.ID) {
      setName("Not Found");
      setID("Not Found");
    } else {
      setNameAndID(matchedItem);
    }
  }, [matchedItem, setNameAndID]);

  const handleSubmit = useCallback(() => {
    setShowFields(true);
  }, []);

  const handleNameDelete = useCallback(() => {
    setName("");
  }, []);

  const handleIDDelete = useCallback(() => {
    setID("");
  }, []);

  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.field}
        placeholder="Enter barcode"
        onChangeText={handleBarcodeChange}
        value={barcode}
        ref={barcodeInputRef}
      />

      <Text style={styles.label}>Name:</Text>
      <View style={styles.fieldContainer}>
        <TextInput style={styles.fieldValue} value={name} editable={false} />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleNameDelete}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>ID:</Text>
      <View style={styles.fieldContainer}>
        <TextInput style={styles.fieldValue} value={id} editable={false} />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleIDDelete}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 100,
    marginBottom: 100,
    marginRight: 30,
    marginLeft: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  field: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "transparent"
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldValue: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default BarcodeScreen;
