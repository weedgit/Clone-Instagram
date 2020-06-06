import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import NavBar from "./components/Navbar";
import Home from "./screens/Home/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile/Profile";
import Signup from "./screens/Signup/Signup";
import Post from "./screens/CreatePost/Post";
import UserProfile from "./screens/UserProfile/UserProfile";
import SubscribePost from "./screens/SubscribePosts/SubscribePosts";
import Reset from "./screens/ResetPassword/Reset.js";
import NewPass from "./screens/ResetPassword/NewPassword.js";
import "./App.css";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({ type: "USER", payload: user });
		} else {
			if (!history.location.pathname.startsWith("/reset")) history.push("/login");
		}
	}, []);
	return (
		<Switch>
			<Route exact path="/">
				<NavBar />
				<Home />
			</Route>
			<Route exact path="/profile">
				<NavBar />
				<Profile />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route exact path="/reset">
				<Reset />
			</Route>
			<Route path="/reset/:token">
				<NewPass />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/create">
				<NavBar />
				<Post />
			</Route>
			<Route path="/profile/:userid">
				<NavBar />
				<UserProfile />
			</Route>
			<Route path="/feed">
				<NavBar />
				<SubscribePost />
			</Route>
		</Switch>
	);
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Routing />
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
