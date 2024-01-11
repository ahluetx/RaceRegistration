import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import './EventCalendarPage.css'; // Assume you have a CSS file for styling

const EventCalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchEvents();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'eventDate', // accessor is the "key" in the data
        // You can format the date here if necessary
      },
      {
        Header: 'Event Name',
        accessor: 'eventName'
      },
      {
        Header: 'Location',
        accessor: 'location'
      },
      {
        Header: 'Distance',
        accessor: d => d.distances.map(distance => distance.distance).join(', ')
      },
      // Add more columns as needed
    ],
    []
  );

  const data = useMemo(() => events, [events]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="event-calendar-container">
      <h1>Race Events Calendar</h1>
      <table {...getTableProps()} className="event-calendar-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EventCalendarPage;
