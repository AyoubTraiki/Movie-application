import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { api_key } from "../Utils/constants";
import LatestFilm from "../components/LatestFilm";
import Movie from "../models/Movie";
import Toast from "react-native-simple-toast";

export default function SearchScreen({ navigation }) {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [noData, setNoData] = useState(false);
  const textInput = useRef();

  const fetchSearchMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const data = [];
        responseJson.results.forEach((movie) => {
          data.push(
            new Movie({
              id: movie.id,
              title: movie.title,
              overview: movie.overview,
              popularity: movie.popularity,
              genre_ids: movie.genre_ids,
              genres: movie.genres,
              poster_path:
                movie.poster_path == null
                  ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg"
                  : "http://image.tmdb.org/t/p/w342/" + movie.poster_path,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
              vote_count: movie.vote_count,
              backdrop_path:
                movie.backdrop_path == null
                  ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg"
                  : movie.backdrop_path,
            })
          );
        });
        setFilteredData(data);
      })
      .catch((error) => console.error(error));
  };

  const searchFilter = () => {
    if (search.length) {
      fetchSearchMovie();
      //textInput.current.clear();
    } else {
      Toast.show("Field is required !!");
    }
  };

  const ItemView = ({ item }) => <LatestFilm item={item} key={item.id} />;
  return (
    <View style={styles.view}>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
        <View style={styles.inputView}>
          <TextInput
           ref={textInput}
            style={styles.input}
            placeholder="Entrer titre du film"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>

        <TouchableOpacity
          style={{
            padding: 10,
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch",
            backgroundColor: "blue",
            marginLeft: 5,
            borderRadius: 16,
          }}
          onPress={searchFilter}
        >
          <View
            style={{
              paddingHorizontal: 12,
            }}
          >
            <Icon name="search" size={20} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
      {noData ? (
        <Text style={{ textAlign: "center" }}>No data found.</Text>
      ) : (
        <View />
      )}
      { filteredData.length > 0
        ? 
        (
            <ScrollView showsVerticalScrollIndicator={false}>
            {filteredData.map((item) => {
                return <LatestFilm item={item} key={item.id} />
            })}
        </ScrollView>
        ) : <View />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
  },
  inputView: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgba(0,0,0,.5)",
    height: 55,
    alignItems: "center",
    paddingLeft: 12,
  },
  input: {
    alignSelf: "stretch",
    width: "80%",
    height: "100%",
    fontSize: 18,
    borderWidth: 0,
  },
  flatList: {},
});

