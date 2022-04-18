import { Pool, PoolConfig} from 'pg'
import { ConfigData } from './interfaces'

export class AkilyProtocol {

  config: ConfigData
  pool: Pool
  isConnected = false

  constructor(config: ConfigData) {
    this.config = config  
  }

  public async setConnection() {
    const config: PoolConfig = {
      user: this.config.user,
      host: this.config.host,
      database: this.config.database,
      password: this.config.password,
      port: this.config.port,
    }
    this.VALIDATE_CONFIG(config)
    this.pool = new Pool(config)
    await this.pool.connect()
    this.isConnected = true
  }

  private VALIDATE_CONFIG(config: PoolConfig) {
    if (!config.user) throw new Error('user is required for starting connection')
    if (!config.host) throw new Error('host is required for starting connection')
    if (!config.database) throw new Error('database is required for starting connection')
    if (!config.password) throw new Error('password is required for starting connection')
    if (!config.port) throw new Error('port is required for starting connection')
  }

  public async executeQuery(query: string, params: any[]) {
    if (!this.isConnected) throw new Error('connection is not set')
    const response = await this.pool.query(query, params)
    return response?.rows.length > 1 ? response?.rows : response?.rows[0]
  }
  
  public async closeConnection() {
    await this.pool.end()
    this.isConnected = false
  }
}
