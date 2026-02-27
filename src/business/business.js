const nequiUtils = require('@nequi/nequi-utils')
const nequiApiUtils = require('@nequi/nequi-api-utils')
const responseUtils = nequiApiUtils.ResponseAPIUtils
const RESPONSE_MESSAGES = nequiApiUtils.RESPONSE_MESSAGES
const env = nequiUtils.Environment
const lambdaUtils = nequiUtils.Lambda8

const {
  service
} = require('../services/service')

module.exports = async function processBusiness (event) {
  return await callService(event)
}

const callService = async (event) => {
  return await service(event);
}
