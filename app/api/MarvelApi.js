import md5 from 'react-native-md5';
import axios from 'axios';

const PRIVATE_KEY = 'YOU_PRIVATE_KEY';
const PUBLIC_KEY = 'YOU_PUBLIC_KEY';

const instance = () => {
  return axios.create({
    baseURL: 'https://gateway.marvel.com:443/v1/public',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export const getCharacters = (page, limit) => {
  const timeStamp = Number(new Date())
  const hash = md5.hex_md5(timeStamp + PRIVATE_KEY + PUBLIC_KEY)

  const currentOffset = page === 1 ? 0 : (limit * (page - 1))

  return instance()
    .get(`/characters?ts=${timeStamp}&orderBy=name&limit=${limit}&offset=${currentOffset}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then(response => {
      return response.data
    })
}

export const getCharacter = (characterId) => {
  const timeStamp = Number(new Date())
  const hash = md5.hex_md5(timeStamp + PRIVATE_KEY + PUBLIC_KEY)

  return instance()
    .get(`/characters/${characterId}?ts=${timeStamp}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then(response => {
      return response.data
    })
}
