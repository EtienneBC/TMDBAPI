import React from "react";
import ActorList from "../components/fetchActors.jsx";
import Nav from "/src/components/Navbar.jsx";

function ActorPage() {
    return (
        <div>
            <Nav />
            <ActorList />
        </div>
    );
}
export default ActorPage;