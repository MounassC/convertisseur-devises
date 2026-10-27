import { useEffect, useState } from "react";
import CurrencySelect from "./components/CurrencySelect";
import "./App.css";

const CURRENCIES = ["XOF", "EUR", "USD", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR"];
const API_URL = "https://open.er-api.com/v6/latest/USD";

export default function App() {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("XOF");
  const [to, setTo] = useState("EUR");
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRates() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Réponse invalide du serveur");
        }
        const data = await response.json();
        setRates(data.rates);
      } catch {
        setError("Impossible de charger les taux de change. Réessayez plus tard.");
      } finally {
        setLoading(false);
      }
    }
    loadRates();
  }, []);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  if (loading) return <p className="app">Chargement des taux…</p>;
  if (error) return <p className="app error">{error}</p>;

  const result = (Number(amount) / rates[from]) * rates[to];

  return (
    <main className="app">
      <h1>Convertisseur de devises</h1>

      <label>
        Montant
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <div className="row">
        <CurrencySelect label="De" value={from} onChange={setFrom} options={CURRENCIES} />
        <button type="button" onClick={swap}>⇄</button>
        <CurrencySelect label="Vers" value={to} onChange={setTo} options={CURRENCIES} />
      </div>

      <p className="result">
        {Number(amount).toLocaleString("fr-FR")} {from} ={" "}
        {result.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} {to}
      </p>

      <p className="credit">
        <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
      </p>
    </main>
  );
}