const db = require("../models");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

module.exports = (app) => {
    // GET all workouts
    app.get("/api/workouts", (req, res) => {
        console.log(req);
        db.Workout.find()
        .then(dbWorkouts => {
            console.log(dbWorkouts);
            res.json(dbWorkouts)
        })
        .catch(({ message }) => {
            console.log("Message: ", message)
        });
    });

    // GET range
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find()
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(({ message }) => {
            console.log("Message: ", message)
        });
    });

    // POST new workout
    app.post("/api/workouts", (body, res) => {
        // console.log("Request to add new workout in /api/workouts:", body);
        db.Workout.create(body)
        .then(dbWorkouts => {
            console.log("New workout added:", dbWorkouts);
            res.json(dbWorkouts);
        })
        .catch(({ message }) => {
            console.log("Error in POST /api/workouts: ", message)
        });
    });

    // UPDATE existing workout
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { exercises: req.body } },
            function(err, result) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    console.log("Updated dbWorkouts: ", result);
                    res.send(result);
                }
            }
        );
    });
};