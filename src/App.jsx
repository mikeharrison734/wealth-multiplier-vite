
import './App.css';
import { Banner } from "./components/Banner.jsx";
import AccountContainer from "./components/AccountContainer.jsx";
import AccountContextProvider from "./store/account-context.jsx";
import Totaliser from "./components/Totaliser.jsx";
import Ages from "./components/Ages.jsx";
import LineChart from './components/LineChart.jsx';

function App() {
  return (
    <div className="wrapper">
      <Banner />
      <AccountContextProvider>
        <Ages />
        <AccountContainer />
        <Totaliser />
        <LineChart />
      </AccountContextProvider>
    </div>
  );
}

export default App
