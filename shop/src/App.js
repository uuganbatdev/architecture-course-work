import logo from './logo.svg';
import { useEffect, useState, useContext } from 'react';
import { ContextProvider } from './context.js';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Store from './components/Store.js';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

function App() {
	return (
		<ContextProvider>
			<Router>
				<Switch>
					<Route path='/store'>
						<Store />
					</Route>
					<Route path='/signup'>
						<SignUp />
					</Route>
					<Route path='/'>
						<SignIn />
					</Route>
				</Switch>
			</Router>
		</ContextProvider>
	);
}

export default App;
