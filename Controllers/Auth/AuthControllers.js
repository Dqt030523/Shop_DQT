const bcrypt = require("bcrypt");
const Customer = require("../../Models/Auths/Customer");
const Admin = require("../../Models/Auths/Admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authController = {
  registerCustomer: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.pass, salt);

      const newCustomer = await new Customer({
        name: req.body.name,
        pass: hashed,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
      });

      const customer = await newCustomer.save();

      res.status(200).json(customer);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  generateAccessToken: (customer) => {
    return jwt.sign(
      {
        id: customer.id,
        admin: customer.admin,
      },
      process.env.MY_SECRET,
      {
        expiresIn: "20s",
      }
    );
  },
  generateRefreshToken: (customer) => {
    return jwt.sign(
      {
        id: customer.id,
        admin: customer.admin,
      },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "365d",
      }
    );
  },

  loginCustomer: async (req, res) => {
    try {
      const customer = await Customer.findOne({ name: req.body.name });

      if (!customer) {
        return res.status(404).json("khong tim thay tk");
      }

      const passhashed = await bcrypt.compare(req.body.pass, customer.pass);

      if (!passhashed) {
        return res.status(404).json("sai mk");
      }

      if (customer && passhashed) {
        const accessToken = authController.generateAccessToken(customer);
        const refreshToken = authController.generateRefreshToken(customer);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/",
          sameSite: "strict",
        });

        const { pass, ...other } = customer._doc;
        return res.status(200).json({ other, accessToken });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("chua co ma refreshtoken");
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, customer) => {
      if (err) {
      console.log(err)
      }
      const newAccessToken = authController.generateAccessToken(customer);
      const newRefreshToken = authController.generateRefreshToken(customer)

      return res.status(200).json({ accessToken: newAccessToken });
    });
  },

  logoutCustomer: async (req, res) => {
    res.clearCookie('refreshToken')
    res.status(200).json('da dang xuat')
  }
};

module.exports = authController;
