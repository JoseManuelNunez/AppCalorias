import { View, Text, StyleSheet } from "react-native";
import React, { useState, useCallback } from "react";
import { Button, Icon } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../../molecules/header";
import TodayMeals from "../../molecules/today-meal";
import TodayCaloriesAnimated from "../../molecules/today-calories";
import useFoodStorage from "../../../hooks/useFoodStorage";

const Home = () => {
    const [todayFood, setTodayFood] = useState([]);
    const [todayStatistics, setTodayStatistics] =
        useState <
        TotalCalories >
        {
            Consumed: 0,
            percentage: 0,
            remaining: 0,
            Total: 0,
        };
    console.log("comidas del dia", todayFood);
    const totalCalories = 2000;
    const calculateTodayStatics = (meals) => {
        try {
            const CaloriesConsumed = meals.reduce(
                (acum, curr) => acum + Number(curr.calories),
                0
            );
            const remainigCalories = totalCalories - CaloriesConsumed;
            const percentage = (CaloriesConsumed / totalCalories) * 100;
            setTodayStatistics({
                Consumed: CaloriesConsumed,
                percentage,
                remaining: remainigCalories,
                Total: totalCalories,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const { onGetTodayFood } = useFoodStorage();
    const { navigate } = useNavigation();
    const loadTodayFood = useCallback(async () => {
        try {
            const todayFoodResponse = await onGetTodayFood();
            console.log(todayFoodResponse);
            calculateTodayStatics(todayFoodResponse);
            setTodayFood(todayFoodResponse);
        } catch (error) {
            setTodayFood([]);
            console.error(error);
        }
    }, []);
    useFocusEffect(
        useCallback(() => {
            loadTodayFood();
        }, [loadTodayFood])
    );
    const handleAddCaloriesPress = () => {
        navigate("AddFood");
    };
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.containerCalories}>
                <View style={styles.leftContainer}>
                    <Text style={styles.calories}>Calories</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Button
                        icon={<Icon name="add-circle-outline" color="#fff" />}
                        radius="lg"
                        color="#4ecb71"
                        onPress={handleAddCaloriesPress}
                    />
                </View>
            </View>
            <TodayCaloriesAnimated {...todayStatistics} />
            <TodayMeals
                foods={todayFood}
                onCompleteAddRemove={() => loadTodayFood()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerCalories: { flexDirection: "row", marginVertical: 20 },
    container: { flex: 1, marginHorizontal: 10 },
    calories: { fontWeight: "bold", fontSize: 20 },
    leftContainer: { flex: 1, justifyContent: "center" },
    rightContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        borderRadius: 20,
    },
});

export default Home;
