import { useState } from "react";
import CurrencySelect from "./components/CurrencySelect";
import "./App.css";

const CURRENCIES = ["XOF", "EUR", "USD"];
// Taux fictifs pour le jour 1 : valeur de 1 USD dans chaque devise
const RATES = { USD: 1, EUR: 0.9, XOF: 590 };

export default function App() {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("XOF");
  const [to, setTo] = useState("EUR");

  const result = (Number(amount) / RATES[from]) * RATES[to];

  function swap() {
    setFrom(to);
    setTo(from);
  }

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
    </main>
  );
}