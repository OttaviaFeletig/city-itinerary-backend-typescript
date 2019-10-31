import express = require("express");
const router: express.Router = express.Router();
const City = require("../../models/City");
import { CityI } from "../../types/City";
import CitySchemaData from "../../models/City";
import { Long } from "bson";
import { Dictionary } from "express-serve-static-core";
router.get("/test", (req, res) => res.send("Testing city route"));
router.post("/", async (req, res) => {
  const { name, country, picture }: CityI = req.body;
  try {
    const cityDB: CityI = await City.findOne({ name: name, country: country });
    if (cityDB) {
      res.status(409).send("Conflict: City Already In DB");
    } else {
      const newCity: CitySchemaData = new City({
        name: name,
        country: country,
        picture: picture
      });
      try {
        const savedCity = await newCity.save();
        res.status(200).send(savedCity);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const cities: Array<CityI> = await City.find({});
    res.status(200).send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id }: Dictionary<string> = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const city: CityI = await City.findById(id);
      console.log("city", city);
      if (!city) {
        res.status(400).send("City Not Found");
      } else {
        res.status(200).send(city);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(404).send("ID Not Valid");
  }
});
module.exports = router;
