const nequiUtils = require('@nequi/nequi-utils')
const nequiApiUtils = require('@nequi/nequi-api-utils')
const responseUtils = nequiApiUtils.ResponseAPIUtils
const RESPONSE_MESSAGES = nequiApiUtils.RESPONSE_MESSAGES
const env = nequiUtils.Environment
const lambdaUtils = nequiUtils.Lambda8
const nequiDynamo = require('@nequi/nequi-aws-dynamodb')

const service = async (event) => {
  try {
    const TABLE_NAME = env.getEnv('NAME_TABLE_NEQUI_PARAMS');
    const { key } = event.RequestMessage.RequestBody.any.testRQ;
    const region = event.RequestMessage.RequestHeader.Destination.ServiceRegion;
    const data = await nequiDynamo.getItem(TABLE_NAME, { key, region });
    
    if (!data.Item) {
      throw lambdaUtils.buildOutput(true, false,
        getOutput(event, RESPONSE_MESSAGES.DATA_NOT_FOUND.CODE,
          RESPONSE_MESSAGES.DATA_NOT_FOUND.DESCRIPTION),
        "ERROR-DYNAMO", "ERROR OBTENIEDO DATA")
    }
    
    return data.Item;
  } catch (error) {

    if (error && error.output) {
      throw error;
    }

    throw lambdaUtils.buildOutput(true, true,
      getOutput(event, RESPONSE_MESSAGES.TECHNICAL_ERROR.CODE,
        RESPONSE_MESSAGES.TECHNICAL_ERROR.DESCRIPTION),
      'Sistema que fallo', 'proceso o función', error)
  }
}

const getOutput = (event, code, description, body) => {
  return responseUtils.buildResponseFromRequest(event, code, description, body)
}

module.exports = {
  service: service
}
