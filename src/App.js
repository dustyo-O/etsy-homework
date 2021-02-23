import * as data from './data/etsy.json';
import './App.css';
import Listing from './components/Listing/Listing';

console.log(data.default);
function App() {
  return (
    <Listing items={data.default}/>
  );
}

export default App;
