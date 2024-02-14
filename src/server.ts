import express, { Request, Response } from "express";
import joi from "joi";

interface Planet {
  id: number;
  name: string;
}
const planets: Planet[] = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const planetSchema = joi.object({
  id: joi.number().integer().required(),
  name: joi.string().required(),
});

const app = express();

app.get("/api/planets", (req: Request, res: Response) => {
  res.json(planets);
});

app.get("/api/planets/:id", (req: Request, res: Response) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");
  res.json(planet);
});

app.post("/api/planets", (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const planet = {
    id: planets.length + 1,
    name: req.body.name,
  };
  planets.push(planet);
  res.status(201).json({ msg: "Planet created" });
});

app.put("/api/planets/:id", (req: Request, res: Response) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");

  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  planet.name = req.body.name;
  res.json({ msg: "Planet updated" });
});

app.delete("/api/planets/:id", (req: Request, res: Response) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found.");

  const index = planets.indexOf(planet);
  planets.splice(index, 1);
  res.json({ msg: "Planet deleted" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
