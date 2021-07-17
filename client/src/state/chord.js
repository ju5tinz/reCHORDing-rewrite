import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { addCurrGroup } from './chordGroup';
import { apiAddChord, apiGetChord } from '../api/chord';
import { apiGetCurrGroup } from '../api/chordGroup';


const chordAdapter = createEntityAdapter({
  selectId: (chord) => chord._id
});

export const addChord = createAsyncThunk(
  'chord/addChord',
  async (chord, thunkAPI) => {
    const groupId = thunkAPI.getState().chordGroups.currGroup._id;
    try {
      return await apiAddChord(chord, groupId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getChord = createAsyncThunk(
  'chord/getChord',
  async (_, thunkAPI) => {
    try {
      const currGroup = await apiGetCurrGroup();
      thunkAPI.dispatch(addCurrGroup(currGroup));
      const groupId = thunkAPI.getState().chordGroups.currGroup._id;
      return await apiGetChord(groupId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const chordSlice = createSlice({
  name: 'chord',
  initialState: chordAdapter.getInitialState(),
  reducers: {
    clearChord: state => {
      chordAdapter.removeMany(state, state.ids);
    }
  },
  extraReducers: {
    [addChord.fulfilled]: (state, action) => {
      chordAdapter.upsertOne(state, action.payload);
    },
    [getChord.fulfilled]: (state, action) => {
      chordAdapter.upsertMany(state, action.payload);
    }
  }
});

export const { clearChord } = chordSlice.actions;

export const {
  selectAll: selectAllChord,
  selectById: selectChordById,
  selectIds: selectChordIds,
} = chordAdapter.getSelectors(state => state.chord);

export default chordSlice.reducer;