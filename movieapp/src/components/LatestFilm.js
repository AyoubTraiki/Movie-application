import React from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native"

export default function LatestFilm(props) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('DetailsScreen', {item: props.item})}>
      <View style={styles.item}>
        <View>
            <Image
                style={styles.poster}
                source={{
                    uri: props.item.poster_path,
                }}
            />
            <View style={styles.vote}>
                <Text style={styles.vote_text}>{props.item.vote_average}</Text>
            </View>
        </View>
        
       <View style={styles.content}>
            <Text style={{ width: 171,fontSize: 17, fontWeight: "bold", paddingRight: 10 }}>{props.item.title}</Text>
            <Text style={{ width: 171,fontSize: 15, textAlign: "right", paddingRight: 10 }}>{props.item.release_date}</Text>
            <Text numberOfLines={6} style={{  marginTop: 10, width: 171, fontSize: 15, paddingRight: 10}}>{props.item.overview}</Text>
       </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 5,
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row", 
    borderRadius: 8,
  },
  poster: {
    width: 171,
    height: 220,
    borderRadius: 8,
  },
  vote: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    borderRadius: 5,
    width: 35,
    height: 35,
    margin: 5,
    right: 0,
  },
  vote_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  content: {
    marginLeft: 10,
  },
});
