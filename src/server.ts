import express from "express";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "../controllers/planets";

const app = express();

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
