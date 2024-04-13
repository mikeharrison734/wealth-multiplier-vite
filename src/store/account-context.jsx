import { createContext, useReducer } from "react";

export const AccountContext = createContext({
  currentAge: 0,
  retirementAge: 0,
  accounts: [],
  updateCurrentAge: () => { },
  updateRetirementAge: () => { },
  addAccount: () => { },
  updateAccount: () => { },
});

function accountReducer(state, action) {
  if (action.type === "ADD_ACCOUNT") {
    const updatedAccounts = [...state.accounts];

    let lastId;
    if (updatedAccounts.length > 0) {
      lastId = updatedAccounts[updatedAccounts.length - 1].id;
    } else {
      lastId = 0;
    }

    updatedAccounts.push({
      id: lastId + 1,
      currentInvestments: 0,
      monthlyInvestment: 0,
      monthlyInvestmentGrowth: 0,
      totalCashAtRetirement: 0,
    });

    return {
      ...state,
      accounts: updatedAccounts,
    };
  }

  if (action.type === "UPDATE_ACCOUNT") {
    const updatedAccounts = [...state.accounts];
    const updatedAccountIndex = updatedAccounts.findIndex(
      (account) => account.id === action.payload.account.id
    );

    const updatedAccount = {
      ...action.payload.account,
    };

    updatedAccounts[updatedAccountIndex] = updatedAccount;

    return {
      ...state,
      accounts: updatedAccounts,
    };
  }

  if (action.type === "UPDATE_CURRENT_AGE") {
    const updatedAge = action.payload;

    return {
      ...state,
      currentAge: updatedAge,
    }
  }

  if (action.type === "UPDATE_RETIREMENT_AGE") {
    const updatedAge = action.payload;

    return {
      ...state,
      retirementAge: updatedAge,
    }
  }
}

export default function AccountContextProvider({ children }) {
  const [accountState, accountDispatch] = useReducer(accountReducer, {
    currentAge: 0,
    retirementAge: 0,
    accounts: [],
  });

  function handleAddAccount() {
    accountDispatch({
      type: "ADD_ACCOUNT",
    });
  }

  function handleUpdateAccount(account) {
    accountDispatch({
      type: "UPDATE_ACCOUNT",
      payload: {
        account,
      },
    });
  }

  function handleUpdateCurrentAge(age) {
    accountDispatch({
      type: "UPDATE_CURRENT_AGE",
      payload: age,
    })
  }

  function handleUpdateRetirementCurrentAge(age) {
    accountDispatch({
      type: "UPDATE_RETIREMENT_AGE",
      payload: age,
    })
  }

  const ctxValue = {
    currentAge: accountState.currentAge,
    retirementAge: accountState.retirementAge,
    accounts: accountState.accounts,
    addAccount: handleAddAccount,
    updateAccount: handleUpdateAccount,
    updateCurrentAge: handleUpdateCurrentAge,
    updateRetirementAge: handleUpdateRetirementCurrentAge,
  };

  return (
    <AccountContext.Provider value={ctxValue}>
      {children}
    </AccountContext.Provider>
  );
}
