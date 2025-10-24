import { useEffect, useState, useMemo, useContext, type ChangeEvent } from "react";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { ErrorBox } from "./ErrorBox";
import { useFavorites } from "../hooks/useFavorites";
import { ThemeContext } from "../contexts/theme";
import "./../App.css";

type Item = { id: string; name: string; description?: string; date?: string };

export const ItemList = () => {
    const { isFav, toggle } = useFavorites();
    const { theme } = useContext(ThemeContext);

    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sort, setSort] = useState("name-asc");
    const [query, setQuery] = useState("");

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            // Remplacez par votre service/API si nécessaire
            const res = await fetch("/api/items");
            if (!res.ok) throw new Error("Erreur réseau");
            const data = await res.json();
            setItems(data);
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            setError(msg || "Erreur");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredSorted = useMemo(() => {
        const q = query.trim().toLowerCase();
        const list = items.filter(
            (it) =>
                !q ||
                it.name.toLowerCase().includes(q) ||
                (it.description || "").toLowerCase().includes(q)
        );
        const copy = [...list];
        switch (sort) {
            case "name-desc":
                return copy.sort((a, b) => b.name.localeCompare(a.name));
            case "date-desc":
                return copy.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
            case "date-asc":
                return copy.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
            default:
                return copy.sort((a, b) => a.name.localeCompare(b.name));
        }
    }, [items, sort, query]);

    if (loading) return <Spinner />;

    if (error) return <ErrorBox message={error} onRetry={fetchItems} />;

    return (
        <section className={"list fade-in " + theme}>
            <div className="controls">
                <input
                    placeholder="Rechercher..."
                    value={query}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                />
                <select value={sort} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}>
                    <option value="name-asc">Nom ↑</option>
                    <option value="name-desc">Nom ↓</option>
                    <option value="date-desc">Date ↓</option>
                    <option value="date-asc">Date ↑</option>
                </select>
            </div>
            <div className="grid">
                {filteredSorted.map((item) => (
                    <Card key={item.id} item={item} fav={isFav(item.id)} onToggle={toggle} />
                ))}
                {filteredSorted.length === 0 && <p className="muted">Aucun résultat</p>}
            </div>
        </section>
    );
};