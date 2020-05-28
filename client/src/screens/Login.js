import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import M from "materialize-css";

const Login = () => {
	const { dispatch } = useContext(UserContext);
	const URL = `http://localhost:5000/signin`;
	const history = useHistory();

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const PostData = () => {
		if (
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			axios.post(URL, { password, email })
				.then((res) => {
					const data = res.data;
					if (data.error) {
						M.toast({
							html: data.error,
							classes: "#e57373 red lighten-2",
						});
					} else {
						// we store our generated token in order to use it to access protected endpoints
						localStorage.setItem("jwt", data.token);

						// we also store the user details
						localStorage.setItem("user", JSON.stringify(data.user));
						dispatch({ type: "USER", payload: data.user });
						//we can show that success PopUp or not depends on dev choice
						/*M.toast({
									html: "Signed In successfully",
									classes: "#66bb6a green lighten-1",
								});*/
						history.push("/");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			M.toast({
				html: "Invalid Email",
				classes: "#e57373 red lighten-2",
			});
		}
	};
	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				<h2>Instagram Clone</h2>
				<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="btn waves-effect waves-light" onClick={() => PostData()}>
					Login
				</button>
				<h5>
					<Link to="/signup">Does not have an account ? Create one</Link>
				</h5>
				<h6>
					<Link to="/reset">Forgot the Password ?</Link>
				</h6>
			</div>
		</div>
	);
};

export default Login;
