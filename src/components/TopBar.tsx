import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import { Container, Toolbar, Rating, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { UserProfileProto } from '../generated/profile_pb';
import { Stats } from '../generated/stats_pb';
import { IsLoggedIn, Logout } from '../services/LoginService';
import { GetProfile, GetStats } from '../services/ProfileService';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
    const navigate = useNavigate();
    
    const [profile, setProfile] = React.useState<UserProfileProto | null>(null);
    const [stats, setStats] = React.useState<Stats | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    useEffect(() => {
        if (!IsLoggedIn()) {
            navigate('/login');  // Redirect to the login page if not logged in
        } else {
            // Get profile information.
            GetProfile().then((res) => {
                setProfile(res);
            }).catch((err) => {
                console.log(err);
            });

            GetStats().then((res) => {
                setStats(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [navigate]);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Implement logout functionality here
        Logout();
        handleMenuClose();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="md">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            alt={profile?.getName()}
                            src={profile?.getPhotourl()}
                            sx={{ width: 56, height: 56 }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
                            <Typography variant="h6" sx={{ pt: 1 }}>{profile?.getName()}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
                                <Typography variant="body2">
                                    Overall Accuracy: {stats?.getCorrect()}/{stats?.getTotal()}
                                </Typography>
                                <Rating
                                    name="accuracy-rating"
                                    value={starRating(stats)}
                                    precision={0.1}
                                    readOnly
                                />
                            </Box>
                        </Box>
                    </Box>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

function starRating(stats: Stats | null): number {
    const accuracy = stats?.getAccuracy() || 0;
    const starRating = accuracy * 5;

    return starRating;
}

export default TopBar;
