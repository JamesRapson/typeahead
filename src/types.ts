export interface SearchResultItem {
  id: string;
  label: string;
}

export type SearchFunction<T> = (searchString: string) => Promise<T[]>;
