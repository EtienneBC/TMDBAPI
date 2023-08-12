import React, { useState, useEffect } from 'react';	

function Registrationform() { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    
    const handleSubmit = (event) => { 
        event.preventDefault();
        console.log(`Name: ${name} - Email: ${email} - Password: ${password}`);
        setResponse('Le formulaire a ete envoyer avec succes');
    }
 
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type='text'
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
            </label>
            <br/>
            <label>
                Email:
                <input type='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <br/>
            <label>
                Password:
                <input type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <br/>
            <button type="submit">Soumettre</button>
            <p>{response}</p>
        </form>
        </>
    )
}

export default Registrationform;