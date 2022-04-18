import { AkilyProtocol } from '../src/pg/main'
import { ConfigData } from '../src/pg/interfaces'
import { Pool } from 'pg'

let pool: Pool

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  }
  return { Pool: jest.fn(() => mPool) }
})

beforeEach(() => {
  pool = new Pool()
})

afterAll(() => {
  jest.clearAllMocks()
})


describe('AkilyProtocol', () => {
  test('should be defined', () => {
    expect(AkilyProtocol).toBeDefined()
  })

  test('should be able to create an instance', () => {
    const config: ConfigData = {
      user: 'user',
      host: 'host',
      database: 'database',
      password: 'password',
      port: 5432,
    }
    const protocol = new AkilyProtocol(config)
    expect(protocol).toBeDefined()
  })

  test('should be able to set connection', async () => {
    const config: ConfigData = {
      user: 'user',
      host: 'host',
      database: 'database',
      password: 'password',
      port: 5432,
    }
    const protocol = new AkilyProtocol(config)
    await protocol.setConnection()
    expect(pool.connect).toHaveBeenCalled()
  })

  test('should be able to execute query', async () => {
    const config: ConfigData = {
      user: 'user',
      host: 'host',
      database: 'database',
      password: 'password',
      port: 5432,
    }
    const protocol = new AkilyProtocol(config)
    await protocol.setConnection()
    const query = 'SELECT * FROM users'
    const params: any[] = []
    await protocol.executeQuery(query, params)
    expect(pool.query).toHaveBeenCalledWith(query, params)
  })

  test('should be able to close connection', async () => {
    const config: ConfigData = {
      user: 'user',
      host: 'host',
      database: 'database',
      password: 'password',
      port: 5432,
    }
    const protocol = new AkilyProtocol(config)
    await protocol.setConnection()
    await protocol.closeConnection()
    expect(pool.end).toHaveBeenCalled()
  })

  test('should return an error when user is not provided', async () => {
    const config: ConfigData = {
      user: '',
      host: 'host',
      database: 'database',
      password: 'password',
      port: 5432,
    }
    const protocol = new AkilyProtocol(config)
    await expect(protocol.setConnection()).rejects.toThrow('user is required for starting connection')
  })

  test('should return an error when host is not provided', async () => {
    const config: ConfigData = {
      user: 'user',
      host: '',
      database: 'database',
      password: 'password',
      port: 5432,
    }
    const protocol = new AkilyProtocol(config)
    await expect(protocol.setConnection()).rejects.toThrow('host is required for starting connection')
  })

  test('should return an error when database is not provided', async () => {
    const config: ConfigData = {
      user: 'user',
      host: 'host',
      database: '',
      password: 'password',
      port: 5432,
    }
    const protocol = new AkilyProtocol(config)
    await expect(protocol.setConnection()).rejects.toThrow('database is required for starting connection')
  })

  test('should return an error when password is not provided', async () => {
    const config: ConfigData = {
      user: 'user',
      host: 'host',
      database: 'database',
      password: '',
      port: 5432,
    }
    const protocol = new AkilyProtocol(config)
    await expect(protocol.setConnection()).rejects.toThrow('password is required for starting connection')
  })

  test('should return an error when port is not provided', async () => {
    const config: ConfigData = {
      user: 'user',
      host: 'host',
      database: 'database',
      password: 'password',
      port: 0,
    }
    const protocol = new AkilyProtocol(config)
    await expect(protocol.setConnection()).rejects.toThrow('port is required for starting connection')
  })

  test('should return an error when the coneection is not set', async () => {
    const config: ConfigData = {
      user: 'user',
      host: 'host',
      database: 'database',
      password: 'password',
      port: 5432,
    }
    const protocol = new AkilyProtocol(config)
    await expect(protocol.executeQuery('SELECT * FROM users', [])).rejects.toThrow('connection is not set')
  })
  
})