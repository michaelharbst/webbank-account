import "./MonthlySummary.css";

function MonthlySummary({
  selectedMonth = "all",
  monthlyIncome,
  monthlyExpenses,
}) {
  const formattedIncome = monthlyIncome.toLocaleString("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedExpenses = monthlyExpenses.toLocaleString("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let formattedMonth = "";

  if (selectedMonth !== "all") {
    const [year, month] = selectedMonth.split("-").map(Number);

    const monthDate = new Date(year, month - 1, 1);

    formattedMonth = monthDate.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  }

  const incomeLabel =
    selectedMonth === "all" ? "Total income" : `Income · ${formattedMonth}`;

  const expensesLabel =
    selectedMonth === "all" ? "Total expenses" : `Expenses · ${formattedMonth}`;

  return (
    <section className="monthly-summary h-100">
      <div className="row g-3 h-100">
        <div className="col-12 col-sm-6">
          <div className="card monthly-summary__income h-100">
            <div className="card-body">
              <p className="text-secondary small mb-1">{incomeLabel}</p>

              <h3 className="monthly-summary__amount mb-0">
                {formattedIncome} kr.
              </h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6">
          <div className="card monthly-summary__expenses h-100">
            <div className="card-body">
              <p className="text-secondary small mb-1">{expensesLabel}</p>

              <h3 className="monthly-summary__amount mb-0">
                {formattedExpenses} kr.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MonthlySummary;
