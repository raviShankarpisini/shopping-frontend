import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FaStar } from "react-icons/fa";
import CircleLoader from "react-spinners/CircleLoader";

const primeDealApiStatus = {
	processing: "PROCESSING",
	success: "SUCCESS",
	rejected: "REJECTED",
};

function PrimeDeals() {
	const jwtToken = Cookies.get("jwtToken");

	const [primeDeals, setPrimeDeals] = useState(null);
	const [primeDealApiState, setPrimeDealApiState] = useState(
		primeDealApiStatus.processing
	);
	const getPrimeProducts = async () => {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${jwtToken}`,
			},
		};
		const url = "https://shopping-backend-arbo.onrender.com/prime-deals";
		const response = await fetch(url, options);

		if (response.ok) {
			const data = await response.json();
			const primeDeals = data.prime_deals.map((each) => ({
				availability: each.availability,
				brand: each.brand,
				description: each.description,
				id: each.id,
				imageUrl: each.image_url,
				price: each.price,
				rating: each.rating,
				style: each.style,
				title: each.title,
				totalReviews: each.total_reviews,
			}));
			setPrimeDeals(primeDeals);
			setPrimeDealApiState(primeDealApiStatus.success);
		} else {
			setPrimeDealApiState(primeDealApiStatus.rejected);
		}
	};
	useEffect(() => {
		getPrimeProducts();
	}, []);

	const PrimeCard = ({ cardDetails }) => {
		const {
			availability,
			brand,
			description,
			id,
			imageUrl,
			price,
			rating,
			style,
			title,
			totalReviews,
		} = cardDetails;
		return (
			<li className="md:w-1/4 mr-6">
				<Link to={`/products/${id}`}>
					<img className=" rounded-md" src={imageUrl} alt={title} />
					<h1 className="mb-2 text-slate-80 text-md font-bold">
						{title}
					</h1>
					<p className="mb-2 text-slate-700">By {brand}</p>
					<div className="flex justify-between align-middle mb-4">
						<span>RS {price}</span>
						<span className="bg-blue-500 p-1 rounded-md px-4 text-white font-medium flex items-center">
							{rating} <FaStar className="ml-1" />
						</span>
					</div>
				</Link>
			</li>
		);
	};
	const PrimeSuccessView = () => {
		return (
			<div className="">
				<h1 className="text-4xl mb-8 text-slate-700 font-medium">
					Exclusive Prime deals
				</h1>
				<ul className="flex flex-row flex-wrap w-full">
					{primeDeals?.map((each) => (
						<PrimeCard key={each.id} cardDetails={each} />
					))}
				</ul>
			</div>
		);
	};

	const PrimeFailureView = () => {
		return (
			<img
				src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
				alt="prime"
			/>
		);
	};
	const LoadingView = () => {
		return (
			<div className="flex flex-row justify-center">
				<CircleLoader
					color={"green"}
					loading={true}
					// cssOverride={override}
					size={150}
					aria-label="Loading Spinner"
					// data-testid="loader"
				/>
			</div>
		);
	};
	const PrimeView = () => {
		switch (primeDealApiState) {
			case primeDealApiStatus.processing:
				return <LoadingView />;
			case primeDealApiStatus.success:
				return <PrimeSuccessView />;
			case primeDealApiStatus.rejected:
				return <PrimeFailureView />;
		}
	};

	return (
		<div className="mb-8">
			<PrimeView />
		</div>
	);
}

export default PrimeDeals;
