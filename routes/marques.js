const { Hono } = require("hono");
const Marque = require("../models/marque");

const marqueRoutes = new Hono();

// Création d'une marque
marqueRoutes.post("/", async (c) => {
  try {
    const marque = new Marque(c.req.body);
    await marque.save();
    return c.json(marque, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

// Récupération de toutes les marques
marqueRoutes.get("/", async (c) => {
  try {
    const marques = await Marque.find();
    return c.json(marques);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Récupération d'une marque par ID
marqueRoutes.get("/:id", async (c) => {
  try {
    const marque = await Marque.findById(c.req.param("id"));
    if (!marque) {
      return c.json({ error: "Marque not found" }, 404);
    }
    return c.json(marque);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Mise à jour d'une marque
marqueRoutes.patch("/:id", async (c) => {
  try {
    const marque = await Marque.findByIdAndUpdate(
      c.req.param("id"),
      c.req.body,
      { new: true, runValidators: true }
    );
    if (!marque) {
      return c.json({ error: "Marque not found" }, 404);
    }
    return c.json(marque);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

// Suppression d'une marque
marqueRoutes.delete("/:id", async (c) => {
  try {
    const marque = await Marque.findByIdAndDelete(c.req.param("id"));
    if (!marque) {
      return c.json({ error: "Marque not found" }, 404);
    }
    return c.json(marque);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

module.exports = marqueRoutes;
