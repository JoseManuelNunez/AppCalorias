import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";
const TodayCaloriesAnimated = ({ Total, Consumed, remaining, percentage }) => {
    const Results = ({ keyValue, value }) => {
        return (
            <View style={styles.rightItem}>
                <Text style={styles.rightLegend}>{keyValue}</Text>
                <Text style={styles.rightValue}>{value}</Text>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <CircularProgress value={percentage} valueSuffix="%" />
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.today}>Today</Text>
                <Results keyValue="Total:" value={Total} />
                <Results keyValue="Consumed:" value={Consumed} />
                <Results keyValue="Remaining:" value={remaining} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rightValue: { flex: 1, textAlign: "right" },
    rightLegend: { flex: 1 },
    rightItem: { flexDirection: "row" },
    today: { fontSize: 30, fontWeight: "bold", paddingBottom: 20 },
    rightContainer: {
        alignItems: "flex-start",
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    leftContainer: { flex: 1, alignItems: "center" },
    container: { flexDirection: "row" },
});

export default TodayCaloriesAnimated;
