import { useContext } from "react"
import { AccountContext } from "../store/account-context";
import currencyFormatter from "../util/currency";

export default function Totaliser() {
    const { accounts } = useContext(AccountContext);

    let totalCash = 0;

    accounts.forEach((account) => {
        totalCash += Number(account.totalCashAtRetirement);
    });

    return <div className="totaliser">
        <h1>Total across all accounts: {currencyFormatter.format(totalCash)}</h1>
    </div>
}