import React from "react";
import { Link } from "react-router-dom";

function Contact() {
    return (
        <div>
            <p>Contact</p>
            <Link to="/" state={"depuis la page Contact"}>home</Link>
        </div>
    )
}

export default Contact;