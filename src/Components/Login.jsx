import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

function Login() {
	// const [username, setUsername] = useState("");
	// const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const username = useRef("");
	const password = useRef("");
	const [errorMsg, setErrorMsg] = useState("");
	const [showError, setShowError] = useState(false);

	const loginSuccessful = (jwtToken) => {
		Cookies.set("jwtToken", jwtToken, { expires: 7 });
		navigate("/");
	};
	const loginFailure = (errorMsg) => {
		setErrorMsg(errorMsg);
		setShowError(true);
	};
	const formSubmit = async (event) => {
		event.preventDefault();
		const userDetails = {
			username: username.current.value,
			password: password.current.value,
		};

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json", // always maintain this headers option to avoid req.body ={} as empty error in backend
			},
			body: JSON.stringify(userDetails),
		};
		const response = await fetch(
			"https://shopping-backend-arbo.onrender.com/login",
			options
		);
		const data = await response.json();

		if (response.ok) {
			loginSuccessful(data.jwt_token);
		} else {
			loginFailure(data.message);
		}
	};
	const onCLickRegister = (event) => {
		event.preventDefault();
		navigate("/register");
	};

	return (
		<div className="p-10 h-screen flex flex-col justify-center items-center lg:flex lg:flex-row  lg:gap-4">
			<img
				src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
				alt="logo"
				className="h-8 my-4 lg:hidden lg:w-[30%]"
			/>
			<img
				src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
				alt="loginImg"
				className="w-full lg:w-2/5"
			/>
			<div className="w-full p-5 my-4 shadow-lg shadow-slate-600 rounded-2xl lg:w-[30%] lg:h-1/2">
				<img
					src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
					alt="logo"
					className="h-6 my-2 hidden lg:inline"
				/>
				<form onSubmit={formSubmit}>
					<label
						htmlFor="username"
						className="mb-2 text-slate-700 text-sm font-medium"
					>
						USER NAME/EMAIL 123
					</label>
					<br />
					<input
						type="text"
						id="username"
						placeholder="enter user name/email"
						// value={username}
						// onChange={(event) => setUsername(event.target.value)}
						ref={username}
						className=" w-full bg-slate-200 mb-2 p-2 rounded-lg"
					/>
					<br />
					<label
						htmlFor="password"
						className="text-slate-700 text-sm font-medium"
					>
						PASSWORD
					</label>
					<br />
					<input
						type="password"
						id="password"
						placeholder="enter user password"
						// value={username}
						ref={password}
						className="w-full bg-slate-200 mb-2 p-2 rounded-lg"

						// onChange={(event) => setPassword(event.target.value)}
					/>
					<br />
					<div className="flex">
						<button
							className="my-2 bg-blue-500 text-center w-1/2 p-2 text-white rounded-lg  mr-2"
							onClick={onCLickRegister}
						>
							Register
						</button>
						<button
							type="submit"
							className="my-2 bg-red-500 text-center w-1/2 p-2 text-white rounded-lg"
						>
							Login
						</button>
					</div>

					<br />

					{showError && (
						<p className="text-red-700 font-bold">* {errorMsg}</p>
					)}
				</form>
			</div>
		</div>
	);
}

export default Login;
