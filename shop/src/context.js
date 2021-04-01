import React, {createContext, useState} from 'react';
import axios from 'axios';
let ip = 'http://localhost:1337';

let UserContext = createContext(null);

let ContextProvider = ({children}) => {
	let [ userData, setUserData ] = useState();
	let call = async (name) => {
		let isUser = await axios.get(`${ip}/customers`)
		.then(res => {
			let data = res.data;
			let userRes = data.filter(user => user.userName == name);
			return userRes
		})
		return isUser
	}

	let put = () => {
		axios.put(`${ip}/customers/`, {userAge: 200})
			.then(data => {
				console.log(data)
			})
	}

	let postSignUp = ({ name, age, password }) => {
		axios.post(`${ip}/customers`, {userName: name, userWallet: 0, userAge: age, userPoints: 0, password})
	}
	
	let crud = { put,call,postSignUp }

	return (
		<UserContext.Provider value={{crud, userData, setUserData}}>
			{children}
		</UserContext.Provider>
	)
}
export  {
	UserContext,
	ContextProvider
}
