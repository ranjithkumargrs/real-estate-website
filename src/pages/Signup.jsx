import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAppContext()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    setUser({ name: name.trim(), email })
    toast.success('Your account is ready. Welcome!')
    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-visual"><h2>Make room for the next chapter.</h2></div>
      <div className="auth-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <span className="eyebrow">A place to begin</span>
          <h1>Create an account</h1>
          <p>Save the homes you love and keep your search close.</p>
          <div className="form-stack">
            <label className="field"><span>Full name</span><input autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label>
            <label className="field"><span>Email address</span><input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
            <label className="field"><span>Password</span><input type="password" autoComplete="new-password" minLength="6" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" /></label>
            <button className="button" type="submit">Create my account</button>
          </div>
          <div className="form-foot">Already have an account? <Link to="/login">Log in</Link></div>
          <p className="form-foot">Demo experience: your account stays in this browser only.</p>
        </form>
      </div>
    </div>
  )
}

export default Signup
