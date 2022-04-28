import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from "../assets/logo/star_wars_logo.png"

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { global_styles } from '../GlobalStyles';
import { RootTabScreenProps } from '../types';

export default function AboutScreen({ navigation }: RootTabScreenProps<'About'>) {
  return (
    <SafeAreaView style={styles.container}>
        <Image source={logo} style={{width: 225, height: 100, marginBottom: 20}} />
        <Paragraph style={{color: "white", textAlign: "center"}} >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Paragraph>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    ...global_styles.flex_col_start,
    padding: 20
  },
  
});
