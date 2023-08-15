import React from "react";
import { Link } from "react-router-dom";
import Nav from "/src/components/Navbar.jsx";
import { Text, Container, Spacer } from "@nextui-org/react";
import Footer from "../components/Footer.jsx";

function About() {
    return (
        <div>
            <Nav />
            <Text
                h2
                css={{ width: "90%", margin: "auto", marginTop: "2rem", marginBottom: "2rem" }}
            >Let's talk about us.</Text>
            <Container
                justify="center"
                css={{ maxW: "80%" }}
            >
                <Spacer y={1} />
                <Text blockquote p>“Welcome to Stargaze, your go-to movie database website! We are
                    a team of passionate movie lovers who have created this website
                    using React and NextUI. We use the TMDB API to provide you with
                    the latest information on movies. Our goal is to make it easy for you
                    to find your favorite movies and discover new ones. We hope you
                    enjoy using our website as much as we enjoyed creating it!”</Text>
                <Spacer y={1} />
                <Link to="/">Return to the homepage</Link>
            </Container>
            <Footer />
        </div>
    )
}

export default About;