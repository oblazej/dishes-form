import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  form: formReducer, // mounted under "form"
});

export const store = configureStore({ reducer });