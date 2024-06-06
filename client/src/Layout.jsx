import React from "react";
import Header from "./pages/Header";
import { Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
    return (
        <div className="container">
            <Header />
                
            <Outlet />

        </div>
    );
}
