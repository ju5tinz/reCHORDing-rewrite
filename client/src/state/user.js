import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRegisterUser, apiLoginUser, apiLogoutUser } from '../api/user';
import { error } from './alert'
import { clearChord } from './chord';
import { addCurrGroup, clearCurrGroup } from './chordGroup';

import Cookie from 'js-cookie';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (input, thunkAPI) => {
    const {user, history} = input;
    try {
      const data = await apiRegisterUser(user);
      thunkAPI.dispatch(clearChord());
      thunkAPI.dispatch(addCurrGroup(data.currGroup));
      Cookie.set('username', user.username, {expires: 1});
      history.push('/');
      return user.username;
    } catch (err) {
      thunkAPI.dispatch(error(err));
      thunkAPI.rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (input, thunkAPI) => {
    const {user, history} = input;
    try {
      const data = await apiLoginUser(user);
      thunkAPI.dispatch(clearChord());
      thunkAPI.dispatch(addCurrGroup(data.currGroup));
      Cookie.set('username', user.username, {expires: 1});
      history.push('/');
      return user.username;
    } catch (err) {
      thunkAPI.dispatch(error(err));
      thunkAPI.rejectWithValue(err);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (input, thunkAPI) => {
    const {history} = input;
    try {
      await apiLogoutUser();
      thunkAPI.dispatch(clearCurrGroup());
      thunkAPI.dispatch(clearChord());
      Cookie.remove('username');
      history.push('/');
    } catch (err) {
      thunkAPI.dispatch(error(err));
      thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  username: Cookie.get('username') || ""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.username = action.payload
    },
    [registerUser.rejected]: (state, action) => {
      state.username = ""
    },
    [loginUser.fulfilled]: (state, action) => {
      state.username = action.payload
    },
    [loginUser.rejected]: (state, action) => {
      state.username = ""
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.username = ""
    },
  }
});

export default userSlice.reducer;