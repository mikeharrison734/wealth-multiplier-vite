import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../store/account-context";
import Account from "./Account";

export default function AccountContainer() {
  const { accounts, addAccount, removeAccount } = useContext(AccountContext);
  const [activeAccountId, setActiveAccountId] = useState(1);

  if (activeAccountId > accounts[accounts.length-1].id) {
    setActiveAccountId(accounts[accounts.length-1].id);
  }

  function handleSetActiveAccountId(id) {
    setActiveAccountId(id);
  }

  function handleRemoveAccount(id) {
    removeAccount(id);
  }

  function handleAddAccount() {
    addAccount();
    setActiveAccountId(Number((accounts[accounts.length-1]).id)+1);
  }

  return (
    <div className="account-container">
      <div id="tabs" className="d-flex w-100 border-bottom border-white">
        {accounts.map((account) => {
          let cssClasses = "bg-transparent text-white account-button border-0";
          if (account.id === activeAccountId) {
            cssClasses = "account-button open-tab border-0";
          }
          return (
            <div className="account-tab-button" key={account.id}>
              <button
                className={cssClasses}
                onClick={() => handleSetActiveAccountId(account.id)}
              >Account {account.id} </button>
              <button className="bg-transparent text-white border-0 tab-action-button" onClick={() => handleRemoveAccount(account.id)}>x</button>
            </div>
          );
        })}
        <button
          className="bg-transparent text-white tab-action-button"
          onClick={handleAddAccount}
        >
          +
        </button>
      </div>
      {accounts.length > 0 && activeAccountId && <Account accountId={activeAccountId} />}
    </div>
  );
}
