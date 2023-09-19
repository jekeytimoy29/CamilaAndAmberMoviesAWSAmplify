import React, {useEffect, useState} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {SafeAreaView, StyleSheet, Text, View, Pressable} from 'react-native';
import {listMovies} from './src/graphql/queries';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-native';

// retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = context => [context.user];

const SignOutButton = () => {
  const {user, signOut} = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello, {user.username}! Click here to sign out!
      </Text>
    </Pressable>
  );
};

const App = () => {
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

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {width: 400, flex: 1, padding: 20, alignSelf: 'center'},
  movie: {marginBottom: 15},
  movieName: {fontSize: 20, fontWeight: 'bold'},
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});
