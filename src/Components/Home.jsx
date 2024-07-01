import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
function Home() {
	return (
		<>
			<Header />
			<div className="p-10 w-screen flex flex-col md:flex-row">
				<div className="w-full p-5 md:w-1/2 order order-2 md:order-1 flex flex-col justify-center">
					<h2 className="text-black font-bold text-4xl font-sans my-2">
						Clothes That Get YOU Noticed
					</h2>
					<h3 className="text-gray-600 font-sans my-2">
						Fashion is part of the daily air and it does not quite
						help that it changes all the time. Clothes have always
						been a marker of the era and we are in a revolution.
						Your fashion makes you been seen and heard that way you
						are. So, celebrate the seasons new and exciting fashion
						in your own way.
					</h3>
					<Link to="/products">
						<button className="bg-blue-500 text-white p-2 rounded my-2 font-bold text-xl">
							shop now
						</button>
					</Link>
				</div>
				<div className="w-full p-5 md:w-1/2 order order-1 md:order-2">
					<img
						src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
						alt="home-page-img"
					/>
				</div>
			</div>
		</>
	);
}

export default Home;
