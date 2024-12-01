import { Button, Box } from  '@mui/material';
import { useState } from 'react';

export const ExportCSV = ({ fileName }) => {

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
            const data = await response.json();
            setCustomers(data._embedded.customers);
        } catch (e) {
            console.error('Failed to fetch customers. Check the log: ', e);
        }
    };

  const downloadCSV = () => {
    fetchCustomers();
    const csvString = [
      ["First Name", "Last Name", "Email", "Phone", "Street Address", "Postal Code", "City"],
      ...customers.map(customer => [
        customer.firstname,
        customer.lastname,
        customer.email,
        customer.phone,
        customer.streetaddress,
        customer.postcode,
        customer.city,            
      ])
    ]
      .map(row => row.map(value => `"${value}"`).join(", ")) 
      .join("\n");

  
    const blob = new Blob([csvString], { type: 'text/csv' });

    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'Customer_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Sources used: https://dev.to/graciesharma/implementing-csv-data-export-in-react-without-external-libraries-3030, https://medium.com/@gb.usmanumar/how-to-export-data-to-csv-json-in-react-js-ea45d940652a

  return (
    <Box sx={{ padding: '20px', display: 'flex', gap: '10px' }}>
      <Button variant="outlined" color="secondary" onClick={downloadCSV}>
        Export CSV
      </Button>
    </Box>
  );
};