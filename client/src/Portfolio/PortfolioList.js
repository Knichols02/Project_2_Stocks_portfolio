import {stock, deleteStock} from "../Services/PortfolioService";
import Portfolio from './Portfolio.js';

const PortfolioList = ({stocks}) => {
    let portfolioTotal = 0

    const portfolioInfo = stocks.map(stock => {
        portfolioTotal += stock.price;

        return (
        <Portfolio 
        key = {stock._id}
        stock ={stock} 
        deleteStock={deleteStock}
        />
        )
    });

    portfolioInfo.push("Current Portfolio: £ " + portfolioTotal);
    return (
        <>
        {portfolioInfo}
        </>
    );
}

export default PortfolioList;