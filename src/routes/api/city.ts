import express = require("express");
const router: express.Router = express.Router();
const City = require("../../models/City");
import { CityI } from "../../types/City";
import { Schema } from "mongoose";
import CitySchemaData from "../../models/City";
router.get("/test", (req, res) => res.send("Testing city route"));
router.post("/", async (req, res) => {
  const { name, country, picture }: CityI = req.body;
  const cityDB: CityI = await City.findOne({ name: name, country: country });
  console.log("cityDB", cityDB);
  if (cityDB === null) {
    const newCity: CitySchemaData = new City({
      name: name,
      country: country,
      picture: picture
    });
    try {
      const savedCity = await newCity.save();
      console.log("savedCity", savedCity);
      res.json(savedCity);
    } catch (error) {
      console.log("error", error);
    }
  } else {
    res.json({ error: "This city already exists in the DB" });
  }
});
module.exports = router;
