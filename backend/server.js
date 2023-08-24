const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const dotenv = require("dotenv");
// env config
dotenv.config();
const pool = require('./config/db');

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Port
const PORT = process.env.PORT || 8081;
//middleware
app.use(cors());
app.use(express.json()); //req.body


app.get("/", (req, res) => {
  return res.send("Received a GET HTTP method");
});

app.get('/health', (req, res) =>
    res.json({ "ServerHealth": "Server is up and running!" })
  );

// get all orders
app.get('/orders', async (req, res) => {
    try {
      const allOrders = await pool.query('select po.id as pos_id, po.name as pos_name, po.pos_reference as pos_reference,po.amount_total as amount_total, po.partner_id as partner_id, rp.name as partner_name, pp.payment_method_id as payment_method_id,ppm.name as payment_method_name, pp.create_date as create_date  from pos_order po inner join pos_payment pp ON po.id = pp.pos_order_id inner join pos_payment_method ppm ON ppm.id = pp.payment_method_id left join res_partner rp ON po.partner_id = rp.id order by po.id asc');
      res.json(allOrders.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
// get a order
app.get('/orders/:name', async (req, res) => {
    try {
      const { name } = req.params;
      const order = await pool.query('select po.id as pos_id, po.name as pos_name, po.pos_reference as pos_reference,po.amount_total as amount_total, po.partner_id as partner_id, rp.name as partner_name, pp.payment_method_id as payment_method_id,ppm.name as payment_method_name, pp.create_date as create_date  from pos_order po inner join pos_payment pp ON po.id = pp.pos_order_id inner join pos_payment_method ppm ON ppm.id = pp.payment_method_id left join res_partner rp ON po.partner_id = rp.id where po.name = $1', [
        name,
      ]);
  
      res.json(order.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

app.listen(PORT, () => {
    console.log(`Server Running On ${process.env.DEV_MODE} Mode On Port ${PORT}`);
  });