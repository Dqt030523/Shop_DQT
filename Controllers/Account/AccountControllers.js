const Customer = require('../../Models/Auths/Customer')

const customerController = {
    getAllCustumer: async (req, res) => {
        try {
            const customer = await Customer.find()
            res.status(200).json(customer)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteCustomer: async (req, res) => {
        try {
          const customer = await Customer.findById(req.params.id);
          res.status(200).json('da xoa thanh cong');
        } catch (err) {
          res.status(500).json(err);
        }
    }
}


module.exports = customerController