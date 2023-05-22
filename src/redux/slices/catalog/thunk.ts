import { createAsyncThunk } from '@reduxjs/toolkit'

export interface InfoData {
  count: number;
  next: null | string;
  pages: number;
  prev: null | string
}

export interface CharacterData {
  created: string | Date;
  episode: string | string[];
  gender: string;
  id: string;
  image: string;
  location: {name: string, url: string};
  name: string;
  origin: {name: string, url: string};
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface ResponseData {
  info: InfoData | null;
  results: CharacterData[] | [];
  error: string | undefined
}

interface ParamsData {
  currentPage: number,
  gender: string,
  status: string,
  name: string
}

export const loadData = createAsyncThunk<ResponseData, ParamsData, {
  rejectValue: unknown
}>('users/update', async (params, { rejectWithValue }) => {
  try {
    let { currentPage, gender, status, name } = params
    if (gender === 'All') {
      gender = ''
    }
    if (status === 'All') {
      status = ''
    }

    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}&gender=${gender}&status=${status}&name=${name}`)
    const data = await response.json() as ResponseData
    if (!data.results && data.error) {
      return rejectWithValue(data.error)
    } else {
      return data
    }
  } catch (err) {
    return rejectWithValue(err)
  }
})

