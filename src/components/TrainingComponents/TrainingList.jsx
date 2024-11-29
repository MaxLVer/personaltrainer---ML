/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { AddTraining } from "./AddTraining";
import { DeleteTraining } from './DeleteTraining';

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'date',
            headerName: 'Date',
            valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm')
        },
        { field: 'duration', headerName: 'Duration (In minutes)' },
        { field: 'activity', headerName: 'Activity' },
        {
            field: 'customer',
            headerName: 'Customer',
            valueGetter: params => `${params.data.customer.firstname} ${params.data.customer.lastname}`
        }, //valueFormatter wouldn't work
        {
            field: 'id',
            headerName: '',
            sortable: false,
            filter: false,
            cellRenderer: params => (
                <DeleteTraining
                    trainingId={params.data.id}
                    onConfirm={fetchTrainings}
                />
            )
        }
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true,
    };
    //Took way too long to figure out I had left the data._embedded in the setTrainings...
    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
            const data = await response.json();
            setTrainings(data);
            setLoading(false);
        } catch (e) {
            console.error('Failed to fetch trainings. Check the log: ', e);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="TrainingList">
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                <AddTraining onAdd={fetchTrainings} />
            </div>
            <div className="ag-theme-material" style={{ width: "100%", height: 800 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                />
            </div>
        </div>
    );
}
