import { Fragment, useEffect,useState } from 'react'
import axios from "axios"
import {Link} from 'react-router-dom';
export default function Home(){
const[products,setProducts]=useState();
const [error, setError] = useState('');
const getProducts = async () => {
    
    try {   
       const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data);
      console.log(response.data);
    } catch (err) {
      
      setError(err.message || 'Error fetching products');
    }
  };
useEffect(() =>{
   getProducts()
  },[])
  return (
    <Fragment>
      <Link to="/Sign" className="btn btn-secondary mb-3">&larr; Sign </Link>
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {error && <div className="alert alert-danger">{error}</div>}
          {products && products.length > 0 ? (
            products.map(product => (
              <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={product._id}>
                <div className="card p-3 rounded">
                  <img className="card-img-top mx-auto" 
                    style={{ width: "200px", height: "200px", objectFit: "contain" }}
                    src={product.images && product.images[0]
                      ? `http://localhost:8000${product.images[0].image}`: "/default.jpg"} alt={product.name}/>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      <Link to="#">{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                      <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(product.ratings || 0) * 20}%` }}></div>
                      </div>
                    </div>
                    <p className="card-text">${product.price}</p>
                    <Link to={`/viewDetail/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
      </section>
    </Fragment>
  );
}