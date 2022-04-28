import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';

const TopSearchBar = ({search_term, _submit}:{search_term: (search: string)=>void, _submit: ()=>void}) => {
    const [query, set_query] = useState<string>("")
  return (
    <View style={styles.container} >
        <Searchbar keyboardAppearance='dark'  onIconPress={_submit}  onSubmitEditing={_submit} placeholderTextColor={"white"} iconColor='#FFE81F' inputStyle={{
            color: "#FFE81F"
        }} style={{
            backgroundColor: "transparent",
            color: "white",
            borderColor: "#FFE81F",
            borderWidth: 1,
            borderRadius: 8
        }} value={query}  placeholder="Search Star Wars" onChangeText={(text)=>{
            set_query(text)
            search_term(text)
        }} />
    </View>
  )
}

export default TopSearchBar

const styles = StyleSheet.create({
    container: {
        height: 40,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 20,
        width: "90%",
    }

})