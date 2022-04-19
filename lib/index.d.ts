declare const setConnection: (config: import("./pg/interfaces").ConfigData) => Promise<void>;
declare const executeQuery: (query: string, params: any[]) => Promise<any>;
declare const closeConnection: () => Promise<void>;
export { setConnection, executeQuery, closeConnection };
