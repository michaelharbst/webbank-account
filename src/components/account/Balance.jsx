import "./Balance.css";

function Balance({ balance }) {
  const formattedBalance = balance.toLocaleString("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const balanceClass =
    balance < 0
      ? "balance-card__amount balance-card__amount--negative"
      : "balance-card__amount balance-card__amount--positive";

  return (
    <section className="card balance-card h-100">
      <div className="card-body">
        <p className="balance-card__label mb-2">Current balance</p>
        <h2 className={balanceClass} aria-live="polite">
          {formattedBalance} kr.
        </h2>
      </div>
    </section>
  );
}

export default Balance;
