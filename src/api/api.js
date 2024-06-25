export const fetchProducts = async (limit, skip, id = null) => {
    const url = id ? `https://dummyjson.com/products/${id}` : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    const response = await fetch(url);
    const data = await response.json();
    return id ? { products: [data] } : data;
  };
  