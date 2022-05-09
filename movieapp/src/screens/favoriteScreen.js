import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function FavoriteScreen({ navigation }) {
    return (
        <View style={styles.view}>
            <Text style={styles.text} onPress={() => alert('this is favorite !!!')}>
                Favorite Screen
            </Text>
        </View>
    );
}

const styles=StyleSheet.create({
    view:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        fontSize: 26,
        fontWeight: 'bold'
    }
})