import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TopBar from '../components/TopBar';
import SendChatBox from '../components/SendChatBox';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = React.useState('');

    const handleTest = () => {
        navigate('/contest');
    };

    return (
        <div>
            <TopBar />
            
            { /* Start Test Box */ }
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Box sx={{
                    width: {
                        xs: '90%',  // 90% width on extra-small screens (mobile)
                        sm: '80%',  // 80% width on small screens and up
                    },
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    p: 4,
                    boxShadow: 3,
                    textAlign: 'center',
                    margin: '5%'
                    }}>
                    <Typography variant="h6" component="strong" sx={{ fontWeight: 'bold' }}>
                        Challenge Yourself
                    </Typography>
                    <Typography variant="body1">
                        Assess your knowledge with
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ width: '60%', mt: 2 }} onClick={handleTest}>Start Test</Button>
                </Box>
            </Box>

            { /* Send chat message box. */ }
            <SendChatBox inputValue={inputValue} setInputValue={setInputValue} />
        </div>
    );
}

export default HomePage;
