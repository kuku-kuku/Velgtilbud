export type ServiceType = 'flytting' | 'rengjoring'

export interface LeadFormData {
  service: ServiceType
  name: string
  phone: string
  email: string
  postalCode: string
  message?: string
}

export interface Testimonial {
  name: string
  location: string
  rating: number
  text: string
  service: ServiceType
  date: string
}

export interface FAQItem {
  question: string
  answer: string
}
