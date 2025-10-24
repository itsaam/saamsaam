
export const ErrorBox = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="error-box">
    <p>{message}</p>
    <button onClick={onRetry}>Réessayer</button>
  </div>
);