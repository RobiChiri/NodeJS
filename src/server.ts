import express from "express";

const router = express.Router();

let planets: { id: number; name: string }[] = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

router.get("/api/planets", (req, res) => {
  res.json(planets);
});

router.get("/api/planets/:id", (req, res) => {
  const planet = planets.find(
    (planet) => planet.id === parseInt(req.params.id)
  );
  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }
  res.json(planet);
});

router.post("/api/planets", (req, res) => {
  const newPlanet = {
    id: planets.length + 1,
    name: req.body.name,
  };
  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created" });
});

router.put("/api/planets/:id", (req, res) => {
  const planet = planets.find(
    (planet) => planet.id === parseInt(req.params.id)
  );
  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }
  planet.name = req.body.name;
  res.json({ msg: "Planet updated" });
});

router.delete("/api/planets/:id", (req, res) => {
  const planet = planets.find(
    (planet) => planet.id === parseInt(req.params.id)
  );
  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }
  const index = planets.indexOf(planet);
  planets.splice(index, 1);
  res.json({ msg: "Planet deleted" });
});
