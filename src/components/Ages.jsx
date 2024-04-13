import { useContext } from "react";
import { AccountContext } from "../store/account-context";
import NumberInput from "./NumberInput";

export default function Ages() {
    const { currentAge, retirementAge, updateCurrentAge, updateRetirementAge } = useContext(AccountContext);

    return (
        <div
            className="mt-4 d-flex flex-column align-items-center input-form"
        >
            <NumberInput
                id="current-age"
                label="Current Age:"
                stateUpdateFn={(e) =>
                    updateCurrentAge(e.target.value)
                }
                value={currentAge}
            />
            <NumberInput
                id="retirement-age"
                label="Retirement Age:"
                stateUpdateFn={(e) =>
                    updateRetirementAge(e.target.value)
                }
                value={retirementAge}
            />
        </div>
    );
}