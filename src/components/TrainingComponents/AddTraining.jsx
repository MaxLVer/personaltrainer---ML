import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export const AddTraining = ({ onAdd }) => {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [training, setTraining] = useState({
        //Memo: "The format must be ISO-8601 (e.g., "2024-11-27T09:12:00.000+000"
        date: dayjs().format("YYYY-MM-DDTHH:mm"),
        activity: '',
        duration: '',
        customer: ''
    });

    // Fetch customers to assign the training to specific people
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setCustomers(data._embedded.customers);
            } catch (e) {
                console.error(e);
            }
        };

        fetchCustomers();
    }, []);

    const handleChange = event => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTraining({
            //Resets everything within the dialog
            date: dayjs().format("YYYY-MM-DDTHH:mm"),
            activity: '',
            duration: '',
            customer: ''
        });
    };

    const handleAddTraining = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: training.date,
                    activity: training.activity,
                    duration: training.duration,
                    customer: training.customer,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add training');
            }
            const newTraining = await response.json();
            onAdd(newTraining);
            handleClose();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Box sx={{ padding: '20px' }}> {/* The same as AddCustomer, padding for button */}
                <Button variant="outlined" color="primary" onClick={handleOpen}>
                    Add Training
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training Session</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new training session, please input the required details.
                    </DialogContentText>
                    <TextField
                        required
                        id="date"
                        name="date"
                        label="Date"
                        type="datetime-local"
                        variant="standard"
                        value={dayjs(training.date).format("YYYY-MM-DDTHH:mm")}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="activity"
                        name="activity"
                        label="Activity"
                        type="text"
                        variant="standard"
                        value={training.activity}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="duration"
                        name="duration"
                        label="Duration (minutes)"
                        type="number"
                        variant="standard"
                        value={training.duration}
                        onChange={handleChange}
                    />
                    {/* This was by far the lengthiest part despite being so simple in the end.*/}
                    <InputLabel id="customer-name">Customer</InputLabel>
                    <Select
                        required
                        labelId="customer-name"
                        id="customer"
                        name="customer"
                        value={training.customer}
                        onChange={handleChange}
                        variant="standard"
                        fullWidth //To render the select as wide as the dialog-box is
                    >
                        {customers.map(customer => (
                            <MenuItem key={customer.id} value={customer._links.self.href}>
                                {customer.firstname} {customer.lastname}
                            </MenuItem>
                        ))}
                         {/*
                         Sources for use, could implement the conditional expression here:
                         https://mui.com/material-ui/react-select/
                         https://stackoverflow.com/questions/48599660/ternary-operator-inside-map
                         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
                         https://www.reddit.com/r/reactjs/comments/18p6czp/how_to_wrap_a_map_return_in_a_div_using/?rdt=64069
                         */}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddTraining} color="success">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
