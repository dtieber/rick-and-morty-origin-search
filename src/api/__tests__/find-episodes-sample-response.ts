export const sampleEpisodeResponse = {
  id: 6,
  name: 'Rick Potion #9',
  // eslint-disable-next-line camelcase
  air_date: 'January 27, 2014',
  episode: 'S01E06',
  characters: [
    'https://rickandmortyapi.com/api/character/1',
    'https://rickandmortyapi.com/api/character/2',
  ],
  url: 'https://rickandmortyapi.com/api/episode/6',
  created: '2017-11-10T12:56:34.339Z',
}

export const sampleResponseForPotion = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
    sampleEpisodeResponse,
  ],
}

export const sampleResponseWithMultiplePages = {
  info: {
    count: 28,
    pages: 2,
    next: 'https://rickandmortyapi.com/api/episode/?page=2&name=rick',
    prev: null,
  },
  results: [
    sampleEpisodeResponse,
    // imagine there were 19 more
  ],
}
