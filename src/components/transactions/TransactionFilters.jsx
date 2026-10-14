function TransactionFilters({
  selectedMonth,
  onMonthChange,
  availableMonths,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <section className="mb-3">
      <div className="row g-2">
        <div className="col-12 col-md-4">
          <label htmlFor="selectedMonth" className="form-label small mb-1">
            Month
          </label>

          <select
            id="selectedMonth"
            className="form-select form-select-sm"
            value={selectedMonth}
            onChange={(event) => onMonthChange(event.target.value)}
          >
            <option value="all">All months</option>

            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {new Date(`${month}-01T00:00:00`).toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <label htmlFor="transactionType" className="form-label small mb-1">
            Type
          </label>

          <select
            id="transactionType"
            className="form-select form-select-sm"
            value={selectedType}
            onChange={(event) => onTypeChange(event.target.value)}
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <label
            htmlFor="transactionCategory"
            className="form-label small mb-1"
          >
            Category
          </label>

          <select
            id="transactionCategory"
            className="form-select form-select-sm"
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="all">All categories</option>
            <option value="salary">Salary</option>
            <option value="housing">Housing</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="leisure">Leisure</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default TransactionFilters;
