"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkilyProtocol = void 0;
const pg_1 = require("pg");
class AkilyProtocol {
    constructor() {
        this.setConnection = (config) => __awaiter(this, void 0, void 0, function* () {
            this.VALIDATE_CONFIG(config);
            this.pool = new pg_1.Pool(config);
            yield this.pool.connect();
            this.isConnected = true;
        });
        this.VALIDATE_CONFIG = (config) => {
            if (!config.user)
                throw new Error('user is required for starting connection');
            if (!config.host)
                throw new Error('host is required for starting connection');
            if (!config.database)
                throw new Error('database is required for starting connection');
            if (!config.password)
                throw new Error('password is required for starting connection');
            if (!config.port)
                throw new Error('port is required for starting connection');
        };
        this.executeQuery = (query, params) => __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected)
                throw new Error('connection is not set');
            const response = yield this.pool.query(query, params);
            return (response === null || response === void 0 ? void 0 : response.rows.length) > 1 ? response === null || response === void 0 ? void 0 : response.rows : response === null || response === void 0 ? void 0 : response.rows[0];
        });
        this.closeConnection = () => __awaiter(this, void 0, void 0, function* () {
            yield this.pool.end();
            this.isConnected = false;
        });
        this.isConnected = false;
    }
}
exports.AkilyProtocol = AkilyProtocol;
