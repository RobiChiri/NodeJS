import { Request, Response } from "express";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://username:password@localhost:5432/dbname");

const startDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS planets;
        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL
        );
    `);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);

  const planets = await db.many(`SELECT * FROM planets`);
  console.log(planets);
};
startDb();

console.log(db);

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets`);
  res.status(200).json(planets);
};
const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(
    `SELECT * FROM planets WHERE id = $1`,
    Number(id)
  );
  res.status(200).json(planet);
};

const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newPlanet = { name };
  const planet = await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
  res.status(201).json({ msg: "the planet was created" });
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const planets = await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [
    id,
    name,
  ]);
  res.status(200).json({ msg: "the planet was updated" });
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planets = await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
  res.status(200).json({ msg: "the planet was deleted" });
};

export { getAll, getOneById, create, updateById, deleteById };
