import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Lock, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Bitcoin,
  Wallet,
  Shield,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cryptoMethod, setCryptoMethod] = useState('bitcoin');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [metamaskAccount, setMetamaskAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    walletAddress: ''
  });

  const shipping = cartItems.length > 0 ? (getCartTotal() >= 50 ? 0 : 5.99) : 0;
  const tax = getCartTotal() * 0.08;
  const total = getCartTotal() + shipping + tax;

  const steps = [
    { id: 1, name: 'Shipping', icon: Truck },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: CheckCircle }
  ];

  const cryptoOptions = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: '₿', rate: 0.000023 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', rate: 0.00035 },
    { id: 'metamask', name: 'Ethereum (MetaMask)', symbol: 'ETH', icon: '🦊', rate: 0.00035 },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', rate: 0.014 },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', rate: 0.42 }
  ];

  const handleInputChange = (section, field, value) => {
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      if (currentStep === 2 && paymentMethod === 'crypto' && cryptoMethod === 'metamask' && !metamaskConnected) {
        setErrorMessage('Please connect MetaMask before proceeding.');
        return;
      }
      setErrorMessage('');
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setMetamaskAccount(accounts[0]);
        setMetamaskConnected(true);
        setErrorMessage('');
      } catch (error) {
        console.error('MetaMask connection error:', error);
        setErrorMessage('Failed to connect to MetaMask. Please ensure MetaMask is installed and try again.');
      }
    } else {
      setErrorMessage('MetaMask is not installed. Please install MetaMask to use this payment method.');
    }
  };

  const handleMetaMaskPayment = async () => {
    if (!metamaskConnected || !metamaskAccount) {
      setErrorMessage('Please connect MetaMask to proceed with the payment.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const recipientAddress = 'YOUR_RECIPIENT_WALLET_ADDRESS'; // Replace with your actual Ethereum wallet address
      const amountInEth = ethers.parseEther((total * 0.00035).toFixed(8)); // Convert total to ETH

      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: amountInEth
      });

      setIsProcessing(true);
      await tx.wait();
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    } catch (error) {
      console.error('MetaMask payment error:', error);
      setErrorMessage('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'crypto' && cryptoMethod === 'metamask' && !metamaskConnected) {
      setErrorMessage('Please connect MetaMask to place your order.');
      return;
    }

    setIsProcessing(true);
    
    if (paymentMethod === 'crypto' && cryptoMethod === 'metamask') {
      await handleMetaMaskPayment();
    } else {
      // Simulate payment processing for other methods
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }
  };

  const selectedCrypto = cryptoOptions.find(crypto => crypto.id === cryptoMethod);
  const cryptoAmount = selectedCrypto ? (total * selectedCrypto.rate).toFixed(8) : 0;

  useEffect(() => {
    if (cryptoMethod === 'metamask' && !metamaskConnected) {
      setErrorMessage('Please connect MetaMask to proceed with Ethereum payment.');
    } else if (cryptoMethod !== 'metamask') {
      setErrorMessage('');
    }
  }, [cryptoMethod, metamaskConnected]);

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-green-600 hover:text-green-700 font-medium">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4 text-center"
        >
          <div className="text-green-600 mb-6">
            <CheckCircle className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. You'll receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <Link to="/shop">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Continue Shopping
              </button>
            </Link>
            <Link to="/orders">
              <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors">
                View Orders
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-green-600 border-green-600 text-white' 
                      : isActive 
                        ? 'border-green-600 text-green-600' 
                        : 'border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`ml-2 font-medium ${
                    isActive ? 'text-green-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-px mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {errorMessage}
                </div>
              )}
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="NY"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        paymentMethod === 'card' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-green-600" />
                        <div className="text-left">
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        paymentMethod === 'crypto' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Bitcoin className="h-6 w-6 text-orange-500" />
                        <div className="text-left">
                          <div className="font-medium">Cryptocurrency</div>
                          <div className="text-sm text-gray-600">Bitcoin, Ethereum, MetaMask, and more</div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            value={paymentInfo.cvv}
                            onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          value={paymentInfo.cardName}
                          onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}

                  {/* Crypto Payment Form */}
                  {paymentMethod === 'crypto' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Cryptocurrency</label>
                        <div className="grid grid-cols-2 gap-3">
                          {cryptoOptions.map((crypto) => (
                            <button
                              key={crypto.id}
                              onClick={() => setCryptoMethod(crypto.id)}
                              className={`p-3 border rounded-lg transition-colors ${
                                cryptoMethod === crypto.id 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{crypto.icon || '🪙'}</span>
                                <div className="text-left">
                                  <div className="font-medium text-sm">{crypto.name}</div>
                                  <div className="text-xs text-gray-600">{crypto.symbol}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {cryptoMethod !== 'metamask' ? (
                        <>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-center">
                              <div className="text-sm text-gray-600 mb-2">Amount to pay:</div>
                              <div className="text-2xl font-bold text-gray-900">
                                {cryptoAmount} {selectedCrypto?.symbol}
                              </div>
                              <div className="text-sm text-gray-600">≈ ${total.toFixed(2)} USD</div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Wallet Address</label>
                            <input
                              type="text"
                              value={paymentInfo.walletAddress}
                              onChange={(e) => handleInputChange('payment', 'walletAddress', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Enter your wallet address"
                            />
                          </div>
                        </>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-2">Amount to pay:</div>
                            <div className="text-2xl font-bold text-gray-900">
                              {cryptoAmount} {selectedCrypto?.symbol}
                            </div>
                            <div className="text-sm text-gray-600">≈ ${total.toFixed(2)} USD</div>
                          </div>
                          {metamaskConnected ? (
                            <div className="mt-4">
                              <div className="text-sm text-gray-600">Connected Account:</div>
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {metamaskAccount}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={connectMetaMask}
                              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                            >
                              Connect MetaMask
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
                  
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Payment Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>{shippingInfo.firstName} {shippingInfo.lastName}</div>
                        <div>{shippingInfo.address}</div>
                        <div>{shippingInfo.city}, {shippingInfo.state}</div>
                        <div>{shippingInfo.email}</div>
                        <div>{shippingInfo.phone}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                      <div className="text-sm text-gray-600">
                        {paymentMethod === 'card' ? (
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Credit/Debit Card</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {cryptoMethod === 'metamask' ? (
                              <>
                                <Wallet className="h-4 w-4" />
                                <span>Ethereum (MetaMask)</span>
                              </>
                            ) : (
                              <>
                                <Bitcoin className="h-4 w-4" />
                                <span>{selectedCrypto?.name} ({selectedCrypto?.symbol})</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="ml-auto flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <motion.button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || (paymentMethod === 'crypto' && cryptoMethod === 'metamask' && !metamaskConnected)}
                    whileHover={{ scale: (isProcessing || (paymentMethod === 'crypto' && cryptoMethod === 'metamask' && !metamaskConnected)) ? 1 : 1.02 }}
                    whileTap={{ scale: (isProcessing || (paymentMethod === 'crypto' && cryptoMethod === 'metamask' && !metamaskConnected)) ? 1 : 0.98 }}
                    className="ml-auto flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Place Order
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                  {paymentMethod === 'crypto' && selectedCrypto && (
                    <div className="text-sm text-gray-600 mt-1">
                      ≈ {cryptoAmount} {selectedCrypto.symbol}
                    </div>
                  )}
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4 text-green-600" />
                  <span>Secure Payment Processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Free Returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;