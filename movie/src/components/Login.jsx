import React, { useState } from 'react';
import '../App.css';
import SignUp from './SignUp';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import apiService from "../service/api/movieapi";
import Swal from 'sweetalert2';

function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('LoginData:', loginData);

        try {
            const loginuser = await apiService.loginUser(loginData);
            console.log('Login response:', loginuser);

            if (loginuser.msg === 'Login successful') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: loginuser.msg,
                }).then(() => {
                    // Redirect to home page after successful login
                    navigate('/home'); // Adjust the path as needed
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred during login!',
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    return (
        <div>
            <section className="vh-80 gradient-custom">
                <div className="container py-5 h-80">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-7 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-md-2 mt-md-4 pb-5">
                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-4">Please enter your login and password!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control form-control-lg"
                                                    value={loginData.email}
                                                    onChange={handleChange}
                                                    placeholder='Email'
                                                    required
                                                />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control form-control-lg"
                                                    value={loginData.password}
                                                    placeholder='Password'
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <p className="small mb-5 pb-lg-2">
                                                <a className="text-white-50" href="#!">Forgot password?</a>
                                            </p>

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">
                                                Login
                                            </button>

                                            <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                                <a href="#!" className="text-white me-4">
                                                    <i className="fab fa-facebook-f fa-lg"></i>
                                                </a>
                                                <a href="#!" className="text-white me-4">
                                                    <i className="fab fa-twitter fa-lg"></i>
                                                </a>
                                                <a href="#!" className="text-white">
                                                    <i className="fab fa-google fa-lg"></i>
                                                </a>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="mb-0">
                                                Don't have an account?{' '}
                                                <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
