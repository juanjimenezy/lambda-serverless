'use strict';
const index = require('../../index.js');
const lambdaTestUtils = require('@nequi/nequi-ci-utils').Lambda8TestUtils;
const RESPONSE_MESSAGES = require('@nequi/nequi-api-utils').RESPONSE_MESSAGES

describe('lambda-serverless/index.js', () => {

  it('index.js: Success test', async () => {
    try {
      let response = await lambdaTestUtils.test(index.handler, 'test/success.json');
      expect(response).toBeDefined();

      console.log('Response: ', JSON.stringify(response));

      const { ResponseMessage } = response;
      expect(ResponseMessage).toBeDefined();
      expect(ResponseMessage.ResponseHeader).toBeDefined();
      expect(ResponseMessage.ResponseBody).toBeDefined();

      const { Status } = ResponseMessage.ResponseHeader;
      expect(Status.StatusCode).toBe(RESPONSE_MESSAGES.SUCCESS.CODE);

      expect(ResponseMessage.ResponseBody.any.testRS).toBeDefined();

      const { testRS } = ResponseMessage.ResponseBody.any;
      expect(testRS).toEqual(
        jasmine.objectContaining({
          key: 'onboardingTest',
          parameter: 'parametro1',
          value: { backend: { serverless: 'Finalizar onboarding', webflux: 'Finalizar onboarding' } },
          region: 'C001'
        })
      );


    } catch (error) {
      console.log('ERROR: ', error);
      expect(error).not.toBeDefined();
    }
  });
}); 