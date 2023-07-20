import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../pages/styles/UserRegisterLogin.css'

const initialValues = {
    email: "",
    password: ""
}

function Login() {
    const [state, setState] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <main style={{ textAlign: "center", margin:"20px"}}>
            <img className="logo-img" src="/images/logo-login.svg" alt="Trueka logo image" />
            <p className='slogan'>Encontrá lo que buscás, <br/>
                cambialo por lo que ya no necesitás</p>
            <h5>Iniciar Sesión</h5>
            <form onSubmit={handleSubmit} className='form'>
                <div className='form-content'>
                    <input
                        id="email"
                        placeholder="Correo Electrónico"
                        onChange={handleChange}
                    />
                    <div class="pass-positioning">
                        <label for="password"></label>
                        <input
                            id="password"
                            placeholder="Contraseña"
                            type="password"
                            onChange={handleChange}
                        />
                        <img id="eye-img" src="/images/visibility.svg" alt="Eye icon to show or hidden password"/>
                    </div>
                    <div className='forgot-pass'>
                        <Link to="/login" >Olvidé mi contraseña</Link>
                    </div>
                    <button
                        className='button'
                    >Iniciar Sesión</button>
                    <div className='new-account'>
                        <span className="mt-2">
                        ¿No tenés una cuenta? </span>
                        <Link
                            to="/register"
                        >
                            Crear cuenta
                        </Link>
                    </div>
                    <hr id="hr" />
                    <div className='login-alternatives'>
                        <p>Ingresar con</p>
                        <img src="/images/google.svg" alt="Google icon" />
                        <img src="/images/facebook.svg" alt="Facebook icon" />
                    </div>
                </div>
            </form>
        </main>
    )
}

export default Login;