import { Pool } from 'pg';
import { ConfigData } from './interfaces';
export declare class AkilyProtocol {
    pool: Pool;
    isConnected: boolean;
    constructor();
    setConnection: (config: ConfigData) => Promise<boolean>;
    VALIDATE_CONFIG: (config: ConfigData) => void;
    executeQuery: (query: string, params: any[]) => Promise<any>;
    closeConnection: () => Promise<void>;
}
