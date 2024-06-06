const jwt = require('jsonwebtoken')
const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.MY_SECRET, (err, customer) => {
                if (err) {
                  return  res.status(403).json('token khong hoat dong')

                }
                req.customer = customer
                next()
            });
        } else {
            res.status(401).json('chua co ma token')
        }
    },
    verifyAdmin : (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.customer.id = req.params.id || req.customer.admin){
                next()
            } else {
                res.status(403).json('khong co quyen xoa')
            }
        })
    }
} 

module.exports = middlewareController