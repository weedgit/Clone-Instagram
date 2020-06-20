import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "-webkit-fill-available",
	},
	image: {
		backgroundSize: "cover",
		backgroundColor: "#fafafa",
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
	},
	container: {
		margin: " auto 0px",
	},
	Logo: {
		fontFamily: "Grand Hotel, cursive",
		margin: "40px 0px",
	},
	paper: {
		marginTop: "50px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},

	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link to="/">InstaClone</Link> {new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const NewPass = () => {
	const URL = `http://localhost:5000/new-pwd`;
	const classes = useStyles();
	const history = useHistory();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { token } = useParams();

	const [checkPwd, setCheckPwd] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);
	const [successMsg, setSuccessMsg] = useState(false);

	const timerRef = useRef();

	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
		},
		[]
	);

	const PostData = () => {
		axios.post(URL, { password, token })
			.then((res) => {
				const data = res.data;
				if (data.error) {
					setSuccessMsg(false);
					setErrorMsg(true);
				} else {
					setErrorMsg(false);
					setSuccessMsg(true);
					// set a time before we redirect the user to login page
					timerRef.current = setTimeout(() => {
						history.push("/login");
					}, 3000);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Grid container className={classes.root}>
			<Grid className={classes.image} item sm={4} md={6} />
			<Grid item xs={12} sm={8} md={6} className={classes.container}>
				<Container component="main" maxWidth="xs" style={{ paddingBottom: "64px" }}>
					<CssBaseline />
					<div className={classes.paper}>
						<Typography
							className={classes.Logo}
							variant="h2"
							gutterBottom
							style={{ fontFamily: "Grand Hotel, cursive " }}
						>
							Instagram Clone
						</Typography>

						{password !== "" && confirmPassword !== "" ? (
							password !== confirmPassword ? (
								<Alert variant="outlined" severity="error">
									Confirm password doesn't match the password — check it out !
								</Alert>
							) : null
						) : null}
						{errorMsg ? (
							<Alert variant="outlined" severity="error">
								Session expired ! Try Again with a new Request — check it Again !
							</Alert>
						) : null}
						{successMsg ? (
							<Alert variant="outlined" severity="success">
								Password Updated successfully — check it out !
							</Alert>
						) : null}
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="Confirm password"
								label="Confirm Password"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								disabled={password !== "" && confirmPassword !== "" ? false : true}
								onClick={() => PostData()}
							>
								Submit The New Password
							</Button>
						</form>
					</div>
					<Box mt={8}>
						<Copyright />
					</Box>
				</Container>
			</Grid>
		</Grid>
	);
};

export default NewPass;
