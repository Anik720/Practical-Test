/**
 * @swagger
 * components:
 *   schemas:
 *     Articles:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Article
 *         title:
 *           type: string
 *           description: The title of your Article
 *         description:
 *           type: string
 *           description: The article explanation
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The article was added
 *     
 */
/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: The Article managing API
 * /api/article:
 *   get:
 *     summary: Lists all the Articles
 *     tags: [Articles]
 *     security:
 *      - jwtAuth: []
 *     responses:
 *       200:
 *         description: The list of the Articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Articles'
 *   post:
 *     summary: Create a new Articles
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Articles'
 *     responses:
 *       200:
 *         description: The created Articles.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articles'
 *       500:
 *         description: Some server error
 * /api/article/{id}:
 *   get:
 *     summary: Get the Article by id
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Article id
 *     responses:
 *       200:
 *         description: The Article response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articles'
 *       404:
 *         description: The Articles was not found
 *   put:
 *    summary: Update the Article by the id
 *    tags: [Articles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Article id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Articles'
 *    responses:
 *      200:
 *        description: The Article was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Articles'
 *      404:
 *        description: The Article was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Article by id
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Article id
 *
 *     responses:
 *       200:
 *         description: The Article was deleted
 *       404:
 *         description: The Article was not found
 */













const express = require("express");

const router = express.Router();

const articleController = require("../controllers/articleController");

const authController = require('../controllers/authController');
const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');


 

router
  .route("/")
  .get (protect,restrictTo("admin","user") ,articleController.getAllArticle)
  .post(articleController.careteArticle);

router
  .route("/:id")
  .get(articleController.getArticle)
  .patch(articleController.updateArticle)
  .delete(articleController.deleteArticle);
module.exports = router;
