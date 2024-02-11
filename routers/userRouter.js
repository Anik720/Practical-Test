/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *     
 */
/**
 * @swagger
 * tags:
 *   name: Signup
 *   description: Signing and Logging new users
 * /api/register:
 *   post:
 *     summary: sign up new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *   name: Login
 *   description: Logging users
 * /api/login:
 *   post:
 *     summary: Logging users
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 */














const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

// router.use(protect); //  protect all router which are comming after this middleware

router
  .route('/me')
  .get(userController.getMe, userController.getUser)
  .patch(userController.getMe, userController.updateUser);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(restrictTo('admin'), userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(restrictTo('admin'), userController.deleteUser);

module.exports = router;
