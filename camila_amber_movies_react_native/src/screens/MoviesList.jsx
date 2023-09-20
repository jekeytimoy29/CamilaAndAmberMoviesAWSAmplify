import React, {useEffect, useState} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {listMovies} from '../graphql/queries';
import SignOutButton from '../components/SignOutButton';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      const movieData = await API.graphql(graphqlOperation(listMovies));
      const moviesList = movieData.data.listMovies.items;
      setMovies(moviesList);
    } catch (err) {
      console.log('error fetching movies');
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SignOutButton />
        {movies.map((movie, index) => (
          <View key={movie.id ? movie.id : index} style={styles.movie}>
            <Text style={styles.movieName}>{movie.title}</Text>
            <Text style={styles.movieName}>{movie.fullplot}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {width: 400, flex: 1, padding: 20, alignSelf: 'center'},
  movie: {marginBottom: 15},
  movieName: {fontSize: 20, fontWeight: 'bold'},
});

export default MoviesList;
