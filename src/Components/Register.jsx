import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { Button, Modal } from "antd";

function Register() {
	// const [username, setUsername] = useState("");
	// const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const registerusername = useRef("");
	const registerpassword = useRef("");
	const email = useRef("");
	const [errorMsg, setErrorMsg] = useState("");
	const [showError, setShowError] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		navigate("/login");
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const registerSuccessful = () => {
		setIsModalOpen(true);
	};
	const registerFailure = (errorMsg) => {
		setErrorMsg(errorMsg);
		setShowError(true);
	};
	const formSubmit = async (event) => {
		event.preventDefault();
		const userDetails = {
			username: registerusername.current.value,
			password: registerpassword.current.value,
			email: email.current.value,
		};

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json", // always maintain this headers option to avoid req.body ={} as empty error in backend
			},
			body: JSON.stringify(userDetails),
		};
		const response = await fetch(
			"https://shopping-backend-arbo.onrender.com/register",
			options
		);
		const data = await response.json();

		if (response.ok) {
			registerSuccessful();
		} else {
			registerFailure(data.message);
		}
	};

	const onCLickLogin = (event) => {
		event.preventDefault();
		navigate("/login");
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
				alt="registerImg"
				className="w-full lg:w-2/5"
			/>
			<div className="w-full p-5 my-4 shadow-lg shadow-slate-600 rounded-2xl lg:w-[30%] ">
				<img
					src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
					alt="logo"
					className="h-6 my-2 hidden lg:inline"
				/>
				<form onSubmit={formSubmit}>
					<label
						htmlFor="registerusername"
						className="mb-2 text-slate-700 text-sm font-medium"
					>
						USER NAME
					</label>
					<br />
					<input
						required
						type="text"
						id="registerusername"
						placeholder="enter user name"
						// value={username}
						// onChange={(event) => setUsername(event.target.value)}
						ref={registerusername}
						className=" w-full bg-slate-200 mb-2 p-2 rounded-lg"
					/>
					<br />
					<label
						htmlFor="useremail"
						className="mb-2 text-slate-700 text-sm font-medium"
					>
						USER EMAIL
					</label>
					<br />
					<input
						required
						type="email"
						id="useremail"
						placeholder="enter user email"
						// value={username}
						// onChange={(event) => setUsername(event.target.value)}
						ref={email}
						className=" w-full bg-slate-200 mb-2 p-2 rounded-lg"
					/>
					<br />
					<label
						htmlFor="registerpassword"
						className="text-slate-700 text-sm font-medium"
					>
						PASSWORD
					</label>
					<br />
					<input
						required
						type="password"
						id="registerpassword"
						placeholder="enter user password"
						// value={username}
						ref={registerpassword}
						className="w-full bg-slate-200 mb-2 p-2 rounded-lg"

						// onChange={(event) => setPassword(event.target.value)}
					/>
					<br />
					<div className="flex">
						<button
							className="my-2 bg-blue-500 text-center w-1/2 p-2 text-white rounded-lg ml-2  mr-2"
							onClick={onCLickLogin}
						>
							Login
						</button>
						<button
							type="submit"
							className="my-2 bg-red-500 text-center w-1/2 p-2 text-white rounded-lg"
						>
							Register
						</button>{" "}
						<Modal
							title="Login"
							open={isModalOpen}
							onOk={handleOk}
							onCancel={handleCancel}
							centered
						>
							<p>
								Registration was successful. The page will now
								navigate to the login screen.
							</p>
						</Modal>
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

export default Register;
