import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Cookies from "js-cookie";
import ProductItem from "./ProductItem";
import PrimeDeals from "./PrimeDeals";
import CircleLoader from "react-spinners/CircleLoader";
import { FaStar, FaSort } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
const apiStatus = {
	processing: "PROCESSING",
	success: "SUCCESS",
	rejected: "REJECTED",
};

const ProductCard = ({ productDetails }) => {
	const { brand, id, title, rating, price, imageUrl } = productDetails;

	return (
		// <li>
		// 	<Link to={`/products/${id}`}>
		// 		<img src={imageUrl} alt={title} />
		// 		<h1>{title}</h1>
		// 		<p>By {brand}</p>
		// 		<span>{price}</span>
		// 		<span>{rating}</span>
		// 	</Link>
		// </li>
		<li className="md:w-1/3 mr-6">
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

// https://apis.ccbp.in/products?sort_by=PRICE_HIGH&category=4&title_search=machine&rating=4

const Products = () => {
	const jwtToken = Cookies.get("jwtToken");
	const [products, setProducts] = useState([]);
	const [apiState, setApiState] = useState(apiStatus.processing);

	const [searchInput, setSearchInput] = useState("");
	const [category, setCategory] = useState("");
	const [rating, setRating] = useState(0);
	const [sortBy, setSortBy] = useState(-1);

	const getProducts = async () => {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${jwtToken}`,
			},
		};
		const response = await fetch(
			// `https://apis.ccbp.in/products?sort_by=${sortBy}&category=${category}&title_search=${searchInput}&rating=${rating}`,
			// `https://apis.ccbp.in/products?sort_by=PRICE_HIGH&category=${category}&title_search=${searchInput}&rating=${rating}`,
			`https://shopping-backend-arbo.onrender.com/products?sort_by=${sortBy}&category=${category}&title_search=${searchInput}&rating=${rating}`,
			options
		);
		if (response.ok) {
			const data = await response.json();

			const dataFormat = data?.products?.map((each) => ({
				brand: each.brand,
				id: each.id,
				title: each.title,
				rating: each.rating,
				price: each.price,
				imageUrl: each.image_url,
			}));
			setProducts(dataFormat);
			setApiState(apiStatus.success);
		} else {
			setApiState(apiStatus.rejected);
		}
	};
	useEffect(() => {
		getProducts();
	}, [searchInput, category, rating, sortBy]);
	const SuccessView = () => {
		if (products.length > 0) {
			return (
				<div className="flex flex-wrap justify-between ">
					<h4 className="text-4xl text-slate-600">All Products</h4>
					<div className="flex items-center text-xl  text-slate-600">
						<span>Sort By </span>
						<FaSort className="mr-5" />
						<select
							name=""
							id=""
							onChange={(event) => setSortBy(event.target.value)}
							value={sortBy}
						>
							<option value={-1}>Price(High-Low)</option>
							<option value={1}>Price(Low-High)</option>
						</select>
					</div>

					<ul className="flex flex-row flex-wrap w-full mt-6">
						{products?.map((product) => (
							<ProductCard
								key={product.id}
								productDetails={product}
							/>
						))}
					</ul>
				</div>
			);
		} else {
			return (
				<div className="flex flex-col text-center">
					<img
						src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
						alt="no-products-found"
						className="mb-2"
					/>
					<h2 className="text-2xl text-bold my-3 font-bold text-slate-900">
						No Products Found
					</h2>
					<p className="text-xl text-bold my-3 text-slate-600">
						We could not find any products. Please try other filters
					</p>
				</div>
			);
		}
	};

	const sideMenu = () => {
		const clearFilters = () => {
			setCategory("");
			setSearchInput("");
			setRating(1);
		};
		return (
			<div className="md:w-1/3 md:mr-10">
				<input
					type="search"
					onChange={(event) => {
						setSearchInput(event.target.value.toLowerCase()); // it wont work if we write as Component (SideMenu) and writing useState out of Component
					}}
					value={searchInput}
					className="border border-black p-2 text-blue-600 rounded-md w-full bg-slate-200 "
					placeholder="Search"
				/>
				<h4 className="text-2xl font-bold my-2">Category</h4>
				<ul>
					<li>
						<button
							onClick={(event) => {
								setCategory(event.target.value);
							}}
							value="clothing"
							className="text-xl my-2 text-slate-600"
							style={
								category === "clothing" ? { color: "blue" } : {}
							}
						>
							Clothing
						</button>
					</li>
					<li>
						<button
							onClick={(event) => {
								setCategory(event.target.value);
							}}
							value="electronics"
							className="text-xl my-2 text-slate-600"
							style={
								category === "electronics"
									? { color: "blue" }
									: {}
							}
						>
							Electronics
						</button>
					</li>
					<li
						style={
							category === "appliances" ? { color: "blue" } : {}
						}
					>
						<button
							onClick={(event) => {
								setCategory(event.target.value);
							}}
							value="appliances"
							className="text-xl my-2 text-slate-600"
							style={
								category === "appliances"
									? { color: "blue" }
									: {}
							}
						>
							Appliances
						</button>
					</li>
					<li>
						<button
							onClick={(event) => {
								setCategory(event.target.value);
							}}
							value="grocery"
							className="text-xl my-2 text-slate-600"
							style={
								category === "grocery" ? { color: "blue" } : {}
							}
						>
							Grocery
						</button>
					</li>
					<li>
						<button
							onClick={(event) => {
								setCategory(event.target.value);
							}}
							value="toys"
							className="text-xl my-2 text-slate-600"
							style={category === "toys" ? { color: "blue" } : {}}
						>
							Toys
						</button>
					</li>
				</ul>
				<h4 className="text-2xl font-bold my-2">Rating</h4>
				<ul>
					<li>
						<button
							type="button"
							onClick={(event) => {
								setRating(event.currentTarget.value);
							}}
							value="4"
						>
							<div
								className="flex flex-row justify-between items-center text-xl text-slate-600 my-1"
								style={rating === "4" ? { color: "blue" } : {}}
							>
								<div className="flex flex-row">
									<FaStar className="text-yellow-600" />
									<FaStar className="text-yellow-600" />
									<FaStar className="text-yellow-600" />
									<FaStar className="text-yellow-600" />
									<CiStar />
								</div>

								<h1>&up</h1>
							</div>
						</button>
					</li>
					<li>
						<button
							onClick={(event) => {
								setRating(event.currentTarget.value);
							}}
							value="3"
						>
							<div
								className="flex flex-row justify-between items-center text-xl text-slate-600 my-1"
								style={rating === "3" ? { color: "blue" } : {}}
							>
								<div className="flex flex-row">
									<FaStar className="text-yellow-600" />
									<FaStar className="text-yellow-600" />
									<FaStar className="text-yellow-600" />
									<CiStar />
									<CiStar />
								</div>

								<h1>&up</h1>
							</div>
						</button>
					</li>
					<li>
						<button
							onClick={(event) => {
								setRating(event.currentTarget.value);
							}}
							value="2"
						>
							<div
								className="flex flex-row justify-between items-center text-xl text-slate-600 my-1"
								style={rating === "2" ? { color: "blue" } : {}}
							>
								<div className="flex flex-row">
									<FaStar className="text-yellow-600" />
									<FaStar className="text-yellow-600" />
									<CiStar />
									<CiStar />

									<CiStar />
								</div>

								<h1>&up</h1>
							</div>
						</button>
					</li>
					<li>
						<button
							onClick={(event) => {
								setRating(event.currentTarget.value);
							}}
							value="1"
						>
							<div
								className="flex flex-row justify-between items-center text-xl text-slate-600 my-1"
								style={rating === "1" ? { color: "blue" } : {}}
							>
								<div className="flex flex-row">
									<FaStar className="text-yellow-600" />
									<CiStar />
									<CiStar />
									<CiStar />
									<CiStar />
								</div>

								<h1>&up</h1>
							</div>
						</button>
					</li>
				</ul>

				<button
					className="border border-blue-950 p-2 my-3 text-blue-900 font-bold rounded-md"
					onClick={clearFilters}
				>
					clear filters
				</button>
			</div>
		);
	};

	const FailureView = () => {
		return (
			<div className="flex flex-col text-center w-1/2">
				<img
					src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
					alt="failure"
					className="mb-2"
				/>
				<h2 className="text-2xl text-bold my-3 font-bold text-slate-900">
					Oops ! something went wrong
				</h2>
				<p className="text-xl text-bold my-3 text-slate-600">
					We are having some trouble processing your request please
					try after some time{" "}
				</p>
			</div>
		);
	};

	const LoadingView = () => {
		return (
			<div>
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

	const View = () => {
		switch (apiState) {
			case apiStatus.processing:
				return <LoadingView />;
			case apiStatus.success:
				return <SuccessView />;
			case apiStatus.rejected:
				return <FailureView />;
		}
	};

	return (
		<div className="flex flex-col">
			<Header />
			<div className="p-10">
				<PrimeDeals />
				{/* add prime section based on api success or failure  */}
				<div className="flex flex-col md:flex-row w-full">
					{sideMenu()}
					<div className="flex flex-col justify-center items-center md:w-2/3">
						<View />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
