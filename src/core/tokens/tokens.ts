// Tokens list
export default {
  DATABASE: /(db|database)(\w|\s)+:/i,
  TABLE: /table(\w|\s)+:/i,
  FIELD: /field(\w|\s)+:/i,
  PARAM: /-(\s+)?(\w|\s)+=>.*/i,
  TABS: /^\s+/
}