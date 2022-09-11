import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
// import { useState } from 'react';

const Form = ({ currentId, setCurrentId }) => {
    // const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('profile'));


    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        // setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
            // navigate(0)
        }
        clear();
    }

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    You must Sign In to access full app functionalities, such as Creating and Liking memories...
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h5'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                {/* <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;