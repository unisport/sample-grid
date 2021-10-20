// Added a question mark only to avoid typescript error with defining all the properties, because I'm displaying only small part of information about each product, in the future ofc we want receive all the product data

export interface IProduct {
  is_customizable?: boolean
  relative_url?: string
  price?: string
  product_main_image?: string
  delivery?: string
  discount_type?: string
  is_exclusive?: boolean
  prices: Prices
  id: string
  currency?: string
  attribute_english?: AttributeEnglish
  name: string
  discount_percentage?: number
  url?: string
  product_labels?: ProductLabel[]
  online?: boolean
  price_old?: string
  attributes?: Attributes
  min_max_prices?: MinMaxPrices
  image?: string
  stock?: Stock[]
}

export interface Prices {
  currency: string
  min_price: number
  max_price: number
  recommended_retail_price: number
  discount_percentage: number
}

export interface AttributeEnglish {
  league: string
  quarter: string
  club_national: string
  sleeve: string
  players: string[]
  color: string[]
  gender: string[]
  teamsport: string
  material: string[]
  segment: string
  kit: string
  item_type: string
  sorting_shirts: string
  team: string
  pricepoint: string
  nationality: string
  age: string[]
  shirt_season: string
  brand: string
}

export interface ProductLabel {
  name: string
  color: string
  priority: number
  active: boolean
  background_color: string
  id: number
}

export interface Attributes {
  league: string
  quarter: string
  club_national: string
  sleeve: string
  players: string[]
  color: string[]
  gender: string[]
  teamsport: string
  material: string[]
  segment: string
  kit: string
  item_type: string
  sorting_shirts: string
  team: string
  pricepoint: string
  nationality: string
  age: string[]
  shirt_season: string
  brand: string
}

export interface MinMaxPrices {
  price_old: number
  currency: string
  max: number
  min: number
}

export interface Stock {
  name_short: string
  pk: number
  order_by: number
  name: string
  stock_info: string
}
