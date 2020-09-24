/**
 * Product
 *
 * @param
 */
import React, {useContext} from "react";
import UserContext from "../context/User";

// TODO: move to helpers
/**
 * priceFormat
 *
 * @param number number
 * @param currencty string
 * @param locale string
 */
const priceFormat = (number, currency, locale) => {
    return number.toLocaleString(locale, {
        style: 'currency',
        currency
    });
}

const Product = (props) => {
    let context = useContext(UserContext);
    return <div className="product_list__item">
            <div>{props.name}</div>
            <div><img src={props.image} /></div>
            <div>{priceFormat((props.price/100), props.currency, context.locale)}</div>
        </div>
}

export default Product;
