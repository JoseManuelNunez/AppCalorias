import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/organism/home";
import AddFood from "../components/organism/add-food";

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name={"Home"}
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={"AddFood"}
                    component={AddFood}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Routes;
