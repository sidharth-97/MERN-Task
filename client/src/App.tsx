import "./App.css";
import Barchart from "./components/Chart";
import Statistics from "./components/Statistics";
import Table from "./components/Table";

function App() {
  return (
    <div className="bg-[#1B1A17] min-h-screen">
      <Table />
      <div className="flex w-full justify-between p-10">
         <Statistics />
      <Barchart/>
      </div>
     
    </div>
  );
}

export default App;
