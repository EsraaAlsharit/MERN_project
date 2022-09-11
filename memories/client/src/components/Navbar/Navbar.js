import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';

import decode from 'jwt-decode';

import { useDispatch } from 'react-redux';

import useStyles from './styles';
import memories from '../../images/projectlogo.png';


const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // const user = null;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate(0);
        setUser(null);

    };

    console.log(user)

    useEffect(() => {
        const token = user?.token;


        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);


    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                {/* <img className={classes.image} src={memories} alt='memories' height='100' /> */}
                <Typography component={Link} to="/" className={classes.heading} variant='h3' align='center'><img className={classes.image} src={memories} alt='memories' height='150' /></Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color='secondary' onClick={logout}>LogOut</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color='secondary' fullWidth>LogIn</Button>
                )}
            </Toolbar>
        </AppBar>
    )

}

export default Navbar