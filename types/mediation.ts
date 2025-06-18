export interface MediationContentData {
    description: string
    experience: string[]
}

export interface Mediation {
  id: string
  title: string
  audioUrl: string
  content: MediationContentData
  tip: string
  isRead?: boolean
}
