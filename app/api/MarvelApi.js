import md5 from 'react-native-md5';
import axios from 'axios';

const PRIVATE_KEY = 'YOU_PRIVATE_KEY';
const PUBLIC_KEY = 'YOU_PUBLIC_KEY';

const getHash= () => {
  const timeStamp = Number(new Date())
  return md5.hex_md5(timeStamp + PRIVATE_KEY + PUBLIC_KEY)
}

const instance = () => {
  return axios.create({
    baseURL: 'https://gateway.marvel.com:443/v1/public',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export const getCharacters = () => {
  return instance()
    .get(`/characters?ts=${timeStamp}&orderBy=name&limit=20&apikey=${PUBLIC_KEY}&hash=${getHash()}`)
    .then(response => {
      return response.data
    })
}

export const getCharacter = (characterId) => {
  return instance()
    .get(`/characters/${characterId}?ts=${timeStamp}&apikey=${PUBLIC_KEY}&hash=${getHash()}`)
    .then(response => {
      return response.data
    })
}