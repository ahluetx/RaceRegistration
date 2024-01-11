// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '', country: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            dateOfBirth: dob,
            gender,
            mailingAddress: address,
            authMethod: 'local', //assume local for now until google reg is setup
            role: 'participant' // default role TODO - change this for RD and SU's
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), // send userData object
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            // Registration successful
            navigate('/login'); // Redirect to login page after registration
        } catch (error) {
            console.error('Registration Error:', error);
            // Handle registration errors
        }
    };
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Name input */}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            {/* Email input */}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
                <input type="text" name="street" value={address.street} onChange={handleAddressChange} placeholder="Street" required />
                <input type="text" name="city" value={address.city} onChange={handleAddressChange} placeholder="City" required />
                <input type="text" name="state" value={address.state} onChange={handleAddressChange} placeholder="State" required />
                <input type="text" name="zip" value={address.zip} onChange={handleAddressChange} placeholder="Zip Code" required />
                <input type="text" name="country" value={address.country} onChange={handleAddressChange} placeholder="Country" required />
            {/* Password input */}
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;
