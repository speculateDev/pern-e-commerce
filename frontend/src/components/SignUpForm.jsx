import { UserPlus } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { useState } from 'react';

function SignUpForm() {
  const { signup, loading } = useAuthStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      signup({ username, email, password, confirmPassword });
    }
  }

  return (
    <div className="space-y-6 text-sm" onKeyDown={handleKeyDown}>
      <div className="form-control">
        <label htmlFor="username" className="mb-2">
          Username
        </label>

        <input
          placeholder="example"
          id="username"
          type="text"
          className="rounded-md input input-bordered px-3 py-2 bg-transparent"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="email" className="mb-2">
          Email Address
        </label>

        <input
          placeholder="example@example.com"
          id="email"
          type="text"
          className="rounded-md input input-bordered px-3 py-2 bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="password" className="mb-2">
          Password
        </label>

        <input
          placeholder="••••••••"
          id="password"
          type="password"
          className="rounded-md input input-bordered px-3 py-2 bg-transparent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="confirmPassword" className="mb-2">
          Confirm Password
        </label>

        <input
          placeholder="••••••••"
          id="confirmPassword"
          type="password"
          className="rounded-md input input-bordered px-3 py-2 bg-transparent"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        className="btn w-full btn-primary"
        onClick={() => signup({ username, email, password, confirmPassword })}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            <span>Loading...</span>
          </>
        ) : (
          <>
            <UserPlus />
            <span>Sign Up</span>
          </>
        )}
      </button>
    </div>
  );
}

export default SignUpForm;
