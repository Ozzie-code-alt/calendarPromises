import { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import moment from "moment";

const AddEvents = ({ isOpen, onClose, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (event) => {

    event.preventDefault();
    const startDate = moment(start).toDate()
    const endDate = moment(end).toDate()
    onEventAdded({
      title,
      start:startDate,
      end:endDate,
    });
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <label>Start Date</label>
            <Datetime value={start} onChange={(date) => setStart(date)} />
          </div>
          <div>
            <label>End Date</label>
            <Datetime value={end} onChange={(date) => setEnd(date)} />
          </div>

          <button> Add Event</button>
        </form>
      </Modal>
    </>
  );
};

export default AddEvents;
