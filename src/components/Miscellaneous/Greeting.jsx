import { Typography } from '@mui/material';

const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        return 'Good Morning';
    } else if (currentHour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
};

const TimelyGreeting = () => {
    return (
        <Typography variant="h3" sx={{ textAlign: 'center', margin: '10px 0' }}>
            {getGreeting()}!
        </Typography> // Typography for better control over the header
    );
};

// Extremely simple greeting function for the '/' Homepage.

export default TimelyGreeting;