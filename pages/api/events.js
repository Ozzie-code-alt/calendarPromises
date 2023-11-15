// pages/api/events.js
import { connectMongo } from '../../utils/connectMongoDB'; // connect mongo here
import Event from '../../models/Event';
import moment from 'moment';

export default async function handler(req, res) {
    console.log("Connecting to MOngo")
  await connectMongo();
  console.log("COnnected to mongo")

  if (req.method === 'POST') {
    // Handle POST request
    const event = new Event(req.body);
    await event.save();
    res.status(201).end();
  } else if (req.method === 'GET') {
    // Handle GET request
    const events = await Event.find({
      start: { $gte: moment(req.query.start).toDate() },
      end: { $lte: moment(req.query.end).toDate() },
    });
    res.status(200).json(events);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
