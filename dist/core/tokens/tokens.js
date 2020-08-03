"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Tokens list
exports.default = {
    DATABASE: /(db|database)/i,
    TABLE: /table/i,
    FIELD: /field/i,
    PARAM: /-(\s+)?(\w|\s)+=>.*/i
};
