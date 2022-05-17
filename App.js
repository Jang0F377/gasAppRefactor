import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Provider} from 'react-redux'
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {store} from "./store";
import HomeScreen from "./screens/HomeScreen";
import StartNewFillScreen from "./screens/StartNewFillScreen";
import FullFillHistoryScreen from "./screens/FullFillHistoryScreen";
import FinishFillScreen from "./screens/FinishFillScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserAccountScreen from "./screens/UserAccountScreen";

export const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function App() {
  const Stack = createNativeStackNavigator();


  return (
      <Provider store={store}>
          <NavigationContainer>
              <SafeAreaProvider>
                  <Stack.Navigator initialRouteName={'Login'}>
                      <Stack.Screen name={'Login'} options={{headerShown:false}} component={LoginScreen}/>
                      <Stack.Screen name={'Register'} options={{headerShown:false}} component={RegisterScreen}/>
                      <Stack.Screen name={'Home'} options={{headerShown:false}} component={HomeScreen}/>
                      <Stack.Screen name={'Start New Fill'} options={{headerShown:false}} component={StartNewFillScreen}/>
                      <Stack.Screen name={'History'} options={{headerShown:false}} component={FullFillHistoryScreen}/>
                      <Stack.Screen name={'Finish Fill'} options={{headerShown:false}} component={FinishFillScreen}/>
                      <Stack.Screen name={'User Account'} options={{headerShown:false}} component={UserAccountScreen}/>
                  </Stack.Navigator>
              </SafeAreaProvider>
          </NavigationContainer>
      </Provider>
  );
}
