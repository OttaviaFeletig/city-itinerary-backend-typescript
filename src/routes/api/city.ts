// import express = require("express");
// const router: express.Router = express.Router();
// const City = require("../../models/City");
// import { CityI } from "../../types/City";
// import CitySchemaData from "../../models/City";
// import { Dictionary } from "express-serve-static-core";
// // POST NEW CITY
// router.post("/", async (req, res) => {
//   const { name, country, picture }: CityI = req.body;
//   console.log("req.body", req.body);
//   try {
//     const cityDB: CityI = await City.findOne({ name: name, country: country });
//     if (cityDB) {
//       res.status(409).send("Conflict: City Already In DB");
//     } else {
//       console.log("picture", picture);
//       const newCity: CitySchemaData = new City({
//         name: name,
//         country: country,
//         picture: picture
//       });
//       try {
//         const savedCity = await newCity.save();
//         res.status(200).send(savedCity);
//       } catch (error) {
//         res.status(500).send(error);
//       }
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
// // GET ALL CITIES
// router.get("/", async (req, res) => {
//   try {
//     const cities: Array<CityI> = await City.find({});
//     res.status(200).send(cities);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
// // GET SPECIFIC CITY
// router.get("/:id", async (req, res) => {
//   const { id }: Dictionary<string> = req.params;
//   if (id.match(/^[0-9a-fA-F]{24}$/)) {
//     try {
//       const city: CityI = await City.findById(id);
//       console.log("city", city);
//       if (!city) {
//         res.status(400).send("City Not Found");
//       } else {
//         res.status(200).send(city);
//       }
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   } else {
//     res.status(400).send("ID Not Valid");
//   }
// });
// // UPDATE CITY
// router.patch("/:id", async (req, res) => {
//   const { id }: Dictionary<string> = req.params;
//   const city: CityI = req.body;
//   if (id.match(/^[0-9a-fA-F]{24}$/)) {
//     try {
//       const updatedCity: CityI = await City.findByIdAndUpdate(id, city, {
//         new: true,
//         runValidators: true
//       });
//       if (!updatedCity) {
//         res.status(400).send("City Not Found");
//       } else {
//         res.status(200).send(updatedCity);
//       }
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   } else {
//     res.status(400).send("ID Not Valid");
//   }
// });
// //DELETE CITY
// router.delete("/:id", async (req, res) => {
//   const { id }: Dictionary<string> = req.params;
//   if (id.match(/^[0-9a-fA-F]{24}$/)) {
//     try {
//       const deletedCity: CityI = await City.findByIdAndDelete(id);
//       if (!deletedCity) {
//         res.status(400).send("City Not Found");
//       } else {
//         res.status(200).send(deletedCity);
//       }
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   } else {
//     res.status(400).send("ID Not Valid");
//   }
// });
// module.exports = router;
