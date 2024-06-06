import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SportAgenda() {
  const { sport } = useParams();
  const [events, setEvents] = useState([]);
  const [image, setImage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios.get(`/sports/${sport}/events`)
      .then(response => {
        const groupedEvents = groupEventsBySiteAndDate(response.data.événements);
        setEvents(groupedEvents);
        setImage(response.data.image);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des événements:', error);
      });
  }, [sport]);

  const groupEventsBySiteAndDate = (events) => {
    const grouped = {};

    events.forEach(event => {
      if (!grouped[event.site]) {
        grouped[event.site] = {};
      }
      const dateStr = new Date(event.date).toLocaleDateString();
      if (!grouped[event.site][dateStr]) {
        grouped[event.site][dateStr] = [];
      }
      grouped[event.site][dateStr].push({
        heure: event.heure,
        description: event.description
      });
    });

    return grouped;
  };

  const filteredEvents = selectedDate
    ? Object.keys(events).reduce((acc, site) => {
      const siteEvents = events[site];
      const filteredDates = Object.keys(siteEvents).filter(date => {
        const eventDate = new Date(date);
        return eventDate.toLocaleDateString() === selectedDate.toLocaleDateString();
      });
      if (filteredDates.length > 0) {
        acc[site] = filteredDates.reduce((dateAcc, date) => {
          dateAcc[date] = siteEvents[date];
          return dateAcc;
        }, {});
      }
      return acc;
    }, {})
    : events;

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Agenda pour {sport}</h1>
      {image && (

        <div className="flex justify-center items-center w-4/5 h-[600px] bg-gray-300 overflow-hidden mx-auto mb-8">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex justify-center mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="p-2 border rounded"
          placeholderText="Sélectionnez une date"
          isClearable
        />
      </div>
      {Object.keys(filteredEvents).length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-r">Site</th>
              <th className="py-2 px-4 border-b border-r">Dates</th>
              <th className="py-2 px-4 border-b">Heures et Descriptions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(filteredEvents).map((site, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-r align-top">{site}</td>
                <td className="py-2 px-4 border-b border-r align-top">
                  {Object.keys(filteredEvents[site]).map(date => (
                    <div key={date} className="mb-2">
                      <div className="font-semibold">{date}</div>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b align-top">
                  {Object.keys(filteredEvents[site]).map(date => (
                    <div key={date} className="mb-2">
                      <ul>
                        {filteredEvents[site][date].map((event, idx) => (
                          <li key={idx}>
                            <span className="font-semibold">{event.heure}</span>: {event.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun événement disponible</p>
      )}
    </div>
  );
}