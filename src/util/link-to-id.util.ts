const rickAndMortyApiLinkPattern = /https:\/\/rickandmortyapi\.com\/api\/[a-z]+\/(\d+)/

export const rickAndMortyResourceLinkToId = (link: string): string | undefined => {
  const parsed = link.match(rickAndMortyApiLinkPattern)
  return parsed?.pop()
}
