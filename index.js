'use strict'
/**
 * @module lambda-serverless
 * @description lambda taller serverless onboarding
 * @author JUAN-JIMENEZ <jrjimenez@nequi.com>
 * @version 1.0.0
 * @since 2026-02-27
 * @lastModified 2026-02-27
 */

const srcHandler = require('./src/handler/handler')

exports.handler = async (event, context) => {
  return await srcHandler(event, context)
}
