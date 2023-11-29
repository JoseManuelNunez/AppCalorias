import { StyleSheet, Text, View, Modal } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import Form from "../../atoms/form";
import useFoodStorage from "../../../hooks/useFoodStorage";

const AddFoodModal = ({ onClose, visible }) => {
    const initialValue = {
        calories: "",
        name: "",
        portion: "",
    };
    const [form, setForm] = useState(initialValue);

    const { onSaveFood } = useFoodStorage();
    console.log(form);

    const handleInputChange = (inputName, inputValue) => {
        setForm((prevData) => ({
            ...prevData,
            [inputName]: inputValue,
        }));
    };
    useEffect(() => {
        setForm(initialValue);
    }, [visible]);
    const handleAddPress = async () => {
        try {
            const allStoredFoods = await onSaveFood({
                calories: form.calories,
                name: form.name,
                portion: form.portion,
            });
            console.log("Todos los alimentos almacenados:", allStoredFoods);

            onClose(true);
        } catch (error) {
            return Promise.reject(error);
        }
    };
    return (
        <Modal
            visible={visible}
            onRequestClose={() => onClose()}
            transparent
            animationType="slide"
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.closeContainer}>
                        <Button
                            icon={<Icon name="close" size={28} />}
                            onPress={() => onClose()}
                            type="clear"
                        />
                    </View>
                    <View>
                        <Text style={styles.title}>Add Food</Text>
                        <Form
                            textnames="CAL"
                            value={form.calories}
                            name="calories"
                            onChange={handleInputChange}
                        />
                        <Form
                            textnames="Nombre"
                            value={form.name}
                            name="name"
                            onChange={handleInputChange}
                        />
                        <Form
                            textnames="Porciones"
                            value={form.portion}
                            name="portion"
                            onChange={handleInputChange}
                        />
                    </View>
                    <View style={styles.containerButton}>
                        <Button
                            icon={<Icon name="add" color={"#fff"} />}
                            title={"Add"}
                            titleStyle={styles.titleStyles}
                            buttonStyle={styles.buttonStyles}
                            color={"#4ecb71"}
                            radius={"xl"}
                            disabled={
                                form.calories.trim() === "" ||
                                form.name.trim() === "" ||
                                form.portion.trim() === ""
                            }
                            disabledStyle={styles.disableButton}
                            disabledTitleStyle={styles.titleDesabled}
                            onPress={handleAddPress}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddFoodModal;

const styles = StyleSheet.create({
    titleDesabled: { color: "black" },
    disableButton: { backgroundColor: "gray" },
    buttonStyles: { paddingHorizontal: 30 },
    titleStyles: { fontSize: 20, paddingVertical: 5, color: "#fff" },
    containerButton: { alignItems: "flex-end", borderRadius: 20 },
    title: { fontWeight: "bold", fontSize: 25, marginVertical: 10 },
    closeContainer: { alignItems: "flex-end" },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 18,
        shadowColor: "#000",
        textShadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
