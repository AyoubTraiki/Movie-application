import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function MovieGenres(props) {
    return (
        <View style={styles.listItem}>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {props.data.map((element, index) => {
                    return (
                        <View style={styles.item} key={index}>
                            <Text>{element.name}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        marginTop: 25,
        flexDirection: "row",
    },
    item: {
        backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 15,
        paddingVertical: 5,
        marginLeft: 10,
    }
})