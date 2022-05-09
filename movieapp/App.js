import { View } from 'react-native';
import DetailsScreen from './src/screens/Detail';
import Main from './src/MainContainer';
import "react-native-gesture-handler"
import { NavigationContainer, StackActions } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createStackNavigator();
function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
     >

      <Stack.Screen 
        name="Main"
        component={Main}
        options={{ title: "Main" }}
      />

      <Stack.Screen 
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ title: "DetailsScreen" }}
      />

     </Stack.Navigator>
   </NavigationContainer>
  );
}

export default App;