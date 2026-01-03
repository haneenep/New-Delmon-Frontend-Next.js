export interface ContractRequestPayload {
  name: string
  company_name: string
  email: string
  phone: string
  address: string
}

export interface ContractRequestResponse {
  status: boolean
  message: string
  data: ContractRequestData
}

export interface ContractRequestData {
  user_id: number
  name: string
  company_name: string
  email: string
  phone: string
  address: string
  status: string
  updated_at: string
  created_at: string
  id: number
}

export interface GetContractProductResponse {
  status: boolean
  message: string
  data: ContractProductData
}

export interface ContractProductData {
  contract: Contract
  products: Products
  count: number
}

export interface Contract {
  id: number
  user_id: number
  name: string
  company_name: string
  email: string
  phone: string
  address: string
  status: string
  created_at: string
  updated_at: string
}

export interface Products {
  current_page: number
  data: ProductData[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface ProductData {
  id: number
  contract_id: number
  user_id: number
  product_id: number
  price: string
  created_at: string
  updated_at: any
}

export interface Link {
  url?: string
  label: string
  active: boolean
}

