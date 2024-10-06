import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';

const PlaceOrder = () => {
    const [tableNumber, setTableNumber] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [orderSummary, setOrderSummary] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false); // State to track order placement
    const navigate = useNavigate();

    // Fetch the current order from localStorage
    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem('userOrder')) || [];
        setOrderSummary(storedOrder);

        const total = storedOrder.reduce((acc, item) => acc + (item.price * item.addedQuantity), 0);
        setTotalPrice(total);
    }, [orderPlaced]); // Refresh when the order is placed

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const orderDetails = {
            tableNumber,
            name,
            date,
            time,
            orderSummary,
            totalPrice,
        };

        // Store the order in the order history (localStorage)
        const previousOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        previousOrders.push(orderDetails);
        localStorage.setItem('orderHistory', JSON.stringify(previousOrders));

        // Reset the form after order confirmation
        setTableNumber('');
        setName('');
        setDate('');
        setTime('');
        setOrderSummary([]);
        setTotalPrice(0);

        // Clear the current order from localStorage
        localStorage.removeItem('userOrder');

        // Show confirmation modal
        setOrderPlaced(true);

        // Hide the modal after 3 seconds and reset the page
        setTimeout(() => {
            setOrderPlaced(false);
            navigate('/'); // Redirect to the Orders page
        }, 3000); // 3 seconds delay
   
    };

    return (
        <>
            <div className="place-order-container">
                <h1>Place Order</h1>
                <form onSubmit={handleSubmit} className="order-form">
                    <input
                        type="text"
                        placeholder="Table Number"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        required
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-input"
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="form-input"
                    />
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        className="form-input"
                    />

                    <h2>Order Summary</h2>
                    <ul className="order-summary">
                        {orderSummary.map((item, index) => (
                            <li key={index} className="order-item">
                                <span className="order-item-name">{item.name}</span>
                                <span className="order-item-quantity">Quantity: {item.addedQuantity}</span>
                                <span className="order-item-price">Price: ₹{(item.price * item.addedQuantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <h3 className="total-price">Total Price: ₹{totalPrice.toFixed(2)}</h3>
                    <button type="submit" className="confirm-button">Confirm Order</button>
                </form>
            </div>

            {orderPlaced && (
                <div className="order-confirmation-modal">
                    <div className="modal-content">
                        <h2>Your Order Is Placed Successfully!</h2>
                    </div>
                </div>
            )}
        </>
    );
};

export default PlaceOrder;
