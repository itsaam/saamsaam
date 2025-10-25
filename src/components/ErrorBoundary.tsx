import { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: unknown) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{padding: '40px', textAlign: 'center'}}>
                    <h1>⚠️ Une erreur est survenue</h1>
                    <p>{this.state.error?.message}</p>
                    <button onClick={() => window.location.reload()}>Recharger la page</button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

