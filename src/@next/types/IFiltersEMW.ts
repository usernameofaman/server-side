interface Attributes {
  [key: string]: string[];
}
export interface IFilters {
  after: string;
  pageSize: number;
  sortBy: string;
  priceLte: number;
  priceGte: number;
}
