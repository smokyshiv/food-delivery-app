import React, { useEffect, useState } from 'react';
import './OrdersHistory.css'; // Ensure this matches your file name

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        try {
            const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
            setOrderHistory(orders);
        } catch (error) {
            console.error('Failed to load order history:', error);
        }
    }, []);

    const handleDeleteOrder = (index) => {
        const updatedOrders = orderHistory.filter((_, i) => i !== index);
        setOrderHistory(updatedOrders);
        localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
    };

    return (
        <div className="order-history-container">
            <h1>Order History</h1>
            {orderHistory.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="order-list">
                    {orderHistory.map((order, index) => (
                        <li key={order.id || index} className="order-item">
                            <h3 className="order-title">{`Order #${index + 1} - Table ${order.tableNumber || 'N/A'}`}</h3>
                            <p className="order-date">{`Date: ${order.date}`}</p>
                            <p className="order-time">{`Time: ${order.time}`}</p>
                            <ul className="order-summary">
                                {Array.isArray(order.orderSummary) && order.orderSummary.map((item, itemIndex) => (
                                    <li key={itemIndex} className="order-summary-item">
                                        <span>{`${item.name} - Quantity: ${item.addedQuantity} - Price: ₹${(item.price * item.addedQuantity).toFixed(2)}`}</span>
                                    </li>
                                ))}
                            </ul>
                            <h4 className="order-total">{`Total: ₹${order.totalPrice?.toFixed(2)}`}</h4>
                            <button 
                                className="delete-button" 
                                onClick={() => handleDeleteOrder(index)}
                            >
                                Delete Order
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;
