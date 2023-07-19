import React, { useState } from "react";
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
} from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false); // State for the loading indicator
  const [modalVisible, setModalVisible] = useState(false); // State for the modal

  const usernameHandler = (value) => {
    setUsername(value);
  };

  const passwordHandler = (value) => {
    setPassword(value);
  };

  const userData = {
    typReport: "Catalogs",
    Usr: { Name: "Admin" },
  };

  const signIn = () => {
    setLoading(true); // Show the loading indicator
    setModalVisible(true); // Show the modal

    fetch("http://46.32.169.71/DEMO/hs/MobileApi/Connect/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("sa:abc"),
      },
      body: JSON.stringify(userData),
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setLoading(false); // Hide the loading indicator
        setModalVisible(false); // Hide the modal
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false); // Hide the loading indicator
        setModalVisible(false); // Hide the modal
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    Animated.timing(animation, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Rest of the code...

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        {/* Rest of the code... */}
        <Button title="Submit" onPress={signIn} />

        {/* Modal for getting data process information */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.modalText}>Getting data...</Text>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles...

