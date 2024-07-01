import { useState, createContext } from "react";
export const CartContext = createContext({});

function ContextProvider({children}) {
	const [cartList, setCartList] = useState([]);
	const addToCart = (item) => {
		const itemExist = cartList.find((each) => each.id === item.id);
		if (itemExist === undefined) {
			setCartList((prev) => [...prev, item]);
			// don't set like this setCartList((prev) => {[...prev, item]});
		} else {
			const newList = cartList?.map((each) => {
				if (each.id === item.id) {
					return {
						...each,
						itemsCount: each.itemsCount + item.itemsCount,
					};
				}
				return newList;
			});
			setCartList(newList);
		}
	};

	const removeFromCart = (id) => {
		const newList = cartList.filter((each) => each.id !== id);
		setCartList(newList);
	};

	const increaseProduct = (id) => {
		const newList = cartList.map((each) => {
			if (each.id === id) {
				return { ...each, itemsCount: each.itemsCount + 1 };
			}
			return each;
		});
		setCartList(newList);
	};
	const decreaseProduct = (id) => {
		const newList = cartList.map((each) => {
			if (each.id === id) {
				if (each.itemsCount > 1) {
					return { ...each, itemsCount: each.itemsCount - 1 };
				}
			}
			return each;
		});
		setCartList(newList);
	};

	const removeAll = () => {
		setCartList([]);
	};

	const values = {
		cartList,
		addToCart,
		decreaseProduct,
		increaseProduct,
		removeFromCart,
		removeAll,
	};
	return <CartContext.Provider value={values}>
        {children}
    </CartContext.Provider>
}

export default ContextProvider;
