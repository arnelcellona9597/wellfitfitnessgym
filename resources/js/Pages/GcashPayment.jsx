import React, { useState } from 'react';

const GcashPayment = () => {
    // State variables for user input
    const [orderTotal, setOrderTotal] = useState(0);  // Total amount for payment
    const [isLoading, setIsLoading] = useState(false);  // To track if payment is processing

    // Handle order total input change
    const handleOrderTotalChange = (e) => {
        setOrderTotal(e.target.value);
    };

    // Initiate payment process
    const initiatePayment = async () => {
        if (orderTotal <= 0) {
            alert("Please enter a valid order total.");
            return;
        }

        setIsLoading(true); // Show loading state while processing
        try {
            const response = await fetch('http://127.0.0.1:8000/gcash-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order_total: orderTotal }),
            });

            const data = await response.json();
            setIsLoading(false);  // Hide loading after response

            if (data.redirect_url) {
                // Redirect user to the next step (step 2)
                window.location.href = data.redirect_url;
            } else {
                alert('Payment initiation failed. Please try again.');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Payment initiation failed', error);
            alert('An error occurred while processing your payment. Please try again.');
        }
    };

    return (
        <div className="payment-container">
            <h1>Gcash Payment</h1>

            <div className="payment-details">
                <label htmlFor="orderTotal">Order Total (PHP):</label>
                <input
                    type="number"
                    id="orderTotal"
                    value={orderTotal}
                    onChange={handleOrderTotalChange}
                    placeholder="Enter total amount"
                />
            </div>

            <button 
                onClick={initiatePayment} 
                disabled={isLoading} 
                className="pay-button">
                {isLoading ? 'Processing...' : 'Pay with GCash'}
            </button>
        </div>
    );
};

export default GcashPayment;
