import { RootState } from '../../store';

export const getCatalogState = (state: RootState) => state.catalog;
export const getData = (state: RootState) => state.catalog.data
export const getLoadingStatus = (state: RootState) => state.catalog.loadingStatus
export const getError = (state: RootState) => state.catalog.error
export const getGender = (state: RootState) => state.catalog.gender;
export const getStatus = (state: RootState) => state.catalog.status;
export const getName = (state: RootState) => state.catalog.name;
