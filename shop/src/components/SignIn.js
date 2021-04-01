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
import { useHistory } from "react-router-dom";
import { UserContext } from '../context.js'


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
	let history = useHistory();
	let { crud, setUserData } = useContext(UserContext);
	let [ showWrongInput, setShowWrongInput ] = useState(false);
	let [ error, setError ] = useState('');
	let [ signIn, setSignIn ] = useState({
		name: '',
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
          Нэвтрэх 
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Нэр"
            name="email"
            autoComplete="email"
            autoFocus
			  onChange={e => setSignIn({ ...signIn, name: e.target.value }) }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Нууц үг"
            type="password"
            id="password"
            autoComplete="current-password"
			  onChange={e => setSignIn({ ...signIn, password: e.target.value }) }
          />
			<div style={{color: 'red', marginTop: 10, display: showWrongInput ? 'block' : 'none'}}>
				{error}
			</div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
			  onClick={async () => {
				  let res = await crud.call(signIn.name);
				  if (res.length) {
					  if (res[0].password == signIn.password) {
						 setUserData(res[0]);
						history.push('/store')
					  } else {
						  setError('Нэр эсвэл нууц үг буруу байна.')
						  setShowWrongInput(true);
					  }
				  } else  {
						  setError('Хэрэглэгч олдсонгүй.')
						  setShowWrongInput(true);
				  }
				  if (!(signIn.name && signIn.password)) {
						  setError('Хоосон байна.')
						  setShowWrongInput(true);
				  }
			  }}
          >
            Нэвтрэх
          </Button>
          <Grid container>
            <Grid item>
              <Link to='/signup' variant="body2">
                {"Бүртгүүлэх"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

