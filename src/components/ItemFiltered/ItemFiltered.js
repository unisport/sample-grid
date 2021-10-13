import './ItemFiltered.css'
import data from '../../data/data.json'


const new_data = data.products
const checkDiscount = (new_data) => {
    return new_data.discount_percentage > 0;
}
const data_with_discount = new_data.filter(checkDiscount)
console.log(data_with_discount);
const sorted_data_with_discount = data_with_discount.sort(function (a, b) { return a.discount_percentage - b.discount_percentage });

const ItemFiltered = sorted_data_with_discount.map((product) => {
    const productStockLength = product.stock.length
    const productStock = []
    const productStockFinder = product.stock.forEach((product) => {
        productStock.push(product.name + ' ')
    })
    const productPrice = product.price / 100
    const currencyDKK = product.prices.currency === "DKK" ? product.prices.currency : "DKK";
    const oldPrice = product.min_max_prices.price_old
    return (

        <div className="product-container" key={product.id}>
            <p className="product-sale">{product.discount_percentage} %</p>
            <img className="product-img" src={product.image} alt="product"></img>
            <p className="product-name">{product.name}</p>
            <p className="product-stock">SIZE: {productStockLength > 3 ? "Many sizes available" : productStock}</p>
            <div className="product-info-container">
                <div className="product-price-container">
                    <p className="product-price">{productPrice} {currencyDKK}</p>
                    <p className="product-old-price">{product.discount_percentage > 0 ? oldPrice : ""}</p>
                </div>
                <div className="product-button-container">
                    <p className="product-button">buy now</p>
                </div>
            </div>
        </div>
    )
})

export default ItemFiltered