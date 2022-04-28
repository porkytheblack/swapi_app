import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { global_styles } from '../../GlobalStyles'
import Text1 from '../Text/Text1'
import { Ionicons } from '@expo/vector-icons';

const Pagination = ({current, max, min, next, prev}:{current: number, max: number, min: number, next: ()=>void, prev: ()=>void}) => {
  return (
    <View style={styles.container} >
        <Pressable android_ripple={{
            borderless: true,
            radius: 30,
            color: "green",

        }} onPress={()=>{
            if(current+1 > min ){
                prev()
            }
        }} >
            <Ionicons name="chevron-back" size={24} color="#FFE81F" />
        </Pressable>
      <View style={styles.display_area} >
          <Text1 color="green" size={16} weight="500" >
              {(current*10).toString()}
          </Text1>
          <Text1 color="green" size={16} weight="500" >
              to
          </Text1>
          <Text1 color="green" size={16} weight="500" >
          {(current*10+10).toString()}
          </Text1>
      </View>
        <Pressable android_ripple={{
            borderless: true,
            radius: 30,
            color: "green",
            
        }} onPress={()=>{
            if(current < max){
                next()
            }
        }} >
            <Ionicons name="chevron-forward-outline" size={24} color="#FFE81F" />
        </Pressable>
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    container: {
        width: 200,
        ...global_styles.flex_row_center_between,
    },
    display_area: {
        width: 100,
        borderRadius: 10,
        borderColor: "#FFE81F",
        borderWidth: 1,
        borderStyle: "solid",
        padding: 10,
        ...global_styles.flex_row_center_between,
        marginRight: 10,
        marginLeft: 10
    }
})