// Global Variables
let products = [];
let cart = [];
let orders = [];
let customers = [];
let currentView = 'grid';
let currentFilter = 'all';
let isLoggedIn = false;

// Product Data with Botswana/African themed items
const defaultProducts = [
    // Traditional Clothing
    {
        id: 1,
        name: "Traditional Tswana Dress",
        price: 899.99,
        category: "clothing",
        description: "Elegant traditional Tswana dress with authentic patterns and vibrant colors. Perfect for cultural celebrations and special occasions.",
        image: "images/Traditional Tswana Dress.jpg",
        badge: "Traditional"
    },
    {
        id: 2,
        name: "Men's African Print Shirt",
        price: 459.99,
        category: "clothing",
        description: "Stylish African print shirt featuring traditional patterns. Made from high-quality cotton for comfort and durability.",
        image: "images/Men's African Print Shirt.webp",
        badge: "Popular"
    },
    {
        id: 3,
        name: "Botswana Cultural Outfit",
        price: 1299.99,
        category: "clothing",
        description: "Complete traditional Botswana cultural outfit with intricate beadwork and authentic designs passed down through generations.",
        image: "images/Botswana Cultural Outfit.jpg",
        badge: "Premium"
    },
    {
        id: 4,
        name: "Traditional Wedding Attire",
        price: 1899.99,
        category: "clothing",
        description: "Exquisite traditional wedding attire featuring elaborate patterns and ceremonial significance. A masterpiece of cultural heritage.",
        image: "images/Traditional Wedding Attire.jpg",
        badge: "Special"
    },
    {
        id: 5,
        name: "African Print Blouse",
        price: 349.99,
        category: "clothing",
        description: "Beautiful African print blouse with modern cut and traditional patterns. Perfect for both casual and formal occasions.",
        image: "images/African Print Blouse.webp",
        badge: "New"
    },
    {
        id: 6,
        name: "Traditional Headwrap Set",
        price: 199.99,
        category: "clothing",
        description: "Authentic traditional headwrap with matching accessories. Features beautiful African prints and premium fabric quality.",
        image: "images/Traditional Headwrap Set.webp",
        badge: "Trending"
    },

    // Accessories
    {
        id: 7,
        name: "African Beaded Jewelry Set",
        price: 299.99,
        category: "accessories",
        description: "Handcrafted beaded jewelry set featuring traditional African patterns. Includes necklace, earrings, and bracelet.",
        image: "images/African Beaded Jewelry Set.jpeg",
        badge: "Handmade"
    },
    {
        id: 8,
        name: "Traditional African Bag",
        price: 399.99,
        category: "accessories",
        description: "Authentic African bag made from traditional materials. Features intricate patterns and spacious interior.",
        image: "images/Traditional African Bag.webp",
        badge: "Artisan"
    },
    {
        id: 9,
        name: "African Style Sunglasses",
        price: 189.99,
        category: "accessories",
        description: "Stylish sunglasses with African-inspired design elements. UV protection with fashionable frames.",
        image: "images/African Style Sunglasses.webp",
        badge: "Modern"
    },
    {
        id: 10,
        name: "Colorful African Bracelet",
        price: 89.99,
        category: "accessories",
        description: "Vibrant African bracelet with traditional color patterns. Adjustable size and comfortable fit.",
        image: "images/Colorful African Bracelet.webp",
        badge: "Colorful"
    },

    // Modern Wear
    {
        id: 11,
        name: "Contemporary African Dress",
        price: 699.99,
        category: "modern",
        description: "Modern interpretation of traditional African fashion. Combines contemporary style with cultural heritage.",
        image: "images/Contemporary African Dress.webp",
        badge: "Contemporary"
    },
    {
        id: 12,
        name: "African Fashion Ensemble",
        price: 899.99,
        category: "modern",
        description: "Elegant African fashion ensemble featuring modern cuts with traditional print elements. Perfect for special events.",
        image: "images/African Fashion Ensemble.webp",
        badge: "Elegant"
    },
    {
        id: 13,
        name: "Modern African Print Suit",
        price: 1199.99,
        category: "modern",
        description: "Sophisticated modern suit featuring African print accents. Professional attire with cultural flair.",
        image: "images/Modern African Print Suit.jpg",
        badge: "Professional"
    },
    {
        id: 14,
        name: "Casual African Wear",
        price: 459.99,
        category: "modern",
        description: "Comfortable casual wear with subtle African design elements. Perfect for everyday style with cultural touch.",
        image: "images/Casual African Wear.jpg",
        badge: "Casual"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Show loading overlay
    showLoading();
    
    // Load data from localStorage or use defaults
    loadStoredData();
    
    // Initialize products display
    setTimeout(() => {
        loadProducts();
        updateCartDisplay();
        hideLoading();
        
        // Setup smooth scrolling for navigation links
        setupSmoothScrolling();
        
        // Setup intersection observer for animations
        setupScrollAnimations();
    }, 1500);
}

function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }
}

function loadStoredData() {
    // Load products (use default if none stored)
    const storedProducts = localStorage.getItem('botswana_products');
    products = storedProducts ? JSON.parse(storedProducts) : defaultProducts;
    
    // Load cart
    const storedCart = localStorage.getItem('botswana_cart');
    cart = storedCart ? JSON.parse(storedCart) : [];
    
    // Load orders
    const storedOrders = localStorage.getItem('botswana_orders');
    orders = storedOrders ? JSON.parse(storedOrders) : [];
    
    // Load customers
    const storedCustomers = localStorage.getItem('botswana_customers');
    customers = storedCustomers ? JSON.parse(storedCustomers) : [];
}

function saveData() {
    localStorage.setItem('botswana_products', JSON.stringify(products));
    localStorage.setItem('botswana_cart', JSON.stringify(cart));
    localStorage.setItem('botswana_orders', JSON.stringify(orders));
    localStorage.setItem('botswana_customers', JSON.stringify(customers));
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNavigation(this.getAttribute('href'));
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

function updateActiveNavigation(href) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .product-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navigation Functions
function toggleMobileMenu() {
    const navMobile = document.getElementById('nav-mobile');
    navMobile.classList.toggle('active');
}

function closeMobileMenu() {
    const navMobile = document.getElementById('nav-mobile');
    navMobile.classList.remove('active');
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        const headerHeight = 80;
        const targetPosition = productsSection.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Product Functions
function loadProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    // Show loading
    showProductLoading();

    setTimeout(() => {
        hideProductLoading();
        displayProducts();
    }, 800);
}

function showProductLoading() {
    const loadingProducts = document.getElementById('loading-products');
    if (loadingProducts) {
        loadingProducts.style.display = 'block';
    }
}

function hideProductLoading() {
    const loadingProducts = document.getElementById('loading-products');
    if (loadingProducts) {
        loadingProducts.style.display = 'none';
    }
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    let filteredProducts = products;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredProducts = products.filter(product => product.category === currentFilter);
    }

    if (filteredProducts.length === 0) {
        productList.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 4rem; color: var(--border-color); margin-bottom: 20px;"></i>
                <h3 style="color: var(--primary-color); margin-bottom: 10px;">No products found</h3>
                <p style="color: var(--dark-color); opacity: 0.8;">Try adjusting your filter or check back later for new arrivals.</p>
            </div>
        `;
        return;
    }

    productList.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">P${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" 
                            ${isProductInCart(product.id) ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i>
                        ${isProductInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Apply view mode
    applyViewMode();
    
    // Re-setup animations for new products
    setupScrollAnimations();
}

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter');
    currentFilter = categoryFilter.value;
    
    showProductLoading();
    setTimeout(() => {
        hideProductLoading();
        displayProducts();
    }, 500);
}

function toggleView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        }
    });
    
    applyViewMode();
}

function applyViewMode() {
    const productList = document.getElementById('product-list');
    if (!productList) return;
    
    if (currentView === 'list') {
        productList.classList.add('list-view');
        productList.style.gridTemplateColumns = '1fr';
    } else {
        productList.classList.remove('list-view');
        productList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    }
}

function isProductInCart(productId) {
    return cart.some(item => item.id === productId);
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        showMessage('Product already in cart!', 'error');
        return;
    }

    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
    });

    updateCartDisplay();
    displayProducts(); // Refresh to update button states
    saveData();
    showMessage('Product added to cart!', 'success');
    
    // Add visual feedback
    animateCartButton();
}

function animateCartButton() {
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    displayProducts(); // Refresh to update button states
    saveData();
    showMessage('Product removed from cart', 'success');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    updateCartDisplay();
    saveData();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');

    if (!cartCount || !cartItems || !cartFooter) return;

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button onclick="toggleCart()" class="continue-shopping">Continue Shopping</button>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">P${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-input">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cart-total').textContent = total.toFixed(2);
        cartFooter.style.display = 'block';
    }
}

function toggleCart() {
    const cartSection = document.getElementById('cart-section');
    if (!cartSection) return;

    cartSection.classList.toggle('active');
}

// Checkout Functions
function showCheckout() {
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }

    const checkoutSection = document.getElementById('checkout-section');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const finalTotal = document.getElementById('final-total');

    if (!checkoutSection || !checkoutItems || !checkoutTotal || !finalTotal) return;

    // Populate checkout items
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} (${item.quantity}x)</span>
            <span>P${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    // Calculate and display total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = total.toFixed(2);
    finalTotal.textContent = total.toFixed(2);

    // Show checkout modal
    checkoutSection.classList.add('active');
    
    // Hide cart
    toggleCart();
}

function hideCheckout() {
    const checkoutSection = document.getElementById('checkout-section');
    if (checkoutSection) {
        checkoutSection.classList.remove('active');
    }
}

function submitOrder(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate form
    if (!form.checkValidity()) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }

    // Create order object
    const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        customer: {
            name: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address')
        },
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        paymentMethod: formData.get('paymentMethod'),
        status: 'confirmed'
    };

    // Add to orders
    orders.push(order);
    
    // Add customer if new
    addCustomer(order.customer, order.total);
    
    // Clear cart
    cart = [];
    
    // Save data
    saveData();
    
    // Update displays
    updateCartDisplay();
    displayProducts();
    
    // Hide checkout
    hideCheckout();
    
    // Show success message
    showMessage(`Order placed successfully! Order ID: ${order.id}. You will receive a confirmation email shortly.`, 'success');
    
    // Reset form
    form.reset();
}

function addCustomer(customerData, orderTotal) {
    const existingCustomer = customers.find(c => c.email === customerData.email);
    
    if (existingCustomer) {
        existingCustomer.orders++;
        existingCustomer.totalSpent += orderTotal;
        existingCustomer.lastOrder = new Date().toISOString();
    } else {
        customers.push({
            ...customerData,
            orders: 1,
            totalSpent: orderTotal,
            lastOrder: new Date().toISOString(),
            joinDate: new Date().toISOString()
        });
    }
}

// Contact Functions
function sendMessage(event) {
    event.preventDefault();
    
    const form = event.target;
    
    if (!form.checkValidity()) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate sending message
    setTimeout(() => {
        showMessage('Message sent successfully! We will get back to you soon.', 'success');
        form.reset();
    }, 1000);
}

// Admin Functions
function adminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    
    // Simple demo authentication
    if (username === 'admin' && password === 'admin123') {
        isLoggedIn = true;
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        loadAdminData();
        showMessage('Welcome to Admin Dashboard!', 'success');
    } else {
        showMessage('Invalid credentials. Use admin/admin123', 'error');
    }
}

function logout() {
    isLoggedIn = false;
    document.getElementById('admin-login').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
    showMessage('Logged out successfully', 'success');
}

function loadAdminData() {
    // Update statistics
    document.getElementById('total-orders').textContent = orders.length;
    document.getElementById('total-products').textContent = products.length;
    document.getElementById('total-revenue').textContent = orders.reduce((sum, order) => sum + order.total, 0).toFixed(2);
    document.getElementById('total-customers').textContent = customers.length;
    
    // Load current tab data
    const activeTab = document.querySelector('.tab-btn.active')?.onclick?.toString().match(/showTab\('(\w+)'\)/)?.[1] || 'orders';
    showTab(activeTab);
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.onclick && btn.onclick.toString().includes(tabName)) {
            btn.classList.add('active');
        }
    });
    
    // Load tab specific data
    switch(tabName) {
        case 'orders':
            loadOrdersData();
            break;
        case 'products':
            loadProductsData();
            break;
        case 'customers':
            loadCustomersData();
            break;
    }
}

function loadOrdersData() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <tr class="empty-state">
                <td colspan="7">
                    <div class="empty-message">
                        <i class="fas fa-inbox"></i>
                        <p>No orders found</p>
                        <small>Orders will appear here when customers make purchases</small>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    ordersList.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer.name}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.items.length}</td>
            <td>P${order.total.toFixed(2)}</td>
            <td><span class="status-badge ${order.status}">${order.status}</span></td>
            <td>
                <button onclick="viewOrder(${order.id})" class="btn-secondary">View</button>
            </td>
        </tr>
    `).join('');
}

function loadProductsData() {
    const adminProductsList = document.getElementById('admin-products-list');
    if (!adminProductsList) return;
    
    adminProductsList.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <p class="product-price">P${product.price.toFixed(2)}</p>
                <div class="admin-actions">
                    <button onclick="editProduct(${product.id})" class="btn-secondary">Edit</button>
                    <button onclick="deleteProduct(${product.id})" class="btn-secondary">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadCustomersData() {
    const customersList = document.getElementById('customers-list');
    if (!customersList) return;
    
    if (customers.length === 0) {
        customersList.innerHTML = `
            <tr class="empty-state">
                <td colspan="6">
                    <div class="empty-message">
                        <i class="fas fa-users"></i>
                        <p>No customers found</p>
                        <small>Customer data will appear here after orders are placed</small>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    customersList.innerHTML = customers.map(customer => `
        <tr>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.orders}</td>
            <td>P${customer.totalSpent.toFixed(2)}</td>
            <td>${new Date(customer.lastOrder).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

function refreshOrders() {
    loadOrdersData();
    showMessage('Orders refreshed', 'success');
}

function showAddProduct() {
    const modal = document.getElementById('add-product-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function addProduct(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const newProduct = {
        id: Date.now(),
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        description: formData.get('description'),
        image: formData.get('image'),
        badge: 'New'
    };
    
    products.push(newProduct);
    saveData();
    loadProductsData();
    displayProducts(); // Refresh main product display
    closeModal('add-product-modal');
    showMessage('Product added successfully!', 'success');
    form.reset();
}

function editProduct(productId) {
    showMessage('Edit functionality would be implemented here', 'success');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        saveData();
        loadProductsData();
        displayProducts(); // Refresh main product display
        showMessage('Product deleted successfully', 'success');
    }
}

function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const orderDetails = `
            Order ID: ${order.id}
            Customer: ${order.customer.name}
            Email: ${order.customer.email}
            Phone: ${order.customer.phone}
            Address: ${order.customer.address}
            Items: ${order.items.map(item => `${item.name} (${item.quantity}x)`).join(', ')}
            Total: P${order.total.toFixed(2)}
            Payment: ${order.paymentMethod}
            Status: ${order.status}
        `;
        alert(orderDetails);
    }
}

