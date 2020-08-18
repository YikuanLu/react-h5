// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type StoreValue = any
export interface Store {
  [name: string]: StoreValue
}

export interface StrMap {
  [propName: string]: string
}

export interface LocationQuery {
  id: string
  title: string
  type: string
  userid: string
}

export interface ListRes<T = StoreValue> {
  page: number
  size: number
  count: number
  content: T[]
}
