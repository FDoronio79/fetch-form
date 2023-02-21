import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'

export default function UserCreation() {
    const [userData, setUData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [occupation, setOccupation] = useState('');
    const [state, setState] = useState('');

    const url = 'https://frontend-take-home.fetchrewards.com/form'


    const handleNameChange = (e) => {
        const val = e.target.value;
        setName(val);
    }
    const handleEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val);
    }
    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
    }
    const handleOccupationChange = (e) => {
        const val = e.target.value;
        setOccupation(val);
    }
    const handleStateChange = (e) => {
        const val = e.target.value;
        setState(val);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            'name': name,
            'email': email,
            'password': password,
            'occupation': occupation,
            'state': state
        }
        axios.post(url, data)
            .then((response) => {
                setName('');
                setEmail('');
                setPassword('');
                setOccupation('');
                setState('');
            })
        alert("SUCCESS")
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            setUData(response.data);
        };

        fetchData();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="col-6">
                <div className="shadow p-4 mt-4">
                    <h2 className="text-center">Create User</h2>
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <p> Name: </p> 
                                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" maxLength="17" className="form-control" />                        </div>
                        <div className="form-floating mb-3">
                            <p>Email:</p>
                            <input onChange={handleEmailChange} value={email} placeholder="Email" required type="text" name="email" id="email" className="form-control" />
                        </div>
                        <div className="form-floating mb-3">
                            <p htmlFor="password">Password: </p>
                            <input onChange={handlePasswordChange} value={password} placeholder="password" required type="password" name="password" id="password" className="form-control" />
                        </div>
                        <div className="form-floating mb-3">
                            <p>Occupation: </p>
                            <select onChange={handleOccupationChange} value={occupation} placeholder="Occupation" required name="occupation" id="occupation" className="form-select">
                                <option value="">Select Occupation </option>
                                {userData.occupations && userData.occupations.map(occupation => {
                                    return (
                                        <option key={occupation} value={occupation}>{occupation}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <p>State: </p>
                            <select onChange={handleStateChange} value={state} placeholder="State" required name="state" id="state" className="form-select">
                                <option value="">Select State </option>
                                {userData.states && userData.states.map((state) => {
                                    return (
                                        <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}