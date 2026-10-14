import "./AccountAlert.css";

function AccountAlert({ balance }) {
  const isOverdrawn = balance < 0;
  const hasPositiveBalance = balance > 0;

  const overdraftAmount = Math.abs(balance).toLocaleString("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let statusText = "Account balance is zero";

  if (hasPositiveBalance) {
    statusText = "✓ Account is in credit";
  }

  if (isOverdrawn) {
    statusText = `Account overdrawn by ${overdraftAmount} kr.`;
  }

  return (
    <section
      className={`card account-status h-100 ${
        isOverdrawn ? "account-status--overdrawn" : "account-status--credit"
      }`}
      role={isOverdrawn ? "alert" : "status"}
      aria-live={isOverdrawn ? "assertive" : "polite"}
    >
      <div className="card-body">
        <p className="text-secondary small mb-1">Account status</p>

        <h3 className="account-status__text mb-0">{statusText}</h3>
      </div>
    </section>
  );
}

export default AccountAlert;
