import React from "react";
import ActorList from "../components/fetchActors.jsx";
import Nav from "/src/components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function ActorPage() {
    return (
        <div>
            <Nav />
            <ActorList />
            <Footer />
        </div>
    );
}
export default ActorPage;