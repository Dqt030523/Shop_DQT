const nikeShoes = require('../../Models/Products/NikeShoes')

const productsController = {
    addProductController: async (req, res) => {
        try {
            const newShoes = await new nikeShoes({

                img: req.body.img
            //   type: req.body.type,
            //   color: req.body.color,
            //   size: req.body.size,
            //   cost: req.body.cost,
            //   quantity: req.body.quantity,
            //   code: `${req.body.type}-${req.body.color}-${req.body.size}-${req.body.cost}`,
            });
            const newNike = await newShoes.save()
            res.status(200).json(newNike)
        } catch (err) {
            return res.status(500).json('khong the them sp')
        }
    },
    updateProductController: async (req, res) => {
        try {
            const updateShoes = req.body
            const Shoes = await nikeShoes.findByIdAndUpdate({admin: true}, updateShoes, {new: true})
            res.status(200).json(Shoes)
        
        } catch (err) {
            return res.status(500).json("thay doi khong thanh cong")
        }
    }
}

module.exports = productsController
