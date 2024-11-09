import axios from 'axios'

const api = axios.create({
  baseURL: 'https://swapi.dev/api/',
})

export const fetchCharacters = async (page: number) => {
  const response = await api.get(`people/?page=${page}`)
  return response.data
}

export const fetchCharacter = async (id: string) => {
  const response = await api.get(`people/${id}/`)
  return response.data
}

export const fetchHomeworld = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

// src/api.ts


export const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
