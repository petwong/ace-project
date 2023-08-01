const app = require('express')
const router = app.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Smartphone:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: id
 *         brand:
 *           type: string
 *           description: brand
 *         model:
 *           type: string
 *           description: Model
 *         sold:
 *           type: boolean
 *           description: Unit sold
 *       example:
 *         id: 1
 *         brand: Apple
 *         model: iPhone 14
 *         sold: 5000
 *     Filter:
 *       type: object
 *       properties:
 *         filter:
 *           type: string
 *           description: filter value
 *     Filters:
 *       type: object
 *       properties:
 *         filters:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Filter'
 */


/**
 * @swagger
 * /api/v1/smartphones:
 *  get:
 *    description: get all smartphones
 *    responses:
 *      200:
 *        description: The list of the smartphones
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Smartphone'
 */
router.get('/', (req, res) => {
  if (!req.accepts('application/json')) {
    res.status(406).send('Not Acceptable')
  }

  let data = {
    smartphones: [
      { id: 1, brand: 'Samsung', model: 'S23', sold: 5000, os: 'Android' },
      { id: 2, brand: 'Samsung', model: 'S23 Plus', sold: 2000, os: 'Android' },
      { id: 3, brand: 'Samsung', model: 'S23 Ultra', sold: 10000, os: 'Android' },
      { id: 4, brand: 'Apple', model: 'iPhone 14', sold: 20000, os: 'iOS' },
      { id: 5, brand: 'Apple', model: 'iPhone 14 Plus', sold: 5000, os: 'iOS' },
      { id: 6, brand: 'Apple', model: 'iPhone 14 Pro', sold: 10000, os: 'iOS' },
      { id: 7, brand: 'Apple', model: 'iPhone 14 Pro Max', sold: 40000, os: 'iOS' },
      { id: 8, brand: 'Google', model: 'Pixel 7', sold: 600, os: 'Android' },
      { id: 9, brand: 'Google', model: 'Pixel 7 Pro', sold: 1000, os: 'Android' }
    ]
  }

  res.send(data)
})


/**
 * @swagger
 * /api/v1/smartphones/filters:
 *  post:
 *    description: The list of the smartphones with filters
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Filters'
 *    responses:
 *      200:
 *        description: The list of the filtered smartphones
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Smartphone'
 */
router.post('/filters', (req, res) => {
  if (!req.accepts('application/json')) {
    res.status(406).send('Not Acceptable')
  }

  let smartphones = [
    { id: 1, brand: 'Samsung', model: 'S23', sold: 5000, os: 'Android' },
    { id: 2, brand: 'Samsung', model: 'S23 Plus', sold: 2000, os: 'Android' },
    { id: 3, brand: 'Samsung', model: 'S23 Ultra', sold: 10000, os: 'Android' },
    { id: 4, brand: 'Apple', model: 'iPhone 14', sold: 20000, os: 'iOS' },
    { id: 5, brand: 'Apple', model: 'iPhone 14 Plus', sold: 5000, os: 'iOS' },
    { id: 6, brand: 'Apple', model: 'iPhone 14 Pro', sold: 10000, os: 'iOS' },
    { id: 7, brand: 'Apple', model: 'iPhone 14 Pro Max', sold: 40000, os: 'iOS' },
    { id: 8, brand: 'Google', model: 'Pixel 7', sold: 600, os: 'Android' },
    { id: 9, brand: 'Google', model: 'Pixel 7 Pro', sold: 1000, os: 'Android' }
  ]

  req.body.filters.forEach(el => {
    let expression = new RegExp('^' + el.filter)

    smartphones = smartphones.filter(smartphone => {
      return expression.test(smartphone.brand)
    })
  })

  res.send({ 'smartphones': smartphones })
})

module.exports = router
