import { createSlice } from '@reduxjs/toolkit'
import { loadData, ResponseData } from "./thunk";
import {LOADING_STATUS, ITEMS_PER_PAGE} from "../../consts";

export interface CatalogState {
    name: string,
    gender: string,
    status: string,
    currentPage: number,
    amountPages: number,
    data: ResponseData,
    loadingStatus: valueof<typeof LOADING_STATUS>
    error: null | string | unknown
}

const initialState: CatalogState = {
    name: '',
    gender: '',
    status: '',
    currentPage: 0,
    amountPages: 0,
    data: {info: null, results: [], error: undefined},
    loadingStatus: LOADING_STATUS.IDLE,
    error: null
}

export const slice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setName(state, action) {
            state.name = action.payload;
            state.currentPage = 0
        },
        setGender(state, action) {
            state.gender = action.payload;
            state.currentPage = 0
        },
        setStatus(state, action) {
            state.status = action.payload;
            state.currentPage = 0
        },
        setNextPage(state, action) {
            if (state.amountPages !== state.currentPage + 1) {
                state.currentPage = action.payload
            }
        },
        setPrevPage(state, action) {
            if (state.currentPage !== 0) {
                state.currentPage = action.payload
            } else {
                return;
            }
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadData.pending, (state) => {
              state.loadingStatus = 'loading';
              state.error = null;
              state.amountPages = 0
          })
          .addCase(loadData.fulfilled, (state, action) => {
              state.data = {...action.payload}
              state.loadingStatus = 'idle';
              state.error = null;

              if (action.payload.info) {
                  state.amountPages = Math.ceil(action.payload.info?.count / ITEMS_PER_PAGE)
              }
          })
          .addCase(loadData.rejected, (state, action) => {
              state.loadingStatus = 'error';
              state.data = {info: null, results: [], error: undefined}
              state.amountPages = 0
              state.error = action.payload;
          });
    },
});


export const { setName, setGender, setStatus, setNextPage, setPrevPage, setCurrentPage} = slice.actions;

export default slice.reducer;
