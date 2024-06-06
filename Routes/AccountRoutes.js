const customerController = require('../Controllers/Account/AccountControllers')
const middlewareController = require('../Controllers/Middleware/MiddlewareControlller')

const router = require('express').Router()


router.get('/',middlewareController.verifyToken, customerController.getAllCustumer)

router.delete('/:id',middlewareController.verifyAdmin, customerController.deleteCustomer)


module.exports = router