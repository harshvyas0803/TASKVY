 

import { createSlice, nanoid } from '@reduxjs/toolkit';



const initialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: {
      reducer(state, action) {
        state.notes.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    removeNote(state, action) {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    updateNote(state, action) {
      const { id, title, content } = action.payload;
      const note = state.notes.find(note => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
      }
    },
    // Set notes from API
    setNotes(state, action) {
      state.notes = action.payload;
    },
  },
});

export const { addNote, removeNote, updateNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;
