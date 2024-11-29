import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

export const AddCustomer = ({ onAdd }) => {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: '',
    });

    const handleChange = event => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCustomer({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            streetaddress: '',
            postcode: '',
            city: '',
        });
    };

    const handleAddCustomer = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            });
            if (!response.ok) {
                throw new Error('Failed to add customer');
            }
            const newCustomer = await response.json();
            onAdd(newCustomer);
            handleClose();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a customer, please input the required details.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        id="firstname"
                        name="firstname"
                        label="First Name"
                        type="text"
                        variant="standard"
                        value={customer.firstname}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="lastname"
                        name="lastname"
                        label="Last Name"
                        type="text"
                        variant="standard"
                        value={customer.lastname}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        variant="standard"
                        value={customer.email}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="text"
                        variant="standard"
                        value={customer.phone}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="streetaddress"
                        name="streetaddress"
                        label="Street Address"
                        type="text"
                        variant="standard"
                        value={customer.streetaddress}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="postcode"
                        name="postcode"
                        label="Postal Code"
                        type="text"
                        variant="standard"
                        value={customer.postcode}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        variant="standard"
                        value={customer.city}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddCustomer} color="success">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
