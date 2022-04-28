import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { global_styles } from '../../../GlobalStyles'
import Text1 from '../../Text/Text1'
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'react-query';
import axios from 'axios';

const AdditionalInfoButton = ({url, nav}:{url: string, nav: any}) => {
    const {data, isError, isLoading} = useQuery(`${url}`, ()=>axios.get(url).then((res)=>res.data))
    if(isLoading) return <Text1 color="#FFE81F" size={18} weight="800" >
                            Loading...
                        </Text1>
    if(isError) return <Text1 color="#FFE81F" size={18} weight="800" >
                            An error ocurred
                        </Text1>
  return (
    <View style={styles.container} >
        <Pressable android_ripple={{
                            color: "green",
                            borderless:false,
                            radius: 400
                        }} onPress={()=>{
                            if(url.indexOf("films") != -1){
                                nav.navigate("films", {
                                    data_url: url
                                })
                            }else if(url.indexOf("starships") != -1){
                                nav.navigate("starships", {
                                    data_url: url
                                })
                            }else{
                                nav.navigate("vehicles", {
                                    data_url: url
                                })
                            }
                        }} style={styles.pressable_container} >
                            <Text1 color="#FFE81F" size={18} weight="800" >
                                {typeof data.name != "undefined" ? data.name : data.title }
                            </Text1>
                            <Ionicons name="chevron-forward-outline" size={24} color="white" />
        </Pressable>
    </View>
  )
}

export default AdditionalInfoButton

const styles = StyleSheet.create({
    container: {
        
        height: 50,
        width: "100%",
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    pressable_container: {
        ...global_styles.flex_row_center_between,
        height: 40,
        width: "100%",
        paddingRight: 20,
        paddingLeft: 20,
    }

})