import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <AlertTriangle className="w-full h-full" />
            </div>
            
            <h1 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              Algo deu errado
            </h1>
            
            <p className="text-[var(--muted-foreground)] mb-6">
              Ocorreu um erro inesperado. Por favor, tente novamente.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 p-4 bg-[var(--muted)] rounded-lg text-left">
                <summary className="cursor-pointer font-medium mb-2">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="text-xs text-red-600 whitespace-pre-wrap">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            
            <Button onClick={this.handleRetry} className="inline-flex items-center">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}