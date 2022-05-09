import React from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native"

export default function Film(props) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('DetailsScreen', {item: props.item})}>
      <View style={styles.item}>
        <Image
          style={styles.poster}
          source={{
            uri: props.item.poster_path,
          }}
        />
        <View style={styles.vote}>
          <Text style={styles.vote_text}>{props.item.vote_average}</Text>
        </View>
        <View style={styles.titleView}>
          <Text style={{ alignSelf: "stretch", color: "white", fontSize: 15 }}>{props.item.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginBottom: 10,
    marginRight: 10,
  },
  poster: {
    width: 171,
    height: 200,
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
  titleView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    width: 171,
    height: 50,
    bottom: 0,
  },
});
