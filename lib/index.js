"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATE_CONFIG = exports.closeConnection = exports.executeQuery = exports.setConnection = void 0;
const main_1 = require("./pg/main");
const akilyProtocol = new main_1.AkilyProtocol();
const setConnection = akilyProtocol.setConnection;
exports.setConnection = setConnection;
const executeQuery = akilyProtocol.executeQuery;
exports.executeQuery = executeQuery;
const closeConnection = akilyProtocol.closeConnection;
exports.closeConnection = closeConnection;
const VALIDATE_CONFIG = akilyProtocol.VALIDATE_CONFIG;
exports.VALIDATE_CONFIG = VALIDATE_CONFIG;
