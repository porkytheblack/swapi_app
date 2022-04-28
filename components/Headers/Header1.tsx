import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { global_styles } from '../../GlobalStyles'

const Header1 = ({children}:{children: any}) => {
  return (
    <View style={styles.container} >
      <Text style={styles.text} >{children}</Text>
    </View>
  )
}

export default Header1

const styles = StyleSheet.create({
    container: {
        width: "100%",
        ...global_styles.flex_row_center,
        marginTop: 10,
        marginBottom: 20
    },
    text: {
        color: "#FFE81F",
        fontSize: 18,
        fontWeight: "bold"
    }
})