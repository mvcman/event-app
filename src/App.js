import React, { useState, useEffect } from 'react';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, TextField, FormControl, FormLabel } from '@material-ui/core';
import './App.css';
import ErrorPage from './Error/ErrorPage';
import Spinner from './Spinner/Spinner';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selected, setSelected] = useState();

  useEffect(() => {
    async function fetchEvents(){
        return fetch('http://localhost:3001/events')
        .then(data => data.json())
        .then((d) => setEvents(d))
        .catch((err) => { 
            console.log(err); setError(true)
        });
    }
    fetchEvents();
  }, []);

  const newEvent = () => {
    const event = {
        name: name,
        date: date,
        time: time
    }
    axios.post('http://localhost:3001/events/', event)
    .then((res) => res)
    .then((data) => { 
        console.log(data); 
        reset();
        setOpenA(false);
    })
    .catch(err => console.log(err));
  };

  const editEvent = () => {
    const event = {
        name: name,
        date: date,
        time: time
    }
    axios.put(`http://localhost:3001/events/${selected}`, event)
    .then((res) => res)
    .then((data) => { 
        console.log(data);
        reset();
        setOpenB(false);
    })
    .catch(err => console.log(err));
  };

  const reset = () => {
    setName('');
    setDate('');
    setTime('');
    setSelected();
  };

  const deleteEvent = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3001/events/${id}`)
    .then((d) => d.json())
    .then(data => data)
    .catch(err => err);
  };

  const handleEdit = (row) => {
      setSelected(row.id);
      setName(row.name);
      setDate(row.date);
      setTime(row.time);
      setOpenB(true);
  }

  const addEvent = () => {
      setOpenA(true);
  }

  if (error) {
    return <ErrorPage />;
  }
  if (events === null) {
    return <Spinner />;
  }
  return (
    <Grid container>
        <Modal open={openA} onClose={() => setOpenA(false)}>
            <Paper>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <FormLabel>Name:</FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} size="small" />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <FormLabel>Date:</FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField value={date} onChange={(e) => setDate(e.target.value)} size="small" />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <FormLabel>time:</FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField value={time} onChange={(e) => setTime(e.target.value) } size="small" />
                    </Grid>

                    <Button variant="contained" color="primary" onClick={() => newEvent()}>Submit</Button>
                </Grid>
            </Paper>
        </Modal>
        <Modal open={openB} onClose={() => setOpenB(false)}>
            <Paper>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <FormLabel>Name:</FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} size="small" />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <FormLabel>Date:</FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField value={date} onChange={(e) => setDate(e.target.value)} size="small" />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <FormLabel>time:</FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField value={time} onChange={(e) => setTime(e.target.value) } size="small" />
                    </Grid>

                    <Button variant="contained" color="primary" onClick={() => editEvent()}>Submit</Button>
                </Grid>
            </Paper>
        </Modal>
        
        <Paper style={{ width: '100%', height: '100%', padding: '10px 20px' }}>
        <Button variant="contained" color="primary" onClick={() => addEvent()}>Add Event</Button>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                #
                            </TableCell>
                            <TableCell align="left">
                                Event Name
                            </TableCell>
                            <TableCell align="left">
                                Date
                            </TableCell>
                            <TableCell align="left">
                                Time
                            </TableCell>
                            <TableCell align="left">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        events.map((event, i) => {
                            return (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                   {i + 1}
                                </TableCell>
                                <TableCell align="left">
                                    {event.name}
                                </TableCell>
                                <TableCell align="left">
                                    {event.date}
                                </TableCell>
                                <TableCell align="left">
                                    {event.time}
                                </TableCell>
                                <TableCell align="left">
                                    {
                                        <div>                                        <Button variant="contained" color="primary"
                                        onClick={() => handleEdit(event)}>Edit</Button>
                                        <Button variant="contained" color="primary"
                                        onClick={() => deleteEvent(event.id)}>Delete</Button>
                                        </div>

                                    }
                                </TableCell>
                            </TableRow>
                            )
                        })
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper> 
    </Grid>
  );
}

export default App;
