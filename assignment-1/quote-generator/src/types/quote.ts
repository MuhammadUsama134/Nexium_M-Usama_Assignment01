export interface Quote {
  id: number
  text: string
  author: string
  category: string
}

export interface QuoteCategory {
  value: string
  label: string
  description: string
}

export interface QuoteResponse {
  success: boolean
  quotes?: Quote[]
  error?: string
}
