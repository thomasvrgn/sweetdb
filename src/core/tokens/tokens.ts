// Token interface
export interface Token {
  token : string
  value : string
}

// Tokens list
export default {
  DATABASE: /(db|database)/i,
  TABLE: /table/i,
  FIELD: /field/i,
  PARAM: /-(\s+)?(\w|\s)+=>.*/i
}