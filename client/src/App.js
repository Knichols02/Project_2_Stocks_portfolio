import {useState, useEffect} from "react";
import Chart from './StockData/StockChart'
import {chartInstance} from './StockData/StockChart'
import {getPortfolio} from "./Services/PortfolioService";
import StockList from "./StockData/StockList";
import StockForm from './StockData/StockForm';
import SearchForm from "./SearchForm";
import './App.css'; 
import { ScrollView } from "@cantonjs/react-scroll-view";
import PortfolioList from "./Portfolio/PortfolioList";
import {deleteStock as apiDeleteStock} from "./Services/PortfolioService";


function App() {
  const [stocks, setPortfolio] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [portfolioTotal, setPortfolioTotal] = useState(0);


  useEffect(() => {
    getPortfolio()
    .then((stocks) => {
      setPortfolio(stocks);
    })  
    console.log(stocks)
  }, [])

  // This is the local (client-side) update
  const addStock = (stock) => {
    const buyStock = stock.map(s => s);
    buyStock.push(stock);
    setPortfolio(buyStock);
  }

  const findStocks = (code) => {
    // need to add code in here to use an id from the (full) stocks
    // list so that it can be sent back 

    /*
    PortfolioService.getSearchStock(code)
    .then(set search result form data)
    */
    
    // Need to add code in here - probably will need a useState for the search field too.
  }

  const updateStock = updatedStock => {
    //update in DB 
    updateStock(updatedStock).then(() =>{
  
    const updatedStocksIndex = stocks.findIndex(s => s._id === updatedStock._id);

    const updatedStocks = [...stocks];
    updatedStocks[updatedStocksIndex] = updatedStocks;

    setPortfolio(updatedStocks);
  })
  };

  const deleteStock = (id) => {

    apiDeleteStock(id).then(() =>{
      const removeStock = stocks.map(s => s);

      const stockToDelete = removeStock.map(s => s._id).indexOf(id);

      removeStock.splice(stockToDelete, 1);

      setPortfolio(removeStock);
    })
}

  const onStockSelected = (symbol, name, price) => {
    setSymbol(symbol);
    setName(name);
    setPrice(price);
  }

  const onPurchase = (symbol, name, price, volume) => {
    
    // Create object to hold purchase details
    const purchaseObject = {
                        symbol, 
                        name,
                        price, 
                        volume, 
    }
    
    // Update portfolio with new shares
    return purchaseObject

  }



  return (
    <>
    <header>
      <h2>NIK Ltd</h2>
      <section className="advertisment">
        <h2>Buy Stocks Online Today</h2>
        <h3>Start Building your Portfolio </h3>
      </section>
    </header>
    <hr className="header-hr"></hr>
    
    <SearchForm searchStock={findStocks} />
    <br></br>
    <div className="stockinfo ">
    <StockForm symbol={symbol} name={name} price={price} onPurchase={onPurchase} />
    <Chart/>
    <p className="form-heading">Add To Your Portfolio Now ↘️</p>
    </div>
    <h3> Latest Market Trends</h3>
    <ScrollView className="scrollview-data">
        <StockList onStockSelected={onStockSelected}/>
    </ScrollView>
    
      <br></br>
      <div idName="portfolio-heading" ><h3>Client Portfolio</h3></div>
      
      <br></br>
      <PortfolioList className="portfolio-table" stocks={stocks} deleteStock={deleteStock} portfolioTotal ={portfolioTotal}/>

      <br></br>
      <footer>
        <hr className="footer-hr"></hr>
        <div className="reviews">
          <h5>What our clients say 💬
            <br></br>
              ❝Simple to use. Helpful information about different types of investment, easy to understand even if you don't know anything about investing❞</h5>
        </div>
      </footer>
      </>
  );
}

export default App;
