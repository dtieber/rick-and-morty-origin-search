import { isLeft } from 'fp-ts/lib/Either'
import type * as t from 'io-ts'
import { failure } from 'io-ts/lib/PathReporter'

export function valueOrThrow<A, O, I>(codec: t.Type<A, O, I>, value: I): A {
  const decoded = codec.decode(value)
  if(isLeft(decoded)) {
    throw new Error(failure(decoded.left).join('\n'))
  }
  return decoded.right
}
