import { Pool } from 'pg'
import { ConfigData } from './interfaces'

export class AkilyProtocol {

  pool: Pool
  isConnected = false 
  client:any

  constructor() { 
    this.pool = new Pool()
  }
   

  public setConnection = async (config: ConfigData) => {
    this.VALIDATE_CONFIG(config)
    this.pool = new Pool(config)
    this.client = await this.pool.connect()
    this.isConnected = true
    return this.isConnected
  }

  public VALIDATE_CONFIG = (config: ConfigData) => {
    if (!config.user) throw new Error('user is required for starting connection')
    if (!config.host) throw new Error('host is required for starting connection')
    if (!config.database) throw new Error('database is required for starting connection')
    if (!config.password) throw new Error('password is required for starting connection')
    if (!config.port) throw new Error('port is required for starting connection')
  }

  public executeQuery = async (query: string, params: any[]) => {
    if (!this.isConnected) throw new Error('connection is not set')
    const response = await this.pool.query(query, params)
    this.client?.release()
    await this.pool.end()
    return response?.rows.length > 1 ? response?.rows : response?.rows[0]
  }

  public closeConnection = async () => {
    await this.pool.end()
    this.isConnected = false
  }
}
