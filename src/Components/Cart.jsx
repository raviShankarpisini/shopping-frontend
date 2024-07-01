import React, { useContext } from "react";
// import { CartContext } from "../App";
import { CartContext } from "./ContextProvider";
import { Link } from "react-router-dom";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Header from "./Header";
function Cart() {
	const {
		cartList,
		decreaseProduct,
		increaseProduct,
		removeFromCart,
		removeAll,
	} = useContext(CartContext);

	const EmptyCart = () => {
		return (
			<div className="flex flex-col justify-center items-center pt-[5%]">
				<img
					src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
					alt="cart"
					className="w-64"
				/>
				<h1 className="text-3xl font-bold my-3">your cart is empty</h1>
				<Link to="/products">
					<button className="bg-blue-500 p-2 text-white font-bold rounded-md mb-2 mr-2">
						Shop now
					</button>
				</Link>
			</div>
		);
	};

	const EachCard = ({ details }) => {
		const { brand, id, imageUrl, price, title, itemsCount } = details;
		return (
			<li className="mb-3 shadow-md  shadow-slate-400 flex flex-row justify-between p-5 items-center">
				<div className="flex items-center w-2/5">
					<img
						src={imageUrl}
						alt={title}
						className="w-36 rounded-lg mr-3"
					/>
					<div className="flex flex-col">
						<span className="text-black text-lg font-medium">
							{title}
						</span>
						<span> By {brand}</span>
					</div>
				</div>

				<div className="text-2xl flex items-center w-2/5">
					<button
						onClick={() => {
							if (itemsCount > 1) {
								decreaseProduct(id);
							}
						}}
					>
						{" "}
						<CiSquareMinus />
					</button>
					<span className="mx-4">{itemsCount}</span>
					<button
						onClick={() => {
							increaseProduct(id);
						}}
					>
						{" "}
						<CiSquarePlus />
					</button>
				</div>
				<div className=" flex items-center font-2xl w-1/5 ">
					<span className="text-blue-600 font-bold ">
						Rs {price * itemsCount}/-
					</span>
					<button
						onClick={() => {
							removeFromCart(id);
						}}
					>
						<MdDelete className="text-3xl text-red-500 ml-3" />
					</button>
				</div>
			</li>
		);
	};

	const cartsView = () => {
		let totalPrice = 0;
		for (let each of cartList) {
			totalPrice += each.price * each.itemsCount;
		}

		return (
			<div className="p-[5%] flex flex-col">
				<h1 className="text-5xl font-bold mb-3">My Cart</h1>
				<button
					onClick={() => {
						removeAll();
					}}
					className="self-end text-blue-600 font-medium text-xl mb-2"
				>
					Remove all
				</button>
				<ul>
					{cartList.map((each) => (
						<EachCard key={each.id} details={each} />
					))}
					{}
				</ul>
				<div className="self-end mt-4">
					<h2 className="text-2xl text-slate-600">
						Order Total:
						<span className="font-bold text-4xl">
							Rs {totalPrice} /-
						</span>
					</h2>
					<h2 className="text-xl mt-3 text-slate-700">
						{cartList.length} items in the cart
					</h2>
				</div>
			</div>
		);
	};

	const renderView = () => {
		if (cartList.length > 0) {
			return cartsView();
		}
		return <EmptyCart />;
	};
	return (
		<div>
			<Header />
			{renderView()}
		</div>
	);
}

export default Cart;
