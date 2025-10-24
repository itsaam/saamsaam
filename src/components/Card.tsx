import "./../App.css";

type Item = { id: string; name: string; description?: string; date?: string };

export const Card = ({ item, fav, onToggle }: { item: Item; fav: boolean; onToggle: (id: string) => void }) => {
  return (
    <article className="card">
      <button className={"star " + (fav ? "active" : "")} onClick={() => onToggle(item.id)} aria-label="favori">
        ★
      </button>
      <h3>{item.name}</h3>
      {item.description && <p className="muted">{item.description}</p>}
      {item.date && <small className="muted">{new Date(item.date).toLocaleString()}</small>}
    </article>
  );
};