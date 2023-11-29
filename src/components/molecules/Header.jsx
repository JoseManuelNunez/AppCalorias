import { View, Text, StyleSheet, Image } from "react-native";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const staticInfo = {
    name: "Jose Manuel",
    uri: "https://hips.hearstapps.com/hmg-prod/images/2024-ford-f-150-raptor-07-64ff719e60eb4.jpg?crop=0.573xw:1.00xh;0.218xw,0&resize=1200:*",
};
const Header = () => {
    const { canGoBack, goBack } = useNavigation();
    return (
        <View style={styles.container}>
            {canGoBack() ? (
                <View style={styles.containerButton}>
                    <Button
                        icon={<Icon name="arrow-back" size={30} onPress={() => goBack()} />}
                        type="clear"
                    />
                </View>
            ) : undefined}
            <View style={styles.leftContainer}>
                <Text style={styles.name}>Hello {staticInfo.name}</Text>
                <Text style={styles.subText}>welcome back to your goal</Text>
            </View>
            <View style={styles.rightContainer}>
                <Image source={{ uri: staticInfo.uri }} style={styles.image} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Back: { fontSize: 20 },
    name: { fontWeight: "bold" },
    subText: { fontWeight: "300" },
    container: { flexDirection: "row", marginTop: 20, marginHorizontal: 10 },
    rightContainer: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
    leftContainer: { flex: 1, justifyContent: "center" },
    containerButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 100,
    },
});
export default Header;
