import { Schema, model, models} from "mongoose"


const EventSchema = new Schema({
    start: Date,
    end: Date,
    title: String
})

const Event = models.Event || model("Event", EventSchema)

export default Event
