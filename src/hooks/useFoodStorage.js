import AsyncStorage from "@react-native-async-storage/async-storage";
import { isToday } from "date-fns";
const MY_FOOD_KEY = "@MyFood:Key";
const MY_TODAY_FOOD_KEY = "MyTodayFood:key";

const useFoodStorage = () => {
    const saveInfoToStorage = async (storageKey, meal) => {
        try {
            const currentSavedFood = await AsyncStorage.getItem(storageKey);

            if (currentSavedFood !== null) {
                const currentSavedFoodParsed = JSON.parse(currentSavedFood);

                if (Array.isArray(currentSavedFoodParsed)) {
                    currentSavedFoodParsed.push(meal);

                    await AsyncStorage.setItem(
                        storageKey,
                        JSON.stringify(currentSavedFoodParsed)
                    );

                    return Promise.resolve();
                } else {
                    console.log("no es un array");
                }
            }
            await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };
    const handleSaveTodayFood = async ({ calories, name, portion }) => {
        try {
            const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
                calories,
                name,
                portion,
                date: new Date().toISOString(),
            });
            return Promise.resolve(result);
        } catch (error) {
            console.log(error);

            return Promise.reject(error);
        }
    };
    const handleSaveFood = async ({ calories, name, portion }) => {
        try {
            const result = await saveInfoToStorage(MY_FOOD_KEY, {
                calories,
                name,
                portion,
            });
            console.log("guarda comida", result);

            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const handleGet = async (storageKey) => {
        try {
            const foods = await AsyncStorage.getItem(storageKey);
            if (foods !== null) {
                const parsedFoods = JSON.parse(foods);
                return Promise.resolve(parsedFoods);
            }
        } catch (error) {
            console.error(error);

            return Promise.reject(error);
        }
    };

    const handleGetFood = async () => {
        const alimentos = await handleGet(MY_FOOD_KEY);
        return Promise.resolve(alimentos);
    };

    const handlegetTodayFood = async () => {
        const alimentosToday = await handleGet(MY_TODAY_FOOD_KEY);
        return Promise.resolve(
            alimentosToday?.filter(
                (meal) => meal.date && isToday(new Date(meal.date))
            )
        );
    };

    const handleRemoveTodayFood = async (index) => {
        try {
            const todayFood = await handlegetTodayFood();
            const filterItem = todayFood?.filter((_, itemIndex) => {
                return itemIndex !== index;
            });
            await AsyncStorage.setItem(MY_TODAY_FOOD_KEY, JSON.stringify(filterItem));
            return Promise.resolve();
        } catch (error) { }
    };

    return {
        onSaveTodayFood: handleSaveTodayFood,
        onSaveFood: handleSaveFood,
        onGetFoods: handleGetFood,
        onGetTodayFood: handlegetTodayFood,
        onRemoveTodayFood: handleRemoveTodayFood,
    };
};

export default useFoodStorage;
