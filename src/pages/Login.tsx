
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 bg-gradient-to-b from-adaptive-dark to-adaptive-secondary/90">
      <Card className="w-full max-w-md bg-white shadow-xl border-0">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-adaptive-primary to-adaptive-secondary flex items-center justify-center text-white text-2xl font-bold">
              A
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:border-adaptive-primary focus:ring-adaptive-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-adaptive-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:border-adaptive-primary focus:ring-adaptive-primary"
                required
              />
            </div>
            
            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-adaptive-primary hover:bg-adaptive-secondary text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
            
            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-adaptive-primary hover:underline">
                Sign up
              </Link>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Demo Accounts</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="w-full border-adaptive-primary text-adaptive-primary hover:bg-adaptive-primary/10"
                onClick={() => {
                  setEmail('teacher@example.com');
                  setPassword('password');
                }}
              >
                Teacher Demo
              </Button>
              <Button
                variant="outline"
                className="w-full border-adaptive-primary text-adaptive-primary hover:bg-adaptive-primary/10"
                onClick={() => {
                  setEmail('student@example.com');
                  setPassword('password');
                }}
              >
                Student Demo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
