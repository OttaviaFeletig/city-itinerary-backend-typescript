import express = require("express");
const router: express.Router = express.Router();
const Event = require("../../models/Event");
const City = require("../../models/City");
import { EventI, LocationI } from "../../types/Event";
import { CityI } from "../../types/City";
import EventSchemaData from "../../models/Event";
import CitySchemaData from "../../models/City";
import { Dictionary } from "express-serve-static-core";

async function createEvent(
  savedCity: CitySchemaData | CityI,
  name: string,
  picture: string,
  description: string,
  place: LocationI,
  date: Date,
  duration: number,
  cost: number,
  category: string
) {
  const newEvent: EventSchemaData = new Event({
    name: name,
    city: savedCity,
    picture: picture,
    description: description,
    place: place,
    date: date,
    duration: duration,
    cost: cost,
    category: category
  });
  try {
    const savedEvent = await newEvent.save();
    return {
      status: "ok",
      result: savedEvent
    };
    // res.status(200).send(savedEvent)
  } catch (error) {
    return {
      status: "error",
      result: error
    };
    // res.status(500).send(error);
  }
}
// POST NEW EVENT
router.post("/", async (req, res) => {
  const {
    name,
    city,
    picture,
    description,
    place,
    date,
    duration,
    cost,
    category
  }: EventI = req.body;

  console.log("req.body", req.body);
  try {
    const cityDB: CityI = await City.findOne({
      name: city.name,
      country: city.country
    });
    if (!cityDB) {
      // console.log("picture", picture);
      console.log("creating new city");
      const newCity: CitySchemaData = new City({
        name: city.name,
        country: city.country
        // picture: picture
      });
      try {
        const savedCity = await newCity.save();
        const result = await createEvent(
          savedCity,
          name,
          picture,
          description,
          place,
          date,
          duration,
          cost,
          category
        );
        if (result.status === "ok") {
          console.log("event saved in DB");
          res.status(200).send(result.result);
        } else {
          console.log("event error");
          res.status(500).json({ "Event could not be created": result.result });
        }
      } catch (error) {
        console.log("city error");
        res.status(500).json({ "City could not be created": error });
      }
    } else {
      try {
        const result = await createEvent(
          cityDB,
          name,
          picture,
          description,
          place,
          date,
          duration,
          cost,
          category
        );
        if (result.status === "ok") {
          res.status(200).send(result.result);
        } else {
          res.status(500).json({ "Event could not be created": result.result });
        }
      } catch (error) {
        res.status(500).json({ Error: error });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// // GET ALL CITIES
// router.get("/", async (req, res) => {
//     try {
//         const cities: Array<CityI> = await City.find({});
//         res.status(200).send(cities);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });
// // GET SPECIFIC CITY
// router.get("/:id", async (req, res) => {
//     const { id }: Dictionary<string> = req.params;
//     if (id.match(/^[0-9a-fA-F]{24}$/)) {
//         try {
//             const city: CityI = await City.findById(id);
//             console.log("city", city);
//             if (!city) {
//                 res.status(400).send("City Not Found");
//             } else {
//                 res.status(200).send(city);
//             }
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     } else {
//         res.status(400).send("ID Not Valid");
//     }
// });
// // UPDATE CITY
// router.patch("/:id", async (req, res) => {
//     const { id }: Dictionary<string> = req.params;
//     const city: CityI = req.body;
//     if (id.match(/^[0-9a-fA-F]{24}$/)) {
//         try {
//             const updatedCity: CityI = await City.findByIdAndUpdate(id, city, {
//                 new: true,
//                 runValidators: true
//             });
//             if (!updatedCity) {
//                 res.status(400).send("City Not Found");
//             } else {
//                 res.status(200).send(updatedCity);
//             }
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     } else {
//         res.status(400).send("ID Not Valid");
//     }
// });
// //DELETE CITY
// router.delete("/:id", async (req, res) => {
//     const { id }: Dictionary<string> = req.params;
//     if (id.match(/^[0-9a-fA-F]{24}$/)) {
//         try {
//             const deletedCity: CityI = await City.findByIdAndDelete(id);
//             if (!deletedCity) {
//                 res.status(400).send("City Not Found");
//             } else {
//                 res.status(200).send(deletedCity);
//             }
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     } else {
//         res.status(400).send("ID Not Valid");
//     }
// });
module.exports = router;
