export const isError = (given: unknown): given is Error => {
  const maybeError = given as Error
  return maybeError?.name !== undefined && maybeError?.message !== undefined
}
