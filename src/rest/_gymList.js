const Joi = require("joi");
const Router = require("@koa/router");

const transactionService = require("../service/transaction");

const validate = require("./_validation.js");

/**
 * @openapi
 * tags:
 *   name: Transactions
 *   description: Represents a deposit of withdrawel of a user's budget
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Transaction:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - amount
 *             - date
 *             - user
 *             - place
 *           properties:
 *             name:
 *               type: "string"
 *             date:
 *               type: "string"
 *               format: date-time
 *             place:
 *               $ref: "#/components/schemas/Place"
 *             user:
 *               $ref: "#/components/schemas/User"
 *           example:
 *             $ref: "#/components/examples/Transaction"
 *     TransactionsList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - items
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Transaction"
 *   examples:
 *     Transaction:
 *       id: 123
 *       amount: 3000
 *       date: "2021-05-28T14:27:32.534Z"
 *       place:
 *         $ref: "#/components/examples/Place"
 *       user:
 *         $ref: "#/components/examples/User"
 *   requestBodies:
 *     Transaction:
 *       description: The transaction info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 101
 *               date:
 *                 type: string
 *                 format: "date-time"
 *               placeId:
 *                 type: integer
 *                 format: int32
 *               user:
 *                 type: string
 */

/**
 * @openapi
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags:
 *      - Transactions
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TransactionsList"
 */
const getAllTransactions = async (ctx) => {
  ctx.body = await transactionService.getAll();
};
getAllTransactions.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and("limit", "offset"),
};

/**
 * @openapi
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     description: Creates a new transaction for the signed in user.
 *     tags:
 *      - Transactions
 *     requestBody:
 *       $ref: "#/components/requestBodies/Transaction"
 *     responses:
 *       200:
 *         description: The created transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No place with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */
const createTransaction = async (ctx) => {
  const newTransaction = await transactionService.create({
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
  ctx.body = newTransaction;
  ctx.status = 201;
};
createTransaction.validationScheme = {
  body: {
    amount: Joi.number().invalid(0),
    date: Joi.date().iso().less("now"),
    placeId: Joi.number().integer().positive(),
    user: Joi.string(),
  },
};

/**
 * @openapi
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a single transaction
 *     tags:
 *      - Transactions
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
 *       404:
 *         description: No transaction with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */
const getTransactionById = async (ctx) => {
  ctx.body = await transactionService.getById(ctx.params.id);
};
getTransactionById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/**
 * @openapi
 * /api/transactions/{id}:
 *   put:
 *     summary: Update an existing transaction
 *     tags:
 *      - Transactions
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Transaction"
 *     responses:
 *       200:
 *         description: The updated transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No transaction/place with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */
const updateTransaction = async (ctx) => {
  ctx.body = await transactionService.updateById(ctx.params.id, {
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
};
updateTransaction.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    amount: Joi.number().invalid(0),
    date: Joi.date().iso().less("now"),
    placeId: Joi.number().integer().positive(),
    user: Joi.string(),
  },
};

/**
 * @openapi
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags:
 *      - Transactions
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No response, the delete was successful
 *       404:
 *         description: No transaction with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */
const deleteTransaction = async (ctx) => {
  await transactionService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteTransaction.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/transactions",
  });

  router.get(
    "/",
    validate(getAllTransactions.validationScheme),
    getAllTransactions
  );
  router.post(
    "/",
    validate(createTransaction.validationScheme),
    createTransaction
  );
  router.get(
    "/:id",
    validate(getTransactionById.validationScheme),
    getTransactionById
  );
  router.put(
    "/:id",
    validate(updateTransaction.validationScheme),
    updateTransaction
  );
  router.delete(
    "/:id",
    validate(deleteTransaction.validationScheme),
    deleteTransaction
  );

  app.use(router.routes()).use(router.allowedMethods());
};
