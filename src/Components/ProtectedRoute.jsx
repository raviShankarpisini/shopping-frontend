import React from "react";
import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
function ProtectedRoute() {
	const jwtToken = Cookies.get("jwtToken");
	if (jwtToken === undefined) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}

export default ProtectedRoute;
