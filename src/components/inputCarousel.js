import { styles } from "../styles/inputCarouselStyles";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import { InputItem } from './input';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const InputsCarousel = () => {
  const [startItemIndex, setStartItemIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const initializeItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('draggableItems');
        if (storedItems) {
          setAllItems(JSON.parse(storedItems));
        } else {
          const initialItems = Array.from(Array(8), (_, index) => ({
            id: index + 1,
            image: require('./Assets/initialImage.png'),
            name: `Item ${index + 1}`,
            command: `Default Command ${index + 1}`,
          }));
          setAllItems(initialItems);
          await AsyncStorage.setItem('draggableItems', JSON.stringify(initialItems));
        }
      } catch (error) {
        console.log('Error initializing items:', error);
      }
    };

    initializeItems();
  }, []);

  useEffect(() => {
    const loadItems = async () => {
      try {
        // Load the item data from AsyncStorage
        const storedItems = await AsyncStorage.getItem('draggableItems');
        if (storedItems) {
          setAllItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.log('Error loading items:', error);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    // Save the item data to AsyncStorage whenever it changes
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem('draggableItems', JSON.stringify(allItems));
      } catch (error) {
        console.log('Error saving items:', error);
      }
    };

    saveItems();
  }, [allItems]);

  useEffect(() => {
    updateVisibleItems(allItems);
  }, [startItemIndex, allItems]);

  const updateVisibleItems = (items) => {
    const startIndex = startItemIndex;
    const endIndex = startItemIndex + 3;
    const visibleItemsData = items.slice(startIndex, endIndex);
    setVisibleItems(visibleItemsData);
  };

  const handlePrevious = () => {
    const newIndex = Math.max(startItemIndex - 4, 0);
    setStartItemIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(startItemIndex + 4, allItems.length - 1);
    setStartItemIndex(newIndex);
  };

  const handleDraggableItemDataChange = async (itemId, newData) => {
    // Handle the data change for the specific draggable item
    const updatedItems = allItems.map((item) =>
      item.id === itemId ? { ...item, ...newData } : item
    );
    setAllItems(updatedItems);
  };

  return (
    <View style={styles.box}>
      <ScrollView contentContainerStyle={styles.carouselContent} horizontal>
        <View style={styles.row}>
          {visibleItems.map((item) => (
            <InputItem
              key={item.id}
              item={item}
              command={'H\r\n'}
              onItemDataChange={(newData) =>
                handleDraggableItemDataChange(item.id, newData)
              }
            />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handlePrevious} style={styles.button}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
