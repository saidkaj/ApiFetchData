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
  Platform,
  Linking,
} from "react-native";
import { decode as atob, encode as btoa } from 'base-64';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from "@react-navigation/native";
import * as Sharing from 'expo-sharing';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const usernameHandler = (value) => {
    setUsername(value);
  };

  const passwordHandler = (value) => {
    setPassword(value);
  };

  const userData = {
    typReport: "Catalogs",
    Usr: { Name: "Admin"},
  };

  const signIn = () => {
    axios.post("http://46.32.169.71/DEMO/hs/MobileApi/Connect/", userData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: 'Basic '+btoa('sa:abc')
      }
    }).then((resp) => {
      console.log(resp.data);
      setData(resp.data);
    }).catch((error) => {
      console.log(error);
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

  const menuTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  const closeMenu = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuOpen(false);
    });
  };

  const handleOutsidePress = () => {
    if (menuOpen) {
      closeMenu();
    }
  };

  const saveToFile = async () => {
    try {
      const jsonData = JSON.stringify(data);
      const fileUri = FileSystem.documentDirectory + 'jsonData.json';
      await FileSystem.writeAsStringAsync(fileUri, jsonData);
      console.log('Data saved successfully!');
      
      // Read the data from the saved file
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const savedData = JSON.parse(fileContent);
      console.log('Data read from file:', savedData);
      
      // You can now use the savedData as needed
    } catch (error) {
      console.log('Error saving or reading data:', error);
    }
  };

  
  

  const downloadFile = async () => {
    try {
      const jsonData = JSON.stringify(data);
      const fileName = 'jsonData.json';
      const fileUri = FileSystem.documentDirectory + fileName;
  
      await FileSystem.writeAsStringAsync(fileUri, jsonData, {
        encoding: FileSystem.EncodingType.UTF8,
      });
  
      await Sharing.shareAsync(fileUri);
  
      console.log('File shared successfully.');
  
    } catch (error) {
      console.log('Error sharing file:', error);
    }
  };
  
  

  const navigation = useNavigation();

  const handleNavigateBarcode = () => {
    navigation.navigate("Barcode", { savedData: data?.Item });
  };
  
  

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.burgerIcon} onPress={toggleMenu}>
          <Text style={styles.burgerIconText}>=</Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.menu,
            {
              transform: [{ translateX: menuTranslateX }],
              opacity: menuOpen ? 1 : 0,
            },
          ]}
        >
          <TouchableOpacity style={styles.menuItem}>
            <Text>Cars</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Clothing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Animals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Drinks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Services</Text>
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.title}>Get data from JSON</Text>
        <StatusBar style="auto" />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={usernameHandler}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={passwordHandler}
          secureTextEntry={true}
        />
        <Button style={styles.homeButton} title="Submit" onPress={signIn}/>
        <Button style={styles.homeButton} title="Save to File" onPress={saveToFile} />
        <Button style={styles.homeButton} title="Download File" onPress={downloadFile} />
        <View style={styles.jsonContainer}>
          <Text style={styles.jsonText}>{JSON.stringify(data)}</Text>
        </View>
        <View style={styles.container}>
          <Button title="Go to Barcode Screen" onPress={handleNavigateBarcode} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    marginTop: 34
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  burgerIcon: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
  },
  burgerIconText: {
    fontSize: 50,
    paddingTop: 0,
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: "100%",
    backgroundColor: "#f1f1f1",
    padding: 16,
    paddingTop: 50,
    zIndex: 2,
  },
  menuItem: {
    marginBottom: 16,
  },
  jsonContainer: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 20,
    padding: 8,
    justifyContent: "center",
  },
  jsonText: {
    fontSize: 16,
  },
  homeButton: {
    marginBottom: 8,
  }
});
