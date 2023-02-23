import { Box, Typography } from '@mui/material';
export default function NotFoundRoute() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxHeight: '100vh',
            }}
        >
            <Box>
                <Typography variant="h2" style={{ color: 'black' }}>
                    404
                </Typography>
                <Typography variant="h5" style={{ color: 'black' }}>
                    Page Not Found
                </Typography>
            </Box>
        </Box>
    );
}
