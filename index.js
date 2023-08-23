import express from "express";

// use the SQL methods in the API routes below
import {joinQueue, leaveQueue, joinTaxiQueue, queueLength, taxiQueueLength, taxiDepart} from './taxi.sql.js';

const app = express();

app.use(express.static('public'))

// add middleware to make post routes work
app.use(express.json());

const PORT = process.env.PORT || 4015;

// passenger joins the queue
app.post('/api/passenger/join', async(req, res) => {

    const sql = await joinQueue()

    res.json({
        message : 'joined queue',
        sql

    });
})

// passenger leaves the queue
app.post('/api/passenger/leave', async(req, res) => {

    const sql = await leaveQueue()

    res.json({
        message : 'leave queue',
        sql
    })
});

app.post('/api/taxi/join', async(req, res) => {

    const sql = await joinTaxiQueue()
    
    res.json({
        message : 'leave queue',
        sql
    })
});

// Note there needs to be at least 12 people in the queue for the taxi to depart
app.post('/api/taxi/depart', async(req, res) => {

    const sql = await taxiDepart();

    res.json({
        message : 'taxi depart from queue',
        sql
    })
});

// return the number of people in the queue
app.get('/api/passenger/queue', async(req, res) => {
    //  return test the API call

    const sql = await queueLength();

    res.json({
        sql
    })
});

// return the number of taxis in the queue
app.get('/api/taxi/queue', async(req, res) => {

    const sql = await taxiQueueLength()

    res.json({
        sql
    })
});


app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))