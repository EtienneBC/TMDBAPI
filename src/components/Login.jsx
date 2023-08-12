import React, { useState } from 'react';
// import LogoutButton from './Logout.jsx';
import { Link } from 'react-router-dom';
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import {StarIcon} from './Icons.jsx';

function handleLogout() {
    localStorage.removeItem('isLogged');
    window.location.href = '/';
}

function LogoutButton() {
    const isLogged = localStorage.getItem('isLogged');
    if (!isLogged) {
        return null;
    }
    return (
        <div>
            <Button.Group auto>
                <Button bordered ><Link to="/pages/watchlist"><StarIcon /></Link></Button>
                <Button bordered onClick={handleLogout}>Log out</Button>
            </Button.Group>
        </div>
    );
}
function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('isLogged', 'true');
            window.location.href = './';
        } else {
            setError('Nom d\'utilisateur ou mot de passe incorrect');
        }
    }
    if (localStorage.getItem('isLogged') === 'true') {
        return (
            <div>
                <LogoutButton />
            </div>
        )
    }
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
    return (
        <div>
            <Button auto color="warning" shadow onPress={handler}>Log in</Button>
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <form onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Text h3 id="modal-title">Connexion</Text>
                    </Modal.Header>
                    <Modal.Body className="form-group">
                        <Text htmlFor="username">Nom d'utilisateur</Text>
                        <Input type="text" id="username" value={username} onChange={handleUsernameChange} />
                        <Text htmlFor="password">Mot de passe</Text>
                        <Input type="password" id="password" value={password} onChange={handlePasswordChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Log in</Button>
                        {error && <div className="error">{error}</div>}
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default Login;