import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import apiService from "../service/api/movieapi";
import Swal from 'sweetalert2';

function SignUp() {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
    });

    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(registerData);

        try {
            const registerUser = await apiService.register(registerData);
            console.log('Register Response:', registerUser);

            if (registerUser.msg === 'User added successfully') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: registerUser.msg,
                }).then(() => {
                    navigate('/'); // Adjust the path as needed
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred during registration!';
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
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
                                <div className="card-body p-3 text-center">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-md-2 mt-md-2 pb-2">
                                            <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                                            <p className="text-white-50 mb-4">Please enter your Details!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className="form-control form-control-lg"
                                                    value={registerData.firstName}
                                                    onChange={handleChange}
                                                    placeholder='First Name'
                                                    required
                                                />
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className="form-control form-control-lg"
                                                    value={registerData.lastName}
                                                    onChange={handleChange}
                                                    placeholder='Last Name'
                                                    required
                                                />
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control form-control-lg"
                                                    value={registerData.email}
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
                                                    value={registerData.password}
                                                    placeholder='Password'
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <label className="form-label d-block mb-2" htmlFor="gender">Gender</label>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id="male"
                                                        value="male"
                                                        onChange={handleChange}
                                                        checked={registerData.gender === 'male'}
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="male">Male</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id="female"
                                                        value="female"
                                                        onChange={handleChange}
                                                        checked={registerData.gender === 'female'}
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="female">Female</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id="other"
                                                        value="other"
                                                        onChange={handleChange}
                                                        checked={registerData.gender === 'other'}
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="other">Other</label>
                                                </div>
                                            </div>

                                            <button
                                                className="btn btn-outline-light btn-lg px-5"
                                                type="submit"
                                            >
                                                Submit
                                            </button>

                                            <div className="d-flex justify-content-center text-center mt-2 pt-1">
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
                                                Already have an account?{' '}
                                                <Link to="/" className="text-white-50 fw-bold">Login</Link>
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

export default SignUp;
