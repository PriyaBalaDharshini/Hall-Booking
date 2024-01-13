//1 need express for creating a server
const express = require("express");
const bodyParser = require("body-parser");

//2 stroing the method
const app = express();

app.use(bodyParser.json()); //bodyParser receives data as a object.
const PORT = 8000;

app.post("/api/room-details", (req, res) => {
    const roomDetails = {
        roomID: 1,
        availableSeats: req.body.availableSeats,//45
        amenities: req.body.amenities,//["TV","AC","24 * 7 water supply"]
        price: req.body.price,//400
    }

    /* const { availableSeats, amenities, price } = req.body;
    const roomDetails = {
        roomID: 1,
        availableSeats,
        amenities,
        price,
    } */
    res.send(roomDetails).status(200);
})

//3 making the app to listen in the given port
app.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`);
})