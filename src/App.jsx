import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductItem from "./Components/ProductItem";
import ProtectedRoute from "./Components/ProtectedRoute";
import ContextProvider from "./Components/ContextProvider";

// export const CartContext = createContext({});
function App() {
	return (
		<BrowserRouter>
			<ContextProvider>
				<Routes>
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/register" element={<Register />} />
					<Route element={<ProtectedRoute />}>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/products" element={<Products />} />
						<Route exact path="/cart" element={<Cart />} />
						<Route
							exact
							path="/products/:id"
							element={<ProductItem />}
						/>
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</ContextProvider>
		</BrowserRouter>
	);
}

export default App;
