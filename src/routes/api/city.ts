import express = require("express");
const router: express.Router = express.Router();
const City = require("../../models/City");
import { CityI } from "../../types/City";
import CitySchemaData from "../../models/City";
router.get("/test", (req, res) => res.send("Testing city route"));
router.post("/", async (req, res) => {
  const { name, country, picture }: CityI = req.body;
  try {
    const cityDB: CityI = await City.findOne({ name: name, country: country });
    if (cityDB) {
      res.status(404).send("City Already In DB");
    } else {
      const newCity: CitySchemaData = new City({
        name: name,
        country: country,
        picture: picture
      });
      try {
        const savedCity = await newCity.save();
        res.send(savedCity);
      } catch (error) {
        res.send(error);
      }
    }
  } catch (error) {
    res.send(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const cities: Array<CityI> = await City.find({});
    res.send(cities);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
