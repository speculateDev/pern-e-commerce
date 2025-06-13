import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-3xl font-bold sm:mx-auto max-w-lg text-center mt-6 text-primary">
        {isLogin ? 'Sign in to POSGRESTORE' : 'Create a POSGRESTORE account'}
      </h1>

      <div className="max-w-md mx-auto mt-9 px-4 sm:px-6 py-6 shadow-md rounded-lg border border-base-content/40">
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? 'New to to POSGRESTORE?' : 'Already have an account'}
          </p>

          <button
            className="mt-2 text-primary/60 hover:text-primary font-medium transition-all duration-300  hover:scale-105"
            onClick={() => setIsLogin((isLogin) => !isLogin)}
          >
            {isLogin ? 'Create a new account' : 'Sign in to your account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
