import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import inputReducer from './reducers';


export const Store = configureStore({reducer: {input: inputReducer}});
