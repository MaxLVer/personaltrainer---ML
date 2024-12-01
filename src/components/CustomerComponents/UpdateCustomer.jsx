import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, } from "@mui/material";
import { useState } from "react";

export const EditCustomer = ({ updateCustomer, currentCustomer }) => {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState(currentCustomer);

    const url = currentCustomer._links.self.href;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        console.log(customer);
        updateCustomer(url, customer); 
        setOpen(false);
    };


    return (
        <>
            <Button onClick={handleOpen} variant="outlined" color="primary" >
                Edit
            </Button> {/*Renders button for modular use */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit an existing customer&apos;s information
                    </DialogContentText>
                    <TextField
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
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="success">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
