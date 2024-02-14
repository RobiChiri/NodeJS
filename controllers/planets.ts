import express, { Request, Response } from "express";
import joi from "joi";

interface Planet {
  id: number;
  name: string;
}
let planets: Planet[] = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const planetSchema = joi.object({
  id: joi.number().integer().required(),
  name: joi.string().required(),
});

const getAll = (req: Request, res: Response) => {
  res.json(planets);
};

const getOneById = (req: Request, res: Response) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");
  res.json(planet);
};

const create = (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const planet = {
    id: planets.length + 1,
    name: req.body.name,
  };
  planets = [...planets, planet];
  res.status(201).json({ msg: "Planet created" });
};

const updateById = (req: Request, res: Response) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");

  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedPlanet = { ...planet, name: req.body.name };
  planets = planets.map((p) => (p.id === planet.id ? updatedPlanet : p));
  res.json({ msg: "Planet updated" });
};

const deleteById = (req: Request, res: Response) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found.");

  planets = planets.filter((p) => p.id !== planet.id);
  res.json({ msg: "Planet deleted" });
};
export { getAll, getOneById, create, updateById, deleteById };
