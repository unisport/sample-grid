import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import ProductCard from './components/ProductCard/ProductCard'
import { IProduct } from './utils/types'
import { FaArrowUp } from 'react-icons/fa'

function App() {
  const [productData, setProductData] = useState<IProduct[]>([])
  const [sortByLowestDiscount, setSortByLowestDiscount] = useState<
    IProduct[] | []
  >([])
  const [loading, setLoading] = useState<boolean>(false)
  const [backToTopButton, setBackToTopButton] = useState<boolean>(false)

  //we only t to fetch data when component mounts, we add empty array to avoid activating it on component updates

  useEffect(() => {
    const url =
      'https://www.unisport.dk/api/products/batch/?list=200776%2C223466%2C222649%2C217763%2C217769%2C213591%2C225707%2C222189%2C217706%2C213590%2C200777%2C223214%2C223002%2C223226%2C213576%2C225811%2C226350%2C217758%2C226546%2C217740%2C222822%2C198079%2C225701%2C217710%2C222824%2C226542%2C222411%2C222191%2C225705%2C226547%2C222192%2C217793%2C206016%2C225964%2C223191%2C190711%2C222316%2C217810%2C226102%2C222314'
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const json = await response.json()
        const data = json.products

        setProductData(data)
        setLoading(true)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // first we want to check if the array is not empty, than we can apply sorting by lowest discount

  useEffect(() => {
    if (productData.length != 0) {
      const sortProductsByLowestDiscount = () => {
        //since our array is multidimensional we need to make deep copy

        const productArrayCopy = JSON.parse(JSON.stringify(productData))

        // than we sort array on the base of the discount included in prices

        productArrayCopy.sort(
          (
            a: { prices: { discount_percentage: number } },
            b: { prices: { discount_percentage: number } }
          ) => {
            return a.prices.discount_percentage - b.prices.discount_percentage
          }
        )
        setSortByLowestDiscount(productArrayCopy)
        setLoading(true)
      }
      sortProductsByLowestDiscount()
    }

    // if there has been an update in the products data, we want to re-apply the sorting again
  }, [productData]) // eslint-disable-line react-hooks/exhaustive-deps

  // We want to show the back to top button when user will scroll a little bit

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setBackToTopButton(true)
      } else {
        setBackToTopButton(false)
      }
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Coding Task</p>
      </header>
      <main>
        {loading ? (
          <section className='product-list'>
            <h1>Products</h1>
            <div className='product-container'>
              {sortByLowestDiscount.map((product) => (
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.product_main_image}
                  prices={product.prices}
                ></ProductCard>
              ))}
            </div>
          </section>
        ) : (
          <div className='loader-container'>
            <div className='loader'></div>
          </div>
        )}
        {backToTopButton && (
          <button onClick={scrollToTop} className='scroll-to-top-button'>
            <FaArrowUp />
          </button>
        )}
      </main>
    </div>
  )
}

export default App
