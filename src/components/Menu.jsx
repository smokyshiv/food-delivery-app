import React, { useEffect, useState } from 'react';
import { menuData } from './constant'; // Update with your actual path
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        sub_category: '',
        available_quantity: '',
        price: '',
        image_url: '',
        type: '',
    });
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchMenuItems = () => {
            const storedItems = JSON.parse(localStorage.getItem('menuItems')) || menuData[0].record;
            const formattedItems = storedItems.map(item => ({
                ...item,
                price: parseFloat(item.price) || 0,
                addedQuantity: 0,
            }));
            setMenuItems(formattedItems);
        };

        fetchMenuItems();
    }, []);

    const updateLocalStorage = (items) => {
        localStorage.setItem('menuItems', JSON.stringify(items));
        setMenuItems(items);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const addItem = () => {
        if (newItem.name && newItem.price) {
            const updatedMenu = [
                ...menuItems,
                {
                    ...newItem,
                    id: (menuItems.length + 1).toString(),
                    price: parseFloat(newItem.price),
                }
            ];
            updateLocalStorage(updatedMenu);
            setNewItem({
                name: '',
                category: '',
                sub_category: '',
                available_quantity: '',
                price: '',
                image_url: '',
                type: ''
            });
        }
    };

    const handleAdd = (index) => {
        const updatedItems = [...menuItems];
        if (updatedItems[index].addedQuantity < updatedItems[index].available_quantity) {
            updatedItems[index].addedQuantity += 1;
            updatedItems[index].available_quantity -= 1;
            updateLocalStorage(updatedItems);
        }
    };

    const handleRemove = (index) => {
        const updatedItems = [...menuItems];
        if (updatedItems[index].addedQuantity > 0) {
            updatedItems[index].addedQuantity -= 1;
            updatedItems[index].available_quantity += 1;
            updateLocalStorage(updatedItems);
        }
    };

    const handleAddToOrder = (item) => {
        setOrder((prevOrder) => {
            const existingOrderItem = prevOrder.find(orderItem => orderItem.name === item.name);
            if (existingOrderItem) {
                // Update the quantity of the existing order item
                return prevOrder.map(orderItem => 
                    orderItem.name === item.name 
                    ? { ...orderItem, addedQuantity: orderItem.addedQuantity + 1 } 
                    : orderItem
                );
            } else {
                
                return [...prevOrder, { ...item, addedQuantity: 0 }];
            }
        });

        // Save the updated order to localStorage
        localStorage.setItem('userOrder', JSON.stringify([...order, { ...item, addedQuantity: 1 }]));
    };

    // Function to reset menu to default
    const resetMenu = () => {
        const defaultMenu = menuData[0].record.map(item => ({
            ...item,
            price: parseFloat(item.price) || 0,
            addedQuantity: 0,
        }));
        updateLocalStorage(defaultMenu); // Update localStorage and menu state
    };

    return (
        <div className="menu-container">
            <div className="menu-header">
                <h1>Menu</h1>
                <Link to="/placeorder">
                    <button className="place-order-button">Place Order</button>
                </Link>
                {/* Reset Menu Button */}
                <button className="reset-menu-button" onClick={resetMenu}>
                    Reset Menu
                </button>
            </div>
            <div className="menu-cards">
                {menuItems.map((item, index) => (
                    <div className="menu-card" key={item.id}>
                        <img src={item.image_url} alt={item.name} className="menu-card-image" />
                        <div className="card-content">
                            <h2 className="menu-card-title">{item.name}</h2>
                            <p>Category: {item.category}</p>
                            <p>Sub-Category: {item.sub_category}</p>
                            <p>Available Quantity: {item.available_quantity > 0 ? item.available_quantity : 'Out of Stock'}</p>
                            <p className="price">Price: ₹{item.price.toFixed(2)}</p>

                            <div className="menu-card-actions">
                                <button className="action-button" onClick={() => handleRemove(index)} disabled={item.addedQuantity === 0}>-</button>
                                <span className="quantity-display">{item.addedQuantity || 0}</span>
                                <button className="action-button" onClick={() => { handleAdd(index); handleAddToOrder(item); }} disabled={item.available_quantity <= 0}>+</button>
                                <div> 
                                    <button className="add-to-cart-button" onClick={() => handleAddToOrder(item)}>Add to Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h2>Add New Item</h2>
            <div className="add-item-form">
                <input type="text" name="name" placeholder="Item Name" value={newItem.name} onChange={handleInputChange} />
                <input type="text" name="category" placeholder="Category" value={newItem.category} onChange={handleInputChange} />
                <input type="text" name="sub_category" placeholder="Sub-Category" value={newItem.sub_category} onChange={handleInputChange} />
                <input type="number" name="available_quantity" placeholder="Available Quantity" value={newItem.available_quantity} onChange={handleInputChange} />
                <input type="number" name="price" placeholder="Price" value={newItem.price} onChange={handleInputChange} />
                <input type="text" name="image_url" placeholder="Image URL" value={newItem.image_url} onChange={handleInputChange} />
                <select name="type" value={newItem.type} onChange={handleInputChange}>
                    <option value="">Select Type</option>
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                </select>
                <button onClick={addItem}>Add Item</button>
            </div>
        </div>
    );
};

export default Menu;
