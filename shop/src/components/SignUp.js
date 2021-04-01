import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { UserContext } from '../context.js'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
	let { crud } = useContext(UserContext);
	let [ showWrongInput, setShowWrongInput ] = useState(false);
	let [ error, setError ] = useState('');
	let history = useHistory();
	let [ signUp, setSignUp ] = useState({
		name: '',
		age: 0,
		password: ''
	});

  return (
	  <Container component="main" style={{ marginTop: 300 }} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Бүртгүүлэх
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                autoComplete="fname"
                name="customerName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Нэр"
                autoFocus
			  onChange={e => setSignUp({ ...signUp, name: e.target.value }) }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Нас"
                name="email"
				  type='number'
			  onChange={e => setSignUp({ ...signUp, age: e.target.value }) }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Нууц үг"
                type="password"
                id="password"
                autoComplete="current-password"
			  onChange={e => setSignUp({ ...signUp, password: e.target.value }) }
              />
            </Grid>
          </Grid>
			<div style={{color: 'red', marginTop: 10, display: showWrongInput ? 'block' : 'none'}}>
				{error}
			</div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
			  onClick={async () => {
				  if (!(signUp.name && signUp.password && signUp.age)) {
					  setError('Хоосон байна.')
					  setShowWrongInput(true);
				  } else {
					  let res = await crud.call(signUp.name);
					  if (!res.length) {
					  crud.postSignUp(signUp);
						history.push('/')			
					  } else {
						  setError('Нэр давтагдсан байна.')
						  setShowWrongInput(true);
					  }
				  }
			  }}
          >
            Бүртгүүлэх
          </Button>
          <Grid container justify="flex-start">
            <Grid item>
              <Link to='/' variant="body2">
                Нэвтрэх
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
