import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Detail from './Detail';
import TablePagination from './TablePagination';
import { fetchProducts } from '../../api/api';
import Form from 'react-bootstrap/Form';

const TableComponent = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (productId) => {
    setSelectedProductId(productId);
    setShow(true);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts(productsPerPage, (currentPage - 1) * productsPerPage);
        setProducts(productsData.products);
        const totalCount = productsData.total;
        setTotalPages(Math.ceil(totalCount / productsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getProducts();
  }, [currentPage, productsPerPage]);

  const tableHeading = [
    "Id",
    "Thumbnail",
    "Title",
    "Description",
    "Category",
    "Price",
    "Rating",
    "Status"
  ];

  const handleProductsPerPageChange = (event) => {
    setProductsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <Form.Group controlId="productsPerPageSelect" className="mb-3 select_limit">
        <Form.Label>Products Per Page:</Form.Label>
        <Form.Control as="select" value={productsPerPage} onChange={handleProductsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </Form.Control>
      </Form.Group>

      <Table responsive>
        <thead>
          <tr>
            {tableHeading.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img
                  src={product.thumbnail}
                  alt="thumbnail"
                  width={65}
                  height={65}
                  className='img-thumbnail img-fluid rounded-3'
                />
              </td>
              <td>
                <button className='btn_model' onClick={() => handleShow(product.id)}>{product.title}</button>
              </td>
              <td>
                <p className='description'>{product.description}</p>
              </td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.rating}</td>
              <td>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {selectedProductId && (
        <Detail show={show} close={handleClose} productId={selectedProductId} />
      )}
    </>
  );
}

export default TableComponent;
