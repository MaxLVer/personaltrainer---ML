import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AddCustomer } from './AddCustomer';
import { DeleteCustomer } from './DeleteCustomer';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'firstname', headerName: 'First Name' },
        { field: 'lastname', headerName: 'Last Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'streetaddress', headerName: 'Street Address' },
        { field: 'postcode', headerName: 'Postal Code' },
        { field: 'city', headerName: 'City' },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filter: false,
            cellRenderer: params => (
                <DeleteCustomer
                    customerUrl={params.data._links.self.href}
                    onConfirm={fetchCustomers}
                />
            )
        }
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true,
    };

    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
            const data = await response.json();
            setCustomers(data._embedded.customers);
        } catch (e) {
            console.error('Failed to fetch customers. Check the log:', e);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="CustomerList">
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                <AddCustomer onAdd={fetchCustomers} />
            </div>
            <div className="ag-theme-material" style={{ width: "100%", height: 800 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                />
            </div>
        </div>
    );
}
