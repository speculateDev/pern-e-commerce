import { LogIn } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { useState } from 'react';

function LoginForm() {
  const { login, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className="space-y-6 text-sm"
      onSubmit={(e) => {
        e.preventDefault();
        login({ email, password });
      }}
    >
      <div className="form-control">
        <label className="mb-2 " htmlFor="email">
          Email Address
        </label>
        <input
          value={email}
          type="text"
          id="email"
          className="rounded-md input input-bordered px-3 py-2 bg-transparent"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="mb-2" htmlFor="password">
          Password
        </label>
        <input
          value={password}
          placeholder="••••••••"
          type="password"
          id="password"
          className="rounded-md input input-bordered px-3 py-2 bg-transparent"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn w-full btn-primary">
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            <span>Loading...</span>
          </>
        ) : (
          <>
            <LogIn />
            <span>Log in</span>
          </>
        )}
      </button>
    </form>
  );
}

export default LoginForm;
