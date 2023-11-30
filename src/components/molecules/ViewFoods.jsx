import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "../../../hooks/useFoodStorage";

const ViewFoods = ({
    calories,
    name,
    portion,
    isAbleToAdd,
    onCompleteAddRemove,
    itemPosition,
}) => {
    const { onSaveTodayFood, onRemoveTodayFood } = useFoodStorage();

    const handleIconPress = async () => {
        try {
            if (isAbleToAdd) {
                await onSaveTodayFood({ calories, name, portion });
                Alert.alert("comida agregada al dia");
            } else {
                await onRemoveTodayFood(itemPosition ?? -1);
                Alert.alert("comida eliminada");
                onCompleteAddRemove?.();
            }
        } catch (error) {
            console.error(error);

            Alert.alert("comida no agregada ");
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.portion}>{portion}</Text>
            </View>
            <View style={styles.rigthContainer}>
                <Button
                    icon={<Icon name={isAbleToAdd ? "add-circle-outline" : "close"} />}
                    style={styles.Button}
                    type="clear"
                    onPress={handleIconPress}
                />
                <Text style={styles.calories}>{calories} Cal</Text>
            </View>
        </View>
    );
};

export default ViewFoods;

const styles = StyleSheet.create({
    Button: { marginBottom: -8 },
    calories: { fontSize: 18 },
    portion: { fontSize: 13, color: "#808080" },
    name: { fontSize: 18, fontWeight: "500" },
    container: {
        backgroundColor: "#ade8af",
        flexDirection: "row",
        borderRadius: 12,
        borderColor: "white",
        border: 2,
        marginBottom: 10,
        padding: 12,
    },
    leftContainer: { flex: 1 },
    rigthContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
});
