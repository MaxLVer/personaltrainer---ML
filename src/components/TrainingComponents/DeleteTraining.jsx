import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteTraining = ({ trainingId, onConfirm }) => {
    const [deleteDialog, setDeleteDialog] = useState(false);

    const handleOpen = () => {
        setDeleteDialog(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialog(false);
    };

    const deleteResource = async (id) => {
        const url = `https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`; 
        //To fetch the /trainings rather than /gettrainings
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
            await deleteResource(trainingId);
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
                        Are you sure you want to delete this session?
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
