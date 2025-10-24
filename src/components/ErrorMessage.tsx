import'../styles/ErrorMessage.css';
interface ErrorMessageProps {
    message: string;
    onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Oups ! Une erreur est survenue</h2>
            <p>{message}</p>
            <button className="retry-btn" onClick={onRetry}>
                🔄 Réessayer
            </button>
        </div>
    );
}

