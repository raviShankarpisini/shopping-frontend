import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
// import { CartContext } from "../App";
import { CartContext } from "./ContextProvider";

function Header() {
	const consumer = useContext(CartContext);
	const { cartList } = consumer;
	const navigate = useNavigate();

	const logout = () => {
		Cookies.remove("jwtToken");
		navigate("/login");
	};

	return (
		<>
			<nav className="flex flex-row justify-between items-center p-10 ">
				<div>
					<Link to="/">
						<img
							src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
							alt="logo"
							className="w-40"
						/>
					</Link>
				</div>

				<div>
					<Link
						to="/"
						className="mr-2 text-slate-700 font-bold text-xl"
					>
						Home
					</Link>
					<Link
						to="/products"
						className="mr-2 text-slate-700 font-bold text-xl"
					>
						Products
					</Link>
					<Link
						to="/cart"
						className="mr-2 text-slate-700 font-bold text-xl"
					>
						Cart{" "}
						<span className="text-red-500 ">{cartList.length}</span>
					</Link>
					<button
						className="bg-blue-500 p-2 text-white font-bold rounded-md  ml-2"
						onClick={logout}
					>
						logout
					</button>
					{/* <IoIosLogOut className="xs:inline lg:hidden"/> */}
				</div>
			</nav>
			<hr />
		</>
	);
}

export default Header;
