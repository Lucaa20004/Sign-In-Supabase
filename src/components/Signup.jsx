import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState("")

  const {session , signUpNewUser} = UserAuth()
  const Navigate = useNavigate();
  console.log(session)

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);

      if(result.succes) {
        Navigate("/dashboard");
      }
    } catch(err) {
      setError("an error occured");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
        <form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
            <h2 className="font-bold pb-2">Sign up Today !</h2>
            <p>
                 Already have an account ? <Link to="/signin">Sign in!</Link>
            </p>
            <div className="flex flex-col py-4">
              <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-neutral-900 p-3 mt-4 rounded-2xl" type="email" />
              <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="bg-neutral-900 p-3 mt-4 rounded-2xl" type="password"  />
              <button type="submit"  disabled={loading} className="mt-4 w-full">Sign Up!</button>
            </div>
        </form>
    </div>
  )
}

export default Signup