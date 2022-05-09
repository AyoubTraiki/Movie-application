import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import MovieGenres from "../components/MovieGenres";
import Movie from "../models/Movie";
import { api_key } from "../Utils/constants";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Detail({ navigation, route }) {
  const [filmDetail, setFilmDetail] = useState([]);
  const ItemId = route.params.item.id;

  useEffect(async () => {
    const data = [];
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${ItemId}?api_key=${api_key}`
      );
      const movie = await response.json();
      data.push(
        new Movie({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          popularity: movie.popularity,
          genre_ids: movie.genre_ids,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          backdrop_path: movie.backdrop_path,
          genres: movie.genres,
          budget: movie.budget,
          revenue: movie.revenue,
        })
      );
      setFilmDetail(data);
    } catch (error) {
      return console.error(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filmDetail.map((item) => {
          return (
            <View key={item.id}>
              <View>
                <Image
                  style={styles.poster}
                  resizeMode={"cover"}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`,
                  }}
                />
                <View style={styles.view_title}>
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: "bold",
                      marginLeft: 5,
                      alignSelf: "stretch",
                      color: "#fff",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                  <View style={styles.back}>
                    <Icon name="chevron-left" size={20} color={"white"}/>
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.top}>
                  <View style={styles.shareView}>
                    <Icon name="share" size={20} color={"rgb(10, 132, 255)"} />
                  </View>
                  <View style={styles.vote}>
                    <Icon name="star" size={20} />
                    <Text style={styles.vote_text}>{item.vote_average}</Text>
                  </View>
                </View>
                <View style={styles.favorite}>
                  <Icon name="heart-o" size={26} color={"#a83f39"} />
                </View>
              </View>
              <View style={styles.body}>
                <MovieGenres data={item.genres} />

                <View style={{ marginLeft: 10, marginRight: 5 }}>
                  <Text
                    style={{ marginTop: 15, fontSize: 20, fontWeight: "bold" }}
                  >
                    Overview
                  </Text>
                  <Text>{item.overview}</Text>
                </View>

                <View style={{ marginLeft: 10, marginRight: 5 }}>
                  <Text
                    style={{ marginTop: 15, fontSize: 20, fontWeight: "bold" }}
                  >
                    Informations
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 5,
                    }}
                  >
                    <Text style={styles.info_title}>Release Date</Text>
                    <Text>{item.release_date}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 10,
                    }}
                  >
                    <Text style={styles.info_title}>Vote Count</Text>
                    <Text>{item.vote_count}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 10,
                    }}
                  >
                    <Text style={styles.info_title}>Popularity</Text>
                    <Text>{item.popularity}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 10,
                    }}
                  >
                    <Text style={styles.info_title}>Budget</Text>
                    <Text>
                      {item.budget} {"$"}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 10,
                    }}
                  >
                    <Text style={styles.info_title}>Revenue</Text>
                    <Text>
                      {item.revenue} {"$"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  poster: {
    alignSelf: "stretch",
    height: 280,
  },
  view_title: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.4)",
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    position: "absolute",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    height: 35,
    margin: 7,
    right: 0,
  },
  shareView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "stretch",
    height: "100%",
    marginRight: 10,
  },
  back: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 35, 
    height: 35,
    margin: 7,
    left: 0,
    backgroundColor: "rgba(0,0,0,.6)",
    borderRadius: 5,
  },
  vote: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "yellow",
    flexDirection: "row",
    borderRadius: 5,
    paddingHorizontal: 5,
    alignSelf: "stretch",
    height: "100%",
  },
  vote_text: {
    fontSize: 19,
    fontWeight: "bold",
    marginLeft: 7,
    color: "black",
  },
  favorite: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    width: 50,
    height: 50,
    margin: 5,
    right: 0,
    bottom: -30,
    zIndex: 1,
    elevation: 2,
  },
  body: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  info_title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
