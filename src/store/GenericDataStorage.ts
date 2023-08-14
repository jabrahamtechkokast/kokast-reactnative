// GenericDataStorage.tsx
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props<T> {
  dataKey: string;
  initialData: T;
}

const GenericDataStorage = <T>({ dataKey, initialData }: Props<T>) => {
  const [data, setData] = useState<T>(initialData);

  // Function to retrieve data from AsyncStorage
  const getData = async () => {
    try {
      const dataString = await AsyncStorage.getItem(dataKey);
      if (dataString) {
        const parsedData: T = JSON.parse(dataString);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  // Function to update and save data to AsyncStorage
  const updateData = async (updatedData: T) => {
    try {
      setData(updatedData);
      const dataString = JSON.stringify(updatedData);
      await AsyncStorage.setItem(dataKey, dataString);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, updateData };
};

export default GenericDataStorage;
