import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../store/loginSlice';
import { useRouter } from 'next/router';

export default function Page() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.login.loading)
  const error = useSelector((state) => state.login.error)
  const user = useSelector((state) => state.login.user)
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginAsync({ username, password }))
  };

  useEffect(() => {
    if (user != null) {
      router.push('/')
    }
  }, [user])

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="flex flex-col h-screen self-center">
        <h1>Login</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

    </main>
  )
}
