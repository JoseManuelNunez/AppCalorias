import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import ViewFoods from "../view-food";

const TodayMeals = ({ foods, onCompleteAddRemove }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comidas</Text>
            <ScrollView style={styles.content}>
                {foods?.map((meal, i) => (
                    <ViewFoods
                        key={meal.name && i}
                        {...meal}
                        isAbleToAdd={false}
                        onCompleteAddRemove={onCompleteAddRemove}
                        itemPosition={i}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default TodayMeals;

const styles = StyleSheet.create({
    content: { marginVertical: 16 },
    container: { flex: 1, marginTop: 24 },
    title: { fontSize: 16 },
});
