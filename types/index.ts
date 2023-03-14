export const NOUNS_PROPOSAL_STATUS = {
  ACTIVE: 'ACTIVE',
  CANCELED: 'CANCELED',
  CREATED: 'CREATED',
  DEFEATED: 'DEFEATED',
  EXECUTABLE: 'EXECUTABLE',
  EXECUTED: 'EXECUTED',
  EXPIRED: 'EXPIRED',
  PENDING: 'PENDING',
  QUEUED: 'QUEUED',
  SUCCEEDED: 'SUCCEEDED',
  VETOED: 'VETOED',
} as const

export type PROPOSAL_STATUS = typeof NOUNS_PROPOSAL_STATUS[keyof typeof NOUNS_PROPOSAL_STATUS]


export type Hash = `0x${string}`

export const NOUNS_PROPOSAL_SUPPORT = {
  FOR: 'FOR',
  AGAINST: 'AGAINST',
  ABSTAIN: 'ABSTAIN',
} as const

export type PROPOSAL_SUPPORT = typeof NOUNS_PROPOSAL_SUPPORT[keyof typeof NOUNS_PROPOSAL_SUPPORT]