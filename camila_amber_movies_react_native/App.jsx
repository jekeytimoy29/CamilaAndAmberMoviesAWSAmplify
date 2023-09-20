import React from 'react';
import {withAuthenticator} from '@aws-amplify/ui-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesList from './src/screens/MoviesList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MoviesList"
          component={MoviesList}
          options={{title: 'Camila and Amber Movies'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withAuthenticator(App);
