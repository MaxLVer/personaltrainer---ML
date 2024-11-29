import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteCustomer = ({ customerUrl, onConfirm }) => {
    const [deleteDialog, setDeleteDialog] = useState(false);

    const handleOpen = () => {
        setDeleteDialog(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialog(false);
    };

    const deleteResource = async (url) => {
        const options = {
            method: 'DELETE',
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Deletion failed');
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteResource(customerUrl); 
            onConfirm(); 
            handleDeleteClose(); 
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Button onClick={handleOpen} variant="outlined" color="error" endIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Dialog open={deleteDialog} onClose={handleDeleteClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this customer?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
