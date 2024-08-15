const express = require("express");
const router = express.Router();
require("dotenv").config();

const middleware = require("../middleware/index");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

// Route to fetch products
router.post("/get_products", middleware, async (req, res) => {
  const { companyName, category, minPrice, maxPrice, n } = req.body;
  
  if (
    !companyName ||
    !category ||
    isNaN(minPrice) ||
    isNaN(maxPrice) ||
    isNaN(n)
  ) {
    return res.status(400).send("Invalid request data");
  }

  const productsPerPage = parseInt(n, 10);
  const url = `http://20.244.56.144/test/companies/${encodeURIComponent(
    companyName
  )}/categories/${encodeURIComponent(
    category
  )}/products?top=${productsPerPage}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.access_token}`,
      },
    });

    if (Array.isArray(response.data)) {
      response.data = response.data.map((item) => ({
        ...item,
        id: uuidv4(),
      }));
    } else if (typeof response.data === "object" && response.data !== null) {
      response.data.id = uuidv4();
    }

    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send(`Error: ${error.message}`);
  }
});

module.exports = router;
