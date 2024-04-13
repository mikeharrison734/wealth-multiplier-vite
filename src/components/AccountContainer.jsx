import { useContext, useState } from "react";
import { AccountContext } from "../store/account-context";
import Account from "./Account";

export default function AccountContainer() {
  const { accounts, addAccount } = useContext(AccountContext);
  const [activeAccountId, setActiveAccountId] = useState();

  function handleSetActiveAccountId(id) {
    setActiveAccountId(id);
  }

  return (
    <div className="account-container">
      <div id="tabs" className="d-flex w-100 border-bottom border-white">
        {accounts.map((account) => {
          let cssClasses = "bg-transparent text-white account-button";
          if (account.id === activeAccountId) {
            cssClasses = "account-button open-tab";
          }
          return (
            <button
              key={account.id}
              className={cssClasses}
              onClick={() => handleSetActiveAccountId(account.id)}
            >
              Account {account.id}
            </button>
          );
        })}
        <button
          className="bg-transparent text-white add-button"
          onClick={addAccount}
        >
          +
        </button>
      </div>
      {accounts.length > 0 && activeAccountId && <Account accountId={activeAccountId} />}
    </div>
  );
}
