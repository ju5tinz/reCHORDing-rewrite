import { configureStore } from '@reduxjs/toolkit';

import chordReducer from './chord';
import chordGroupReducer from './chordGroup';
import userReducer from './user';
import alertReducer from './alert';


export default configureStore({
  reducer: {
    chord: chordReducer,
    chordGroup: chordGroupReducer,
    user: userReducer,
    alert: alertReducer 
  }
});