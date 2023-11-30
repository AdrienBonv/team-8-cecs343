const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// get all ratings
router.get("/", (req, res) => {
  // find all ratings stored in the database
  prisma.rating.findMany().then((ratings) => {
    // repsonse status 200 and return all ratings
    /*
        http code
        status 200: OK
        status 400: Bad Request
        status 401: Unauthorized
        status 404: Not Found
        status 500: Internal Server Error
    */
    res.status(200).json({ ratings: ratings });
  });
});

// create rating
router.post("/create", (req, res) => {
  // if the user is logged in
  if (!req.user) {
    // response status 401 and return message
    res.status(401).json({ message: "Unauthorized" });
  } else {
    prisma.rating
      .create({
        data: {
          EntityId: req.body.EntityId,
          UserId: req.user.UserAccountId,
          Rating: req.body.Rating,
        },
      })
      .then((rating) => {
        res.status(200).json({
          message: "Rating created",
          rating: {
            RatingId: rating.RatingId,
            rating: rating.Rating,
            EntityId: rating.EntityId,
            UserId: rating.UserId,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error", err: err });
      });
  }
});

// update rating
router.put("/update", (req, res) => {
  if (!req.user) {
    // response status 401 and return message
    res.status(401).json({ message: "Unauthorized" });
  } else {
    prisma.rating
      .update({
        where: {
          RatingId: req.body.ratingId,
        },
        data: {
          Rating: req.body.rating,
        },
      })
      .then((rating) => {
        // response status 200 and return message
        res.status(200).json({
          message: "Rating updated",
          rating: {
            RatingId: rating.RatingId,
            rating: rating.Rating,
            EntityId: rating.EntityId,
            UserId: rating.UserId,
          },
        });
      })
      .catch((err) => {
        // response status 500 and return message
        res.status(500).json({ message: "Internal Server Error", err: err });
      });
  }
});

// find rating by entity id
router.get("/entity/:id", (req, res) => {
  // get id from url
  const id = req.params.id;

  // find rating by entity id
  prisma.rating
    .findMany({
      where: {
        EntityId: parseInt(id),
      },
    })
    .then((ratings) => {
      if (ratings.length === 0) {
        // response status 404 and return message
        res.status(404).json({ message: "Not Found" });
      } else {
        // average rating
        const average =
          ratings.reduce((a, b) => a + b.Rating, 0) / ratings.length;

        // response status 200 and return ratings
        res.status(200).json({ ratings: average });
      }
    })
    .catch((err) => {
      // response status 500 and return message
      res.status(500).json({ message: "Internal Server Error", err: err });
    });
});

// find rating by user id
router.get("/user/:id", (req, res) => {
  if (!req.user) {
    // response status 401 and return message
    res.status(401).json({ message: "Unauthorized" });
  } else {
    // if the user is not an admin or the user id does not match the user id in the url
    if (
      req.user.Role !== "ADMIN" ||
      req.user.UserAccountId !== parseInt(req.params.id)
    ) {
      // response status 401 and return message
      res.status(401).json({ message: "Unauthorized" });
    } else {
      prisma.rating
        .findMany({
          where: {
            UserId: parseInt(req.params.id),
          },
        })
        .then((ratings) => {
          // response status 200 and return ratings
          res.status(200).json({ ratings: ratings });
        })
        .catch((err) => {
          // response status 500 and return message
          res.status(500).json({ message: "Internal Server Error", err: err });
        });
    }
  }
});

// delete rating
router.delete("/delete", (req, res) => {
  // if the user is logged in
  if (!req.user) {
    // response status 401 and return message
    res.status(401).json({ message: "Unauthorized" });
  } else {
    prisma.rating
      .delete({
        where: {
          RatingId: req.body.ratingId,
        },
      })
      .then((rating) => {
        // response status 200 and return message
        res.status(200).json({
          message: "Rating deleted",
          rating: {
            RatingId: rating.RatingId,
            rating: rating.Rating,
            EntityId: rating.EntityId,
            UserId: rating.UserId,
          },
        });
      })
      .catch((err) => {
        // response status 500 and return message
        res.status(500).json({ message: "Internal Server Error", err: err });
      });
  }
});

// average rating by entity id
router.get("/average/:id", (req, res) => {
  // get id from url
  const id = req.params.id;

  // find rating by entity id
  prisma.rating
    .findMany({
      where: {
        EntityId: parseInt(id),
      },
    })
    .then((ratings) => {
      console.log(ratings);
      if (ratings.length === 0) {
        // response status 404 and return message
        res.status(404).json({ message: "Not Found" });
      } else {
        // response status 200 and return ratings
        res.status(200).json({
          ratings: {
            average: ratings.reduce((a, b) => a + b, 0) / ratings.length,
            ratings: ratings,
          },
        });
      }
    })
    .catch((err) => {
      // response status 500 and return message
      res.status(500).json({ message: "Internal Server Error", err: err });
    });
});

// export router
module.exports = router;
