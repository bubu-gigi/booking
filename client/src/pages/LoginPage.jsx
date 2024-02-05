import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContex";

export default function LoginPage() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLoginSubmin(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post('/login', {email,password});
            setUser(response.data);
            alert("Login successfully.");
            setRedirect(true);
        } catch (e) {
            alert("Login failed. Please try later.")
        }
    }

    if (redirect) {
        return <Navigate to={'/account'} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="-mt-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmin}>
                    <input type="email" 
                    placeholder='your@email.com' 
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" 
                    placeholder="password" 
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center pt-2 text-gray-500">
                        Don't have an account yet?
                        <Link className="underline text-black" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}