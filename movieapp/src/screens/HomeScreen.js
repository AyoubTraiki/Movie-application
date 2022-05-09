import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { api_key } from "../Utils/constants";
import Movie from "../models/Movie";
import Film from "../components/Film";
import LatestFilm from "../components/LatestFilm";

export default class HomeScreen extends React.Component {
  mounted = false;
  constructor(props) {
    super(props);
  }

  state = {
    isLoading: false,
    popularMovies: [],
    recentMovies: [],
  };

  componentDidMount() {
    this.mounted = true;
    //fetching popular movie
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const data = [];
        responseJson.results.forEach((movie) => {
          movie.genres = [];
          movie.genre_ids.forEach((element) => {
            var genree = this.props.genres.filter((x) => x.id == element);
            if (genree.length != 0) {
              movie.genres.push(genree[0].name);
            }
          });

          data.push(
            new Movie({
              id: movie.id,
              title: movie.title,
              overview: movie.overview,
              popularity: movie.popularity,
              genre_ids: movie.genre_ids,
              genres: movie.genres,
              poster_path: movie.poster_path == null ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg" : "http://image.tmdb.org/t/p/w342/" + movie.poster_path,
                  release_date: movie.release_date,
                  vote_average: movie.vote_average,
                  vote_count: movie.vote_count,
                  backdrop_path: movie.backdrop_path == null ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg" : movie.backdrop_path,
            })
          );
        });
        if (this.mounted) {
          this.setState({
            popularMovies: data,
          });
        }

        //fetching recent movie
        fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`
        )
          .then((response) => response.json())
          .then((responseJson) => {
            const data = [];
            responseJson.results.forEach((movie) => {
              movie.genres = [];
              movie.genre_ids.forEach((element) => {
                var genree = this.props.genres.filter((x) => x.id == element);
                if (genree.length != 0) {
                  movie.genres.push(genree[0].name);
                }
              });

              data.push(
                new Movie({
                  id: movie.id,
                  title: movie.title,
                  overview: movie.overview,
                  popularity: movie.popularity,
                  genre_ids: movie.genre_ids,
                  genres: movie.genres,
                  poster_path: movie.poster_path == null ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg" : "http://image.tmdb.org/t/p/w342/" + movie.poster_path,
                  release_date: movie.release_date,
                  vote_average: movie.vote_average,
                  vote_count: movie.vote_count,
                  backdrop_path: movie.backdrop_path == null ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg" : movie.backdrop_path,
                })
              );
            });

            if (this.mounted) {
              this.setState({
                recentMovies: data,
              });
            }
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <SafeAreaView style={styles.view}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Popular Movies</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              {this.state.popularMovies.map((item, index) => {
                return index < 5 ? (
                  <Film item={item} key={item.id} />
                ) : (
                  <View key={item.id} />
                );
              })}
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "column",
              marginTop: 5,
              paddingHorizontal: 5,
            }}
          >
            <Text style={styles.header2}>Movies</Text>
            {this.state.recentMovies.map((item) => {
                return <LatestFilm item={item} key={item.id} />
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: StatusBar.currentHeight,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 5,
  },
  header2: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
});
