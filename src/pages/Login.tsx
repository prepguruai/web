import React from 'react';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Login } from '../services/LoginService';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setError('');
            if (!email || !password) {
                setError('Email/Password cannot be empty');
                return;
            }

            var isSuccess = await Login(email, password);
            if (isSuccess) {
                navigate('/');
            }
        }
        catch (error) {
            setError('Email/Password are wrong');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box 
                sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    minHeight: '100vh', 
                    padding: '16px',
                    backgroundColor: '#ffffff'
                }}
            >
                {/* App Name and Subtitle */}
                <HorizontalBar />
                <Typography variant="h4" align="center" gutterBottom>
                    PrepGuruAI
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                    Boost your exam score with AI assistance
                </Typography>
                <HorizontalBar />

                <Logo src="logo192.png" alt="Logo" />

                {/* Error Message */}
                {error && (
                <Typography variant="body1" color="error" align="center" gutterBottom>
                    {error}
                </Typography>
                )}

                {/* Login Form */}
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, height: '50px'}}
                    onClick={handleLogin}
                >
                Login
                </Button>
            </Box>
    </Container>
    );
}

const Logo = styled('img')({
    width: '300px',
    height: 'auto',
    marginBottom: '24px'
  });

const HorizontalBar = styled('div')({
    width: '100%',
    height: '2px',
    backgroundColor: '#d3d3d3',
    margin: '16px 0'
  });

export default LoginPage;