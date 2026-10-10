import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (event) => {
    event.preventDefault()
    setUser({ name: email.split('@')[0], email })
    toast.success('Welcome back!')
    navigate(location.state?.from?.pathname ?? '/')
  }

  return (
    <div className="auth-page">
      <div className="auth-visual"><h2>There’s no place like the one that feels like yours.</h2></div>
      <div className="auth-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <span className="eyebrow">Welcome back</span>
          <h1>Log in</h1>
          <p>Pick up right where you left off.</p>
          <div className="form-stack">
            <label className="field"><span>Email address</span><input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
            <label className="field"><span>Password</span><input type="password" autoComplete="current-password" minLength="6" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" /></label>
            <button className="button" type="submit">Log in to your account</button>
          </div>
          <div className="form-foot">New to Ranjith Estates? <Link to="/signup">Create an account</Link></div>
          <p className="form-foot">Demo experience: any valid email and 6+ character password will work.</p>
        </form>
      </div>
    </div>
  )
}

export default Login
