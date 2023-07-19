import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const BurgerMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuAnimation = new Animated.Value(0);

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setMenuOpen(!isMenuOpen);
  };

  const translateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.burgerIcon}>
        <Text style={styles.burgerText}>☰</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
          <Text style={styles.menuText}>Contact</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  burgerIcon: {
    padding: 10,
    marginRight: 10,
  },
  burgerText: {
    fontSize: 24,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#FFF',
    elevation: 2,
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    fontSize: 16,
  },
});

export default BurgerMenu;
