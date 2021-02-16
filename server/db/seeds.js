use portfolio;
db.dropDatabase();

db.positions.insertMany([
{
    symbol: "BT.L",
    name: "BT",
    price: "150",
    volume: 10,
    userId: "123456"
}, 

{
    symbol: "AV.L",
    name: "AVIVA",
    price: "348.6",
    volume: 20, 
    userId: "123456"
}
]);