export type LeadStatus = 'pending' | 'contacted' | 'closed'

export interface Lead {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  product: string
  message: string | null
  status: LeadStatus
  lang: string
  replied_at: string | null
}

export interface Conversation {
  id: string
  created_at: string
  updated_at: string
  session_id: string
}

export interface ChatMessage {
  id: string
  created_at: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
}
