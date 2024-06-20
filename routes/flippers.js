const { Hono } = require("hono");
const Flipper = require("../models/flipper");

const flipperRoutes = new Hono();

// Création d'un flipper
flipperRoutes.post("/", async (c) => {
  try {
    const flipper = new Flipper(c.req.body);
    await flipper.save();
    return c.json(flipper, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

// Récupération de tous les flippers
flipperRoutes.get("/", async (c) => {
  try {
    const flippers = await Flipper.find();
    return c.json(flippers);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Récupération d'un flipper par ID
flipperRoutes.get("/:id", async (c) => {
  try {
    const flipper = await Flipper.findById(c.req.param("id"));
    if (!flipper) {
      return c.json({ error: "Flipper not found" }, 404);
    }
    return c.json(flipper);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Mise à jour d'un flipper
flipperRoutes.patch("/:id", async (c) => {
  try {
    const flipper = await Flipper.findByIdAndUpdate(
      c.req.param("id"),
      c.req.body,
      { new: true, runValidators: true }
    );
    if (!flipper) {
      return c.json({ error: "Flipper not found" }, 404);
    }
    return c.json(flipper);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

// Suppression d'un flipper
flipperRoutes.delete("/:id", async (c) => {
  try {
    const flipper = await Flipper.findByIdAndDelete(c.req.param("id"));
    if (!flipper) {
      return c.json({ error: "Flipper not found" }, 404);
    }
    return c.json(flipper);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

module.exports = flipperRoutes;
