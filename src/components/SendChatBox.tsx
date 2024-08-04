import React, { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';

interface SendChatBoxProps {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const SendChatBox: React.FC<SendChatBoxProps> = ({ inputValue, setInputValue }) => {
    const navigate = useNavigate();

    const handleSend = () => {
        if (inputValue.trim()) {
            navigate(`/article?q=${inputValue}`);
        }
    };
    
    const handleKeyPress = async (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            navigate(`/article?q=${inputValue}`);
        }
    };

    const querySuggestions = ['What topics should I focus?', 'What are my scores?', 'What is the procedure to amend constitution?', 'Rivers in Gujrat'];

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            position: 'fixed', 
            bottom: 0, 
            width: '100%', 
            zIndex: 1000,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            boxSizing: 'border-box'
        }}>
            <Box sx={{ mb: 1 }}>
                {querySuggestions.map((suggestion, index) => (
                    <Chip 
                        key={index} 
                        label={suggestion} 
                        onClick={() => setInputValue(suggestion)} 
                        sx={{ m: 0.5 }} 
                    />
                ))}
            </Box>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton color="primary" onClick={handleSend}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

export default SendChatBox;
