const baseStockURL = 'http://localhost:3000/api/stock/';

export const getStockIndex = (indexName) => {
    let url = baseStockURL + 'index/' + indexName
    console.log(url)
    return fetch(url)
    .then(res => res.json())
};

export const getStockSymbol = (symbol) => {
    let url = baseStockURL + 'company/' + symbol
    console.log(url)
    return fetch(url)
    .then(res => res.json())
};
