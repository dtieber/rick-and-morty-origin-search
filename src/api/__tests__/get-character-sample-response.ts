export const sampleCharacterResponse = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
}

export const sampleCharacterResponseWithoutOrigin = {
  id: 116,
  name: 'Evil Beth Clone',
  status: 'Dead',
  species: 'Human',
  type: 'Clone',
  gender: 'Female',
  origin: {
    name: 'unknown',
    url: '',
  },
  location: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/116.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/5',
  ],
  url: 'https://rickandmortyapi.com/api/character/116',
  created: '2017-12-26T16:10:47.781Z',
}
