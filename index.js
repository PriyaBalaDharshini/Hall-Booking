//1 need express for creating a server
const express = require("express");
const bodyParser = require("body-parser");

//2 stroing the method
const app = express();

app.use(bodyParser.json()); //bodyParser receives data as a object.
const PORT = 8000;

// Temporary data storage for room details and bookings
const rooms = [
    { roomID: 1, roomName: "A" },
    { roomID: 2, roomName: "B" }
];

const bookings = [];

//1. creating room

app.post("/api/room-details", (req, res) => {
    const { availableSeats, amenities, price } = req.body;
    const roomDetails = {
        roomID: rooms.length + 1,
        availableSeats,
        amenities,
        price,
    }
    rooms.push(roomDetails)
    res.send(roomDetails).status(200);
})

//2. Booking room
app.post("/api/book-room", (req, res) => {
    const { name, date, startTime, endTime, roomID } = req.body;
    if (!name || !date || !startTime || !endTime || !roomID) {
        return res.status(400).send("Invalid request. Please provide all required details.");
    }
    const bookingDetails = {
        name,
        date,
        startTime,
        endTime,
        roomID
    }
    bookings.push(bookingDetails)
    res.send(bookingDetails).status(200);
})

//3. List all rooms with booked data
app.get("/api/list-rooms-booked", (req, res) => {
    const roomList = rooms.map(room => {
        const booking = bookings.find(booking => booking.roomID === room.roomID);
        return {
            roomName: room.roomName,
            booked: Boolean(booking),
            customerName: booking ? booking.name : null,
            date: booking ? booking.date : null,
            startTime: booking ? booking.startTime : null,
            endTime: booking ? booking.endTime : null,
        };
    });
    res.status(200).send(roomList);
});

//4. List all customers with booked data
app.get("/api/list-customers", (req, res) => {
    const customerList = bookings.map(booking => {
        const room = rooms.find(room => room.roomID === booking.roomID);
        return {
            customerName: booking.name,
            roomName: room ? room.roomName : null,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
        };
    });
    res.status(200).send(customerList);
});


//3 making the app to listen in the given port
app.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`);
})



/* const rooms = [{
    "roomID": 1,
    "availableSeats": "40",
    "amenities": [
        "TV",
        "AC",
        "24 * 7 water supply"
    ],
    "price": "500"
}, {
    "roomID": 2,
    "availableSeats": "40",
    "amenities": [
        "TV",
        "AC",
        "24 * 7 water supply"
    ],
    "price": "500"
}]
app.get("/api/rooms", (req, res) => {
    res.send(rooms).status(200);
}) */