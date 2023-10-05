const express = require('express');
const Messages = require('../models/messages');
const messageVal = require('../midleware/messagemidleware');
const {getMessages, insertMessage, deleteMessage, updateMessage, getOneMessage} = require('../controllers/messagecontroller')
// import verifyToken from '../midleware/jwtAuth';
const router = express.Router();

// Swagger documentation
/**
 * @swagger
 * components:
 *  responses:
 *           200:
 *               description: Success
 *           400:
 *               description: Bad request
 *           401:
 *               description: Authorization
 *           404:
 *               description: Not found
 *           500:
 *               description: Unexpected error.
 *  schemas:
 *      Messages:
 *          type: object
 *          required:
 *              -username
 *              -email
 *              -idea
 *          properties:
 *              username:
 *                  type: string
 *                  description: name of user
 *              email:
 *                  type: string
 *                  description: email of user
 *              idea:
 *                  type: string
 *                  description: password of user
 *          example:
 *              username: zeden
 *              email: kwizeraernez@gmail.com
 *              idea: we need a new blog about rommance
 *  parameters:
 *           messageId:
 *              name : id
 *              in : path
 *              description: Id for specified messageId
 *              required: true
 *              schema:
 *                 type: string
 */

/**
 * @swagger
 * tags:
 *  name: Messages
 *  description: All Message sent
 */

//Get all users registered
/**
 * @swagger
 * /messages:
 *  get:
 *    summary: getting all messages sent from user
 *    tags: [Messages]
 *    responses:
 *          200:
 *            description: All messages is here!
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                items:
 *                  $ref: '#/components/schemas/Messages'
 */


router.get('/messages', getMessages)


/**
 * @swagger
 * /messages:
 *    post:
 *      summary: inserting message
 *      tags: [Messages]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Messages'
 *      responses:
 *          200:
 *              description: Messages entered Successfully!
 *          400:
 *              $ref: '#/components/responses/400'
 * 
  */


router.post('/messages',messageVal, insertMessage)

//deleting message..

/**
* @swagger
* /messages/{id}:
*  delete:
*   summary: Delete one message
*   tags: [Messages]
*   security:
*   - {}
*   - bearerAuth: []
*   parameters:
*          - $ref: '#/components/parameters/messageId'
*   responses:
*      200:
*        description: Complite deleted
*      401:
*        description: Unauthorized
*      404:
*        description: not found 
*/

router.delete('/messages/:id', deleteMessage)

//updating messages
/**
 * @swagger
 * /messages/{id}:
 *  patch:
 *      summary: updating messages
 *      tags: [Messages]
 *      parameters:
 *          - $ref: '#/components/parameters/messageId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Messages'
 *      responses:
 *          200:
 *              description: Success update
 *          400:
 *              $ref: '#/components/responses/400'
 *          401: 
 *              $ref: '#/components/responses/401'
 *          404:
 *              description: not found  
 */

router.patch('/messages/:id', updateMessage)

/**
 * @swagger
 * /messages/{id}:
 *  get:
 *      summary: Getting message by id
 *      tags: [Messages]
 *      parameters:
 *            - name : id
 *              in : path
 *              schema:
 *                  type: string
 *              description: Id of specific id
 *              required: true
 *      responses:
 *          200: 
 *              description: specified messages
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Messages'
 *          404: 
 *              $ref: '#/components/responses/404'
 */

router.get('/messages/:id', getOneMessage)
module.exports = router