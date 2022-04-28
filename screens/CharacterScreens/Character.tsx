import { Feather, Fontisto } from '@expo/vector-icons';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, List } from 'react-native-paper';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import AdditionalInfoButton from '../../components/Buttons/AdditionalInfo';

import EditScreenInfo from '../../components/EditScreenInfo';
import Pagination from '../../components/Pagination';
import Text1 from '../../components/Text/Text1';
import { Text, View } from '../../components/Themed';
import { global_styles } from '../../GlobalStyles';
import { RootTabScreenProps } from '../../types';

export default function CharacterScreen({ route, navigation }: {navigation: any, route: any}) {
    const [gender, set_gender] = useState<string>("")
    const [_name, set_name] = useState<string>("")
    const {data_url} = route.params
    const {isLoading, isError, data} = useQuery(`${data_url}`, ()=>axios.get(data_url).then((res)=>res.data))
    var hw = data?.homeworld
    var sp = data?.species
    const home_world  = useQuery(`home/${data?.name}`, ()=>axios.get(data.homeworld).then((res)=>res.data), {enabled: !!hw})
    const species = useQuery(`species/${data?.name}`, ()=>{
        if(sp.length > 0) return axios.get(sp[0]).then(res=>res.data)
        return axios.get("https://swapi.dev/api/species/1/").then(res=>res.data)
    }, {
        enabled: !!sp
    })
    //new client
    const button_client = new QueryClient()

    

    useEffect(()=>{
        set_gender(data?.gender)
        set_name(data?.name)
         return () =>{
         }

    }, [,isLoading, home_world.isLoading, species.isLoading])
   
    const attributes: any = 
        {
            Name: "Luke Sky Walker",
            birth_year: "19 BBY",
            eye_color: "blue",
            gender: "male",
            hair_color: "gray",
            height: "1.6",
            mass: "80",
            skin_color: "black",
            home_world: "earth",
            films: [
                "1", "2"
            ],
            species: "Human",
            starships: [
                "1","2"
            ],
            vehicles: [
                "1","2"
            ]
        }

        if (isLoading) return (<View style={{...styles.container, width: "100%", height: "100%"}} >
            <ActivityIndicator style={{marginBottom: 20}} size="large" color="#FFE81F" />
            <Text1 color="#FFE81F" size={16} weight="300" >
                Loading Character Information
            </Text1>
        </View>)
        if (isError) return <View style={{...styles.container, width: "100%", height: "100%"}} >
            <Feather name="x-circle" size={30} color="#FFE81F" />
            <Text1 color="#FFE81F" size={16} weight="300" >
                Oops! something went wrong
            </Text1>
        </View> 

  return (
    <View style={styles.container}>
        <View style={{...global_styles.flex_col_start, width: "100%"}} >
            <View style={{...global_styles.flex_row_center, width: "100%", height: 100}} >
                <View style={styles.GenderIcon} >
                {(gender == "male"  )  && <Fontisto name="male" size={40} color="#FFE81F" />}
                    {gender == "female" && <Fontisto name="female" size={40} color="#FFE81F" />}
                    {(typeof gender == "undefined" || (gender != "male" && gender != "female")) && <Fontisto name="genderless" size={40} color="#FFE81F" />}
                </View>
            </View>
            <Text1 color="#FFE81F" size={20} weight="bold" >
                {_name}
            </Text1>
        </View>
        <ScrollView  style={{width: "100%", marginTop: 0, marginBottom: 30}} >
            {Object.keys(data).map((key)=>{
                if(["starships", "vehicles", "films", "homeworld", "species"].indexOf(key) == -1){
                    return(
                        <List.Item style={{marginBottom: 10}} key={key} title={<Text1 size={16} color="white" weight='600'  >
                            {key.toLocaleUpperCase()}
                        </Text1>}
                        description={
                            <Text1 color="#FFE81F" size={18} weight="bold" >
                                {data[key]}
                            </Text1>
                        }
                        />
                    )
                }else if(key == "homeworld"){
                    return(
                        <View style={{width: "100%", paddingLeft: 20, ...global_styles.flex_col_start_start, paddingBottom: 10}} >
                            <Text1 size={16} color="white" weight='600'  >
                                {key.toLocaleUpperCase()}
                            </Text1>
                            <Text1 color="#FFE81F" size={18} weight="bold" >
                                {home_world.data?.name}
                            </Text1>
                        </View>
                    )
                    
                }else if(key == "species"){
                    return(
                        <View style={{width: "100%", paddingLeft: 20, ...global_styles.flex_col_start_start, paddingBottom: 10}} >
                            <Text1 size={16} color="white" weight='600'  >
                                {key.toLocaleUpperCase()}
                            </Text1>
                            <Text1 color="#FFE81F" size={18} weight="bold" >
                                {species.data?.name}
                            </Text1>
                        </View>
                    )
                    
                }else{
                    if(data[key].length > 0){
                        return (
                            <View style={{width: "100%", paddingLeft: 20, ...global_styles.flex_col_start_start}} >
                                <Text1 size={16} color="white" weight='600'  >
                                    {key.toLocaleUpperCase()}
                                </Text1>
                                {data[key].map((item: string)=>
                                            <QueryClientProvider client={button_client} >
                                                <AdditionalInfoButton nav={navigation} key={data[key].indexOf(item)} url={item}   />
                                            </QueryClientProvider>
                                                
                                )}
                            </View>
                        )
                    }
                    
                }
            })}
            
        </ScrollView>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...global_styles.flex_col_start
  },
  GenderIcon: {
      ...global_styles.flex_row_center,
      width: 100,
      height: 100
  }
});
