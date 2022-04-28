import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { global_styles } from '../../../GlobalStyles'
import { Fontisto } from '@expo/vector-icons';
import Text1 from '../../Text/Text1';
import { useQuery } from 'react-query';
import axios from 'axios';

const ListElement = ({name, _url, gender, species, nav}:{name?: string, gender?: string, species?: string[] , nav: any, _url?: string}) => {
    const url = species instanceof Array && species.length > 0 ? species[0] : "https://swapi.dev/api/species/1/"
    console.log(_url, "14")
    
    const {isLoading, isError, data} = useQuery(`specie_query_type_${typeof species != "undefined" ? species[0] : ""}`, ()=> axios.get(url).then((res)=>res.data))
    if(isLoading) console.log("Loading done") 
    if(isError) console.log("Error occured")

    gender = typeof gender != "undefined" ? gender.toLocaleLowerCase() : undefined;
  return (
    <View style={styles.container} >
        <Pressable onPress={()=>{
            nav.navigate("Character", {
                data_url: _url
            } )
        }} android_ripple={{
                            color: "green",
                            borderless:false,
                            radius: 400
                        }}  style={styles.pressable_container} >
            <View style={{...global_styles.flex_row_center, width: 50, height: 50}} >
                {(gender == "male"  )  && <Fontisto name="male" size={24} color="#FFE81F" />}
                {gender == "female" && <Fontisto name="female" size={24} color="#FFE81F" />}
                {(typeof gender == "undefined" || (gender != "male" && gender != "female")) && <Fontisto name="genderless" size={24} color="#FFE81F" />}
            </View>
            <View style={{
                ...global_styles.flex_col_start_start,
                width: "80%"
            }} >
                <Text1 color="#FFE81F" size={20} weight="bold" >
                    {name}
                </Text1>
                <Text1 color="green" size={16} weight="bold" >
                    {typeof data?.name == "string" ? data?.name : "Unknown"}
                </Text1>
            </View>
        </Pressable>
    </View>
  )
}

export default ListElement

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 80,
        ...global_styles.flex_row_center_start,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        overflow: "hidden"
    },
    pressable_container: {
        width: "100%",
        height: 80,
        ...global_styles.flex_row_center_start,
    }
})