import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { CajaLogo } from './ui/caja-logo';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex items-center justify-center px-6 py-12">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 rounded-full bg-muted hover:bg-muted/80 transition-all duration-200 hover:scale-105"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="h-4 w-4 text-foreground" />
        ) : (
          <Moon className="h-4 w-4 text-foreground" />
        )}
      </button>

      <div className="w-full max-w-sm space-y-16">
        {/* Logo & Title */}
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <CajaLogo 
              size="xl" 
              variant="default"
              animated={true}
            />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Bem-vindo
            </h1>
            <p className="text-base text-muted-foreground font-normal">
              Entre na sua conta do Cajá Talks
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-3">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base rounded-xl border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base rounded-xl border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 p-1 rounded-md hover:bg-muted/50"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 focus:ring-2 bg-background"
                />
                <label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                  Lembrar de mim
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Esqueceu a senha?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </div>
              ) : (
                'Continuar'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground font-normal">ou</span>
            </div>
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-sm font-normal text-muted-foreground">
              Não tem uma conta?{' '}
              <button className="font-medium text-primary hover:text-primary/80 transition-colors duration-200">
                Criar conta
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}