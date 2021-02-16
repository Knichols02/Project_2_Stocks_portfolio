import React from 'react';
import {addStock} from '../Services/PortfolioService'
import {useState} from 'react'

const StockForm = ({symbol, name, price, onPurchase}) =>{

    const [volume, setVolume] = useState(0)

    const handleVolumeChange = event => setVolume(event.target.value)

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const stockObject = onPurchase(symbol, name, price, volume);
        addStock(stockObject)
        .then(() => window.location.reload()
        
        )}
    
    return(
       

        <form className="stock-form" onSubmit={handleSubmit}>

            <label for="symbol">Symbol</label>
            <input type="text" id="symbol" name="symbol" value={symbol}/>

            <label for="name">Name</label>
            <input type="text" id="name" name="name" value={name} />

            <label for="price">Price</label>
            <input type="text" id="price" name="price" value={price}/>

            <label for="volume">Volume</label>
            <input onChange={handleVolumeChange} 
                type="number" 
                id="volume" 
                name="volume" 
                placeholder="number of shares" 
                value = {volume}
                autofocus 
                required />

            <input
                type="submit"
                value="Buy"
                
            />

        </form>
        
    )};
    
export default StockForm; 