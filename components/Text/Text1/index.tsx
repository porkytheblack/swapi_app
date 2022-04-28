import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Text1 = ({children, color, size, weight}:{children?: string,color: string, size:  number, weight: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined }) => {
  return (
    <Text style={{
        color,
        fontSize: size,
        fontWeight: weight
    }} >
        {children}
    </Text>
  )
}

export default Text1

const styles = StyleSheet.create({
    
})