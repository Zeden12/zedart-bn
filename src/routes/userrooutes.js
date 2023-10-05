const express = require('express');
const Users = require('../models/users');
const {requireAuth, checkUser} = ('../midleware/verifyrole');
const userVal = require('../midleware/usermidleware');
// import verifyToken from '../midleware/jwtAuth';
const {getUsers, insertUser, deleteUser, updateUser, getOneUser, login} = require('../controllers/usercontroller')
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
 *      Users:
 *          type: object
 *          required:
 *              -username
 *              -email
 *              -password
 *          properties:
 *              username:
 *                  type: string
 *                  description: name of user
 *              email:
 *                  type: string
 *                  description: email of user
 *              password:
 *                  type: string
 *                  description: password of user
 *          example:
 *              username: zeden
 *              email: kwizeraernez@gmail.com
 *              password: cj zeden123
 *  parameters:
 *           userId:
 *              name : id
 *              in : path
 *              description: Id for specified userId
 *              required: true
 *              schema:
 *                 type: string
 */


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User registration and signup
 */

//Get all users registered
/**
 * @swagger
 * /users:
 *  get:
 *    summary: getting all user registed
 *    tags: [Users]
 *    responses:
 *          200:
 *            description: signup successful!
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                items:
 *                  $ref: '#/components/schemas/Users'
 */


router.get('/users', getUsers)

//verify user signup
/**
 * @swagger
 * /users:
 *    post:
 *      summary: user registration
 *      tags: [Users]
 *      security:
 *         - {}
 *         - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Users'
 *      responses:
 *          200:
 *              description: Successfull signup
 *          400:
 *              $ref: '#/components/responses/400'
 * 
  */
//User regis

router.post('/users',userVal, insertUser)

//user login
/**
 * @swagger
 * /users/login:
 *  post:   
 *      summary: user and admin login
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Users'
 *                  example:
 *                      email: admin@gmail.com
 *                      password: cj zeden123
 *      responses:
 *          200:
 *            description: Provide Token
 *          400: 
 *            $ref: '#/components/responses/400'
 *          401:
 *            description: Unauthorize
 *      
 * 
 */
router.post('/users/login', login)

//deleting user 
/**
* @swagger
* /users/{id}:
*  delete:
*   summary: Delete one user
*   tags: [Users]
*   security:
*      - {}
*      - bearerAuth: []
*   parameters:
*          - $ref: '#/components/parameters/userId'
*   responses:
*      200:
*        description: Complite deleted
*      401:
*        description: Unauthorized
*      404:
*        description: not found 
*/

router.delete('/users/:id', deleteUser)

//updating user
/**
 * @swagger
 * /users/{id}:
 *  patch:
 *      summary: updating user
 *      tags: [Users]
 *      security:
 *      - {}
 *      - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/userId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Users'
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

router.patch('/users/:id', updateUser)

//get one user
/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Getting user by id
 *      tags: [Users]
 *      parameters:
 *            - name : id
 *              in : path
 *              schema:
 *                  type: string
 *              description: Id of specific id
 *              required: true
 *      responses:
 *          200: 
 *              description: specified user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Users'
 *          404: 
 *              $ref: '#/components/responses/404'
 */

router.get('/users/:id', getOneUser)
module.exports = router