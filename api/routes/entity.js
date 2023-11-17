const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { use } = require("passport");

// call prisma client
const prisma = new PrismaClient();

// get all entities
router.get("/", (req, res) => {
  // find all entities in the database
  prisma.entity.findMany().then((entities) => {
    // response status 200 and return all entities
    /* 
            http code
            status 200: OK
            status 400: Bad Request
            status 401: Unauthorized
            status 404: Not Found
            status 500: Internal Server Error
        */
    res.status(200).json({ entities: entities });
  });
});

// create an entity
router.post("/create", (req, res) => {
  //   if the user is logged in
  if (!req.user) {
    // response status 401 and return message
    res.status(401).json({ message: "Unauthorized" });
  } else {
    // if the user is not an admin
    if (req.user.Role !== "ADMIN") {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      // if the user is an admin
      // create an entity
      prisma.entity
        .create({
          data: {
            Name: req.body.name,
            Description: req.body.description,
            image: req.body.image,
          },
        })
        .then((entity) => {
          // response status 200 and return message
          res.status(200).json({
            message: "Entity created",
            entity: {
              EntityId: entity.EntityId,
              name: entity.Name,
              description: entity.EntityDescription,
              image: entity.image,
            },
          });
        })
        .catch((err) => {
          // response status 500 and return message
          res.status(500).json({ message: "Internal Server Error", err: err });
        });
    }
  }
});

// get an entity by id
router.get("/:id", (req, res) => {
  // get id from url
  const id = req.params.id;

  // find entity by id
  prisma.entity
    .findUnique({
      where: {
        EntityId: parseInt(id),
      },
    })
    .then((entity) => {
      // response status 200 and return entity
      res.status(200).json({ entity: entity });
    });
});

// update an entity by id
router.put("/:id", (req, res) => {
  // get id from url
  const id = req.params.id;

  // if the user is logged in
  if (!req.user) {
    // response status 401 and return message
    res.status(401).json({ message: "Unauthorized" });
  } else {
    // if the user is not an admin
    if (req.user.Role !== "ADMIN") {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      // if the user is an admin
      // update an entity
      prisma.entity
        .update({
          where: {
            EntityId: parseInt(id),
          },
          data: {
            EntityName: req.body.EntityName,
            EntityDescription: req.body.EntityDescription,
            image: req.body.image,
          },
        })
        .then((entity) => {
          // response status 200 and return message
          res.status(200).json({ message: "Entity updated", entity: entity });
        })
        .catch((err) => {
          // response status 500 and return message
          res.status(500).json({ message: "Internal Server Error", err: err });
        });
    }
  }
});

// delete an entity by id
router.delete("/:id", (req, res) => {
  // get id from url
  const id = req.params.id;

  // if the user is logged in
  if (!req.user) {
    // response status 401 and return message
    res.status(401).json({ message: "Unauthorized" });
  } else {
    // if the user is not an admin
    if (req.user.Role !== "ADMIN") {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      // if the user is an admin
      // delete an entity
      prisma.entity
        .delete({
          where: {
            EntityId: parseInt(id),
          },
        })
        .then((entity) => {
          // response status 200 and return message
          res.status(200).json({ message: "Entity deleted", entity: entity });
        })
        .catch((err) => {
          // response status 500 and return message
          res.status(500).json({ message: "Internal Server Error", err: err });
        });
    }
  }
});

module.exports = router;
