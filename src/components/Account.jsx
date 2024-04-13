import { useContext } from "react";
import "../index.css";
import NumberInput from "./NumberInput";
import { AccountContext } from "../store/account-context";
import currencyFormatter from "../util/currency";

export default function Account({ accountId }) {
  const { currentAge, retirementAge, accounts, updateAccount } = useContext(AccountContext);
  const account = accounts.find((account) => account.id === accountId);

  console.log(`Account currentAge: ${currentAge}`);

  const currentInvestments = account.currentInvestments;
  const monthlyInvestment = account.monthlyInvestment;
  const monthlyInvestmentGrowth = account.monthlyInvestmentGrowth;

  const currentAgeInMonths = currentAge * 12.0;
  const retirementAgeInMonths = retirementAge * 12.0;

  function calculateTotalCash() {
    let currentROI = 5.5 + (retirementAge - currentAge) * 0.1;
    if (currentROI > 10.0) currentROI = 10.0;
    let currentMonthlyInvestment = monthlyInvestment;

    let tempTotalCash = currentInvestments;
    for (let i = currentAgeInMonths; i < retirementAgeInMonths; i++) {
      if (i > 0 && i % 12.0 === 0) {
        if (i / 12.0 > 20) {
          currentROI -= 0.1;
        }

        currentMonthlyInvestment =
          currentMonthlyInvestment * (1 + monthlyInvestmentGrowth / 100.0);
      }

      tempTotalCash =
        tempTotalCash * (1 + currentROI / 100 / 12.0) +
        parseFloat(currentMonthlyInvestment);
    }

    account.totalCashAtRetirement = tempTotalCash;
  }

  function calculateTotalCashAtRetirement(e) {
    e.preventDefault();

    const fd = new FormData(e.target);

    let invalidInput = false;
    fd.forEach((input) => {
      if (isNaN(input)) {
        invalidInput = true;
        return;
      }
    });

    if (invalidInput) return;

    calculateTotalCash();

    updateAccount({ ...account });
  }

  return (
    <form
      onSubmit={calculateTotalCashAtRetirement}
      className="mt-4 d-flex flex-column align-items-center input-form"
    >
      <NumberInput
        id="current-investments"
        label="Total Cash Currently Invested:"
        stateUpdateFn={(e) =>
          updateAccount({ ...account, currentInvestments: e.target.value })
        }
        value={account.currentInvestments}
      />
      <NumberInput
        id="monthly-investment"
        label="Monthy Investment:"
        stateUpdateFn={(e) =>
          updateAccount({ ...account, monthlyInvestment: e.target.value })
        }
        value={account.monthlyInvestment}
      />
      <NumberInput
        id="monthly-investment-growth"
        label="Annual growth in monthly investment:"
        stateUpdateFn={(e) =>
          updateAccount({ ...account, monthlyInvestmentGrowth: e.target.value })
        }
        value={account.monthlyInvestmentGrowth}
      />
      <button type="submit" className="btn btn-primary main-button m-2">
        Calculate
      </button>
      <h3 className="mt-2">
        Total Cash At Retirement: {currencyFormatter.format(account.totalCashAtRetirement)}
      </h3>
    </form>
  );
}
