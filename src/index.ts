import { AkilyProtocol } from './pg/main'

const akilyProtocol = new AkilyProtocol()
const setConnection = akilyProtocol.setConnection
const executeQuery = akilyProtocol.executeQuery
const closeConnection = akilyProtocol.closeConnection

export {
  setConnection,
  executeQuery,
  closeConnection
}
