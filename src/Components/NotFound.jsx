import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function NotFound() {
	return (
		<>
			<Header />
			<div className="flex flex-col justify-center items-center h-screen">
				<img
					src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
					alt="notfound"
					className="w-1/3"
				/>
				<h2 className="text-3xl font-bold my-3">Product Not Found</h2>
				<Link to="/products">
					<button className="bg-blue-500 p-2 text-white font-bold rounded-md mb-2 mr-2">
						Continue Shopping
					</button>
				</Link>
			</div>
		</>
	);
}

export default NotFound;
