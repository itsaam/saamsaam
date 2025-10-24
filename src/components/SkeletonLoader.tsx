import '../styles/SkeletonLoader.css';

export default function SkeletonLoader() {
    return (
        <div className="skeleton-grid">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                    <div className="skeleton-img"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text short"></div>
                </div>
            ))}
        </div>
    );
}
