declare const setConnection: (config: import("./pg/interfaces").ConfigData) => Promise<void>;
declare const executeQuery: (query: string, params: any[]) => Promise<any>;
declare const closeConnection: () => Promise<void>;
declare const VALIDATE_CONFIG: (config: import("./pg/interfaces").ConfigData) => void;
export { setConnection, executeQuery, closeConnection, VALIDATE_CONFIG, };
