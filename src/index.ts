import { AkilyProtocol } from './pg/main'

const akilyProtocol = new AkilyProtocol()
const setConnection = akilyProtocol.setConnection
const executeQuery = akilyProtocol.executeQuery
const closeConnection = akilyProtocol.closeConnection
const VALIDATE_CONFIG = akilyProtocol.VALIDATE_CONFIG

export {
  setConnection,
  executeQuery,
  closeConnection,
  VALIDATE_CONFIG,
}
