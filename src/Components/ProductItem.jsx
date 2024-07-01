import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
// import { CartContext } from "../App";
import { CartContext } from "./ContextProvider";

import CircleLoader from "react-spinners/CircleLoader";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const apiStatus = {
	processing: "PROCESSING",
	success: "SUCCESS",
	rejected: "REJECTED",
};

function ProductItem() {
	const [apiData, setApiData] = useState(null);
	const [apiState, setApiState] = useState(apiStatus.processing);
	const { id } = useParams();
	const [itemsCount, setItemsCount] = useState(1);
	const consumer = useContext(CartContext);
	const { addToCart, cartList } = consumer;
	const jwtToken = Cookies.get("jwtToken");
	const getProductData = async () => {
		const url = `https://shopping-backend-arbo.onrender.com/products/${id}`;
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${jwtToken}`,
			},
		};
		const response = await fetch(url, options);
		if (response.ok) {
			const data = await response.json();
			const modifiedData = {
				availability: data[0].availability,
				brand: data[0].brand,
				description: data[0].description,
				id: data[0].id,
				imageUrl: data[0].image_url,
				price: data[0].price,
				rating: data[0].rating,
				style: data[0].style,
				title: data[0].title,
				totalReviews: data[0].total_reviews,
				similarProducts: data[0].similar_products?.map(
					(similarProduct) => ({
						availability: similarProduct.availability,
						brand: similarProduct.brand,
						description: similarProduct.description,
						id: similarProduct.id,
						imageUrl: similarProduct.image_url,
						price: similarProduct.price,
						rating: similarProduct.rating,
						style: similarProduct.style,
						title: similarProduct.title,
						totalReviews: similarProduct.total_reviews,
					})
				),
			};

			setApiData(modifiedData);
			setApiState(apiStatus.success);
		} else {
			setApiState(apiStatus.rejected);
		}
	};
	useEffect(() => {
		getProductData();
	}, [id]);

	const ItemCard = ({ details }) => {
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
		} = details;
		return (
			<li>
				<Link to={`/products/${id}`}>
					<div className="w-56 mr-14">
						<img
							src={imageUrl}
							alt={title}
							className="rounded-lg  mb-2 "
						/>
						<p className="mb-2 text-slate-80 text-md font-bold ">
							{title}
						</p>
						<p className="mb-2 text-slate-700">By {brand}</p>
						<div className="flex justify-between align-middle mb-4">
							<span>RS {price}</span>
							<span className="bg-blue-500 p-1 rounded-md px-4 text-white font-medium flex items-center">
								{rating} <FaStar className="ml-1" />
							</span>
						</div>
					</div>
				</Link>
			</li>
		);
	};

	const addCart = () => {
		addToCart({ ...apiData, itemsCount });
		setItemsCount(1);
	};

	const SuccessView = () => {
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
			similarProducts,
		} = apiData;

		const itemsLength = cartList?.filter((each) => each.id === id)?.[0]
			?.itemsCount;

		return (
			<div className="flex flex-col w-screen p-10">
				<div className="md:flex">
					<div className="w-full rounded-2xl md:w-1/2">
						<img
							src={imageUrl}
							alt={title}
							className=" rounded-2xl md:w-4/5"
						/>
					</div>

					<div className="md:w-1/2">
						<h2 className="font-bold text-2xl text-slate-600 mb-2">
							{title}
						</h2>
						<h1 className="font-bold text-3xl text-gray-800 mb-2">
							Rs {price} /-
						</h1>
						<div className="mb-2">
							<span className="bg-blue-500 p-2 rounded-md px-4 mr-2 text-white font-medium  flex items-center w-20">
								{rating} <FaStar className="ml-1" />
							</span>
							<span className="text-slate-600 font-bold mb-2">
								{totalReviews} Reviews
							</span>
						</div>

						<p className="mb-2 text-slate-500">{description}</p>
						<p className="mb-2  text-slate-500">
							<span className="font-bold text-xl text-black">
								{" "}
								availability:
							</span>
							{availability}
						</p>
						<p className="mb-2  text-slate-500">
							<span className="font-bold text-xl text-black">
								Brand:
							</span>
							{brand}
						</p>
						<hr className="mb-2 " />
						<div className="flex flex-row text-2xl text-slate-500">
							<button
								className="mr-3"
								onClick={() => {
									if (itemsCount > 1) {
										setItemsCount((prev) => prev - 1);
									}
								}}
							>
								{" "}
								<CiSquareMinus />
							</button>
							<span className="mr-3">{itemsCount}</span>
							<button
								onClick={() => {
									setItemsCount((prev) => prev + 1);
								}}
							>
								{" "}
								<CiSquarePlus />
							</button>
						</div>

						<button
							className="bg-blue-500 p-2 text-white font-bold rounded-md mb-2 mr-2"
							onClick={addCart}
						>
							ADD TO CART
						</button>
						{itemsLength > 0 && (
							<Link to="/cart">
								<button className="bg-green-500 p-2 text-white font-bold rounded-md mb-2">
									{itemsLength} items are in the cart
								</button>
							</Link>
						)}
					</div>
				</div>
				<div>
					<h2 className="my-2 font-bold text-3xl text-slate-600">
						Similar Products
					</h2>
					<ul className="md:flex md:wrap">
						{apiData?.similarProducts?.map((each) => (
							<ItemCard details={each} key={each.id} />
						))}
					</ul>
				</div>
			</div>
		);
	};

	const FailureView = () => {
		return (
			<div className="flex flex-col justify-center items-center h-screen">
				<img
					src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
					alt="notfound"
					className="w-1/3"
				/>
				<h2 className="text-3xl font-bold my-3">Product Not Found</h2>
				<Link to="/products">
					{" "}
					<button className="bg-blue-500 p-2 text-white font-bold rounded-md mb-2 mr-2">
						Continue Shopping
					</button>
				</Link>
			</div>
		);
	};

	const LoadingView = () => {
		return (
			<div className="flex flex-row justify-center">
				{" "}
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
		<div>
			<Header />
			<View />
		</div>
	);
}

export default ProductItem;