function searchCustomers(query) {
    // This would filter customers based on the search query
    // For demo purposes, we'll just show a message
    if (query.length > 2) {
        showMessage(`Searching for: ${query}`, 'success');
    }
}

function updateStoreInfo(event) {
    event.preventDefault();
    showMessage('Store information updated successfully!', 'success');
}

function updateShippingSettings(event) {
    event.preventDefault();
    showMessage('Shipping settings updated successfully!', 'success');
}

function updateAppearance(event) {
    event.preventDefault();
    showMessage('Site appearance updated successfully!', 'success');
}

// Utility Functions
function showMessage(message, type = 'success') {
    const modalId = type === 'success' ? 'success-modal' : 'error-modal';
    const messageId = type === 'success' ? 'success-message' : 'error-message';
    
    document.getElementById(messageId).textContent = message;
    document.getElementById(modalId).classList.add('active');
    
    // Auto close after 3 seconds
    setTimeout(() => {
        closeModal(modalId);
    }, 3000);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.modal.active, .cart-section.active, .checkout-section.active').forEach(modal => {
            modal.classList.remove('active');
        });
        closeMobileMenu();
    }
    
    // Ctrl+K opens search (if implemented)
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        // Would implement search functionality
    }
});

// Window scroll handler for header effects
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScrollY = window.scrollY;
    
    if (header) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = currentScrollY;
});

// Add loading state to buttons
function addLoadingToButton(button, text = 'Loading...') {
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
}

function removeLoadingFromButton(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
}

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
        e.target.alt = 'Image not found';
    }
}, true);

// Prevent zoom on double tap (mobile)
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Performance monitoring (basic)
window.addEventListener('load', function() {
    // Mark app as loaded
    const loadTime = performance.now();
    console.log(`Botswana Styles loaded in ${loadTime.toFixed(2)}ms`);
});
