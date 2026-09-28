import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/Home";
import CharactersList from "./src/screens/CharactersList";
import CharacterDetails from "./src/screens/CharacterDetails";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen

          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}} 

        /> 

        <Stack.Screen

          name="CharactersList"
          component={CharactersList}
          options={{headerShown: false}} 

        /> 

        <Stack.Screen

          name="CharacterDetails"
          component={CharacterDetails}
          options={{headerShown: false}} 

        /> 

      </Stack.Navigator>
    </NavigationContainer>
  )
}