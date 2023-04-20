import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BlogListScreen from "../screens/BlogListScreen";
import BlogDetailScreen from "../screens/BlogDetailScreen";
import { BlogProvider } from "../context/BlogContext";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <BlogProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BlogList">
          <Stack.Screen
            name="BlogList"
            component={BlogListScreen}
            options={{ title: "Blog Yazıları" }}
          />
          <Stack.Screen
            name="BlogDetail"
            component={BlogDetailScreen}
            options={{ title: "Yazı Detayı" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BlogProvider>
  );
}
