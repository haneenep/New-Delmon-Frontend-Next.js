export interface GetProfileResponse {
  success: boolean
  message: string
  data: UserData
}

export interface UserData {
  id: number
  name: string
  username: any
  email: string
  email_verified_at: string
  photo: any
  phone: string
  address: any
  vendor_join: any
  vendor_short_info: any
  role: string
  status: string
  last_seen: any
  google_id: any
  facebook_id: any
  created_at: string
  updated_at: string
}
