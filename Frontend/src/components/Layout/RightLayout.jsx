import { TransferMoney, LogoutTimer, Loan, AccountCloseForm } from "../";
import { TimerProvider } from "../../contexts";

function RightLayout() {
  return (
    <>
      <TimerProvider>
        <TransferMoney />
        <Loan />
        <AccountCloseForm />
        <LogoutTimer />
      </TimerProvider>
    </>
  );
}

export default RightLayout;
