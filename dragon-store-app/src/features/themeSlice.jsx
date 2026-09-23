import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: {
            isDark: false
        }
    },
    reducers: {
        toggleTheme: (state) => {
            state.value.isDark = !state.value.isDark
        },
        setTheme: (state, action) => {
            state.value.isDark = action.payload
        }
    }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
