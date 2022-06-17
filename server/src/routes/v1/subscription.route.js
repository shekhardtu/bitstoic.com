const express = require('express');
const validate = require('../../middlewares/validate');
const identifierValidation = require('../../validations/identifier.validation');
const { identifierController } = require('../../controllers');

const router = express.Router();

router.post('/send-otp', validate(identifierValidation.identifier), identifierController.sendOtp);
router.post('/verify-otp', validate(identifierValidation.identifierHash), identifierController.verifyOtp);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Identifier
 *   description: Verify Identifier
 */

/**
 * @swagger
 * /identifier/send-otp:
 *   post:
 *     summary: Set Identifier and send otp
 *     description: An OTP will go to the user identifier.
 *     tags: [Identifier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *             properties:
 *               identifier:
 *                 type: string
 *             example:
 *               identifier: fake@example.com
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
