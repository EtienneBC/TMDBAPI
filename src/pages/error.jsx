import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
    let navigate = useNavigate()
    return (
        <div>
            <p>404</p>
            <button onClick={() => navigate("/")}>Return to the homepage</button>
        </div>
    )
}

export default Error;