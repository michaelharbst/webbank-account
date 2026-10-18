import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AccountAlert from "./AccountAlert.jsx";

describe("AccountAlert", () => {
  it("shows a neutral status when the balance is zero", () => {
    render(<AccountAlert balance={0} />);

    const status = screen.getByRole("status");

    expect(status).toHaveTextContent("Account balance is zero");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("shows a positive status when the balance is above zero", () => {
    render(<AccountAlert balance={250} />);

    const status = screen.getByRole("status");

    expect(status).toHaveTextContent("Account is in credit");
  });

  it("announces an overdraft when the balance is below zero", () => {
    render(<AccountAlert balance={-200} />);

    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent("Account overdrawn by");
    expect(alert).toHaveTextContent("200,00 kr.");
    expect(alert).toHaveAttribute("aria-live", "assertive");
  });
});