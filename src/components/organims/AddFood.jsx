import { View, StyleSheet, Text, Alert, ScrollView } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import useFoodStorage from "../../../hooks/useFoodStorage";
import Header from "../../molecules/header";
import ViewFoods from "../../molecules/view-food";
import AddFoodModal from "../../molecules/add-food-modal";

const AddFood = () => {
  const [visible, setVisible] = useState < boolean > false;
  const { onGetFoods } = useFoodStorage();
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFoods();
      if (foodsResponse) {
        setFoods(foodsResponse);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  const handleModalClose = async (shouldUpdate) => {
    if (shouldUpdate) {
      Alert.alert("comida guardada");
      loadFoods();
    }
    setVisible(false);
  };

  useEffect(() => {
    loadFoods();
  }, []);
  const HandleSearchPress = async () => {
    try {
      const result = await onGetFoods();
      if (result) {
        setFoods(
          result.filter((item) =>
            item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerAddFood}>
        <View style={styles.leftContainer}>
          <Text style={styles.Add}>Add Food</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            icon={
              <Icon
                name="add-circle-outline"
                color="#fff"
                onPress={() => setVisible(true)}
              />
            }
            radius="lg"
            color="#4ecb71"
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.leftInput}>
          <Input
            placeholder="apples, pie, soda..."
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <View style={styles.rightButton}>
          <Button
            title="Search"
            color={"#ade8af"}
            radius={50}
            titleStyle={styles.boton}
            onPress={HandleSearchPress}
          />
        </View>
      </View>
      <ScrollView style={styles.content}>
        {foods?.map((meal, i) => (
          <ViewFoods key={i} {...meal} isAbleToAdd />
        ))}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1 },
  boton: { color: "black" },
  leftInput: { flex: 3 },
  rightButton: { flex: 1 },
  searchContainer: { flexDirection: "row" },
  Add: { fontSize: 20, fontWeight: "bold" },
  rightContainer: { flex: 1, alignItems: "flex-end" },
  leftContainer: { flex: 1 },
  container: {
    marginHorizontal: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  containerAddFood: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 10,
    marginVertical: 24,
  },
});

export default AddFood;
