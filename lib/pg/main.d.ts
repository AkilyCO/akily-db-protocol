import { Pool } from 'pg';
import { ConfigData } from './interfaces';
export declare class AkilyProtocol {
    pool: Pool;
    isConnected: boolean;
    setConnection(config: ConfigData): Promise<void>;
    private VALIDATE_CONFIG;
    executeQuery(query: string, params: any[]): Promise<any>;
    closeConnection(): Promise<void>;
}
