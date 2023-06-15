
import React,{useState} from 'react';
import './App.css';
import Category from './components/Category';
import { getCategories , getProducts} from './fetcher';
import CategoryProduct from './components/categoryProduct';

function App() {

  const[categories, setCategories] = useState({errorMessage:'', data: []});
  const[products, setProducts] = useState({errorMessage:'', data: []});
  React.useEffect(() =>{
    const fetchData = async ()=>{
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
    
  }, [])

  const handleCategoryClick = id =>{

    const fetchData = async()=>{
      const responseObject = await getProducts(id);
      setProducts(responseObject);
    }
    fetchData();
  }

  const RenderCategories = ()=>{
    /*
    const categories = [];
    for (let i = 0; i < categories.length; i++) {
      categories.push(<Category key={categories[i].id} id={categories[i].id} title = {categories[i].title}/>)
      
    }
    return categories;
    the above method is using for loop
    */
     // using map 
    return categories.data.map(c =>
      <Category key={c.id} id={c.id} title = {c.title} onCategoryClick={()=> handleCategoryClick(c.id)} />
    );
  
  }

const RenderProducts = ()=>{
  return products.data.map(p=>
    <CategoryProduct key={p.id} {...p}>{p.title}</CategoryProduct>
    )
}

  return (

    <>
      <header>My Store</header>
      <section>
        <nav>
          { categories.errorMessage && <div>Error: Failed{categories.errorMessage}</div> }
        {
          categories.data && RenderCategories()
        }
        </nav>
        <main>
        { products.errorMessage && <div>Error: Failed{products.errorMessage}</div> }
          <h1>Products</h1>
          { products && RenderProducts()}
        </main>
      </section>
        <footer>Footer</footer>
    
    </>
  );
}

export default App;
