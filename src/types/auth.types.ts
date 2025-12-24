export interface RegisterResponse {
  status: boolean
  message: string
  token: string
  user: User
}

export interface User {
  name: string
  email: string
  phone: string
  role: string
  status: string
  updated_at: string
  created_at: string
  id: number
}
