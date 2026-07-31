import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../src/screens/LoginScreen"
import ProductListScreen from "../../src/screens/ProductListScreen";
import AddEditProductScreen from "../../src/screens/AddEditProductScreen";
import ProductDetailsScreen from "../../src/screens/ProductDetailsScreen";
import StatsScreen from "../../src/screens/StatsScreen";
import { initDB } from "../../src/db/database";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initDB(); // criar tabelas na primeira execução
  }, []);

  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Produtos" component={ProductListScreen} />
        <Stack.Screen name="Adicionar" component={AddEditProductScreen} />
        <Stack.Screen name="Detalhes" component={ProductDetailsScreen} />
        <Stack.Screen name="Estatísticas" component={StatsScreen} />
      </Stack.Navigator>
    // {/* </NavigationContainer> */}
  );
}