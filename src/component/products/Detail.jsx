import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { fetchProducts } from '../../api/api';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Detail = ({ show, close, productId }) => {
    const [product, setProduct] = useState(null);
    const [key, setKey] = useState('review');

    useEffect(() => {
        const getProduct = async () => {
            try {
                const productData = await fetchProducts(1, 0, productId);
                setProduct(productData.products[0]);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        if (productId) {
            getProduct();
        }
    }, [productId]);

    if (!product) {
        return null;
    }

    return (
        <Modal
            show={show}
            onHide={close}
            backdrop="static"
            keyboard={false}
            centered
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>Product Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-5">
                        <img
                            src={product.thumbnail}
                            alt="product"
                            className='img img-fluid'
                        />
                    </div>
                    <div className="col-md-7">
                        <div className="product_details">
                            <h2 className='title'>{product.title}</h2>
                            <h6 className='brand'>{product.brand}</h6>
                            <p className='price'>${product.price}</p><span className="discount">Discount: {product.discountPercentage}%</span>
                            <p className='description'>{product.description}</p>
                            <p><span>In stock: </span>{product.stock}</p>
                            <div className="d-flex gap-2">
                                <p>Tags: </p>
                                <ol className='tags'>
                                    {product.tags.map(tag => <li key={tag}>{tag}</li>)}
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3 product_tab"
                        >
                            <Tab eventKey="review" title="Customer Reviews">
                                <div className="row">
                                    {
                                        product.reviews.map((review, index) => {
                                            return (
                                                <div className="col-md-4">
                                                    <div className="customer_review" key={index}>
                                                        <p><span>User:</span> {review.reviewerName}</p>
                                                        <p><span>Email:</span> {review.reviewerEmail}</p>
                                                        <p><span>Rating:</span> {review.rating}</p>
                                                        <p><span>Comment:</span> {review.comment}</p>
                                                        <p><span>Commented on:</span> {review.date}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="Other Details">
                                <ul className='other_details'>
                                    <li>
                                        <p><span>Return Policy:</span> {product.returnPolicy}</p>
                                        <p><span>Minimum Order Quantity:</span> {product.minimumOrderQuantity}</p>
                                        <p><span>warranty Information:</span>  {product.warrantyInformation}</p>
                                        <p><span>Shipping Information:</span>  {product.shippingInformation}</p>
                                    </li>
                                </ul>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Detail;
