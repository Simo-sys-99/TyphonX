document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // Sticky Navigation on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Product Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideCount = testimonialSlides.length;
    const slideWidth = testimonialSlides[0].offsetWidth;
    
    // Create dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));

    // Product Quick View Modal
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const productModal = document.querySelector('#productModal');
    const modalClose = document.querySelector('.modal-close');
    const modalMainImage = document.querySelector('#modalMainImage');
    const modalProductTitle = document.querySelector('#modalProductTitle');
    const modalProductRating = document.querySelector('.modal-product-rating');
    const modalProductPrice = document.querySelector('#modalProductPrice');
    const modalProductDesc = document.querySelector('#modalProductDesc');
    const modalProductDetails = document.querySelector('#modalProductDetails');
    const modalProductCategory = document.querySelector('#modalProductCategory');
    const modalProductSKU = document.querySelector('#modalProductSKU');
    const addToCartModal = document.querySelector('.add-to-cart-modal');
    const quantityInput = document.querySelector('.quantity-input');
    const quantityPlus = document.querySelector('.quantity-plus');
    const quantityMinus = document.querySelector('.quantity-minus');
    
    // Mock product data (in a real app, this would come from a database)
    const products = {
        1: {
            title: "TYPHONX ORIGINAL",
            price: "24.99 MAD",
            desc: "Notre boisson signature avec un mélange unique de taurine et guarana pour une énergie durable sans crash. Parfait pour les longues journées de travail ou les séances d'entraînement intensives.",
            details: [
                "Contient de la taurine, guarana et vitamines B",
                "Volume: 250ml",
                "Goût rafraîchissant citron-lime",
                "Sans conservateurs artificiels",
                "Énergie durable jusqu'à 6 heures"
            ],
            category: "Boisson énergétique",
            sku: "TX-ORIG-250",
            rating: 4.5,
            images: ["product1.png", ]
        },
        2: {
            title: "TYPHONX ZERO SUCRE",
            price: "28.99  MAD",
            desc: "Toute l'énergie sans le sucre. Formulé spécialement pour ceux qui surveillent leur apport en sucre tout en ayant besoin d'un boost d'énergie significatif.",
            details: [
                "Zéro sucre, zéro calories",
                "Volume: 250ml",
                "Goût fruité léger",
                "Avec édulcorants naturels",
                "Idéal pour les régimes"
            ],
            category: "Boisson énergétique",
            sku: "TX-ZERO-250",
            rating: 4,
            images: ["product2.png", ]
        },
        3: {
            title: "TYPHONX EXTREME",
            price: "32.99 MAD",
            desc: "Double dose d'énergie pour les moments qui demandent une performance maximale. Notre formule la plus puissante pour les situations extrêmes.",
            details: [
                "Double concentration en actifs",
                "Volume: 250ml",
                "Goût intense berry",
                "Effet rapide en 15 minutes",
                "Convient aux efforts prolongés"
            ],
            category: "Boisson énergétique",
            sku: "TX-EXTR-250",
            rating: 5,
            images: ["product3.png", ]
        },
        4: {
            title: "TYPHONX CAPSULES",
            price: "119.99 MAD",
            desc: "Énergie concentrée en capsules pour une action rapide et discrète. Parfait pour les voyages ou quand vous ne pouvez pas transporter une canette.",
            details: [
                "30 capsules par boîte",
                "Équivalent à 15 canettes",
                "Sans colorants artificiels",
                "Action en 20 minutes",
                "Facile à transporter"
            ],
            category: "Complément énergétique",
            sku: "TX-CAPS-30",
            rating: 4.5,
            images: ["product4.png", ]
        },
        5: {
            title: "TYPHONX PROTEIN",
            price: "179.99 MAD",
            desc: "Mélange protéiné premium pour la récupération musculaire après l'effort. Combinaison parfaite de protéines et d'énergie pour les athlètes.",
            details: [
                "30g de protéines par portion",
                "Saveur vanille ou chocolat",
                "500g par pot",
                "Avec BCAA et glutamine",
                "Récupération accélérée"
            ],
            category: "Complément protéiné",
            sku: "TX-PROT-500",
            rating: 4,
            images: ["product5.png", ]
        },
        6: {
            title: "TYPHONX BERRY BLAST",
            price: "27.99  MAD",
            desc: "Saveur fruitée explosive avec le même punch énergétique que notre boisson signature. Un mélange délicieux de baies pour une expérience gustative unique.",
            details: [
                "Mélange de baies naturelles",
                "Volume: 250ml",
                "Avec vitamines antioxydantes",
                "Sans colorants artificiels",
                "Énergie durable 5 heures"
            ],
            category: "Boisson énergétique",
            sku: "TX-BERR-250",
            rating: 4.5,
            images: ["product6.png", ]
        }
    };

    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const product = products[productId];
            
            // Set modal content
            modalProductTitle.textContent = product.title;
            modalProductPrice.textContent = product.price;
            modalProductDesc.textContent = product.desc;
            modalProductCategory.textContent = product.category;
            modalProductSKU.textContent = product.sku;
            
            // Clear previous details
            modalProductDetails.innerHTML = '';
            
            // Add new details
            product.details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                modalProductDetails.appendChild(li);
            });
            
            // Set rating stars
            modalProductRating.innerHTML = '';
            const fullStars = Math.floor(product.rating);
            const hasHalfStar = product.rating % 1 !== 0;
            
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                if (i < fullStars) {
                    star.classList.add('fas', 'fa-star');
                } else if (i === fullStars && hasHalfStar) {
                    star.classList.add('fas', 'fa-star-half-alt');
                } else {
                    star.classList.add('far', 'fa-star');
                }
                modalProductRating.appendChild(star);
            }
            
            // Add rating count
            const ratingCount = document.createElement('span');
            ratingCount.textContent = ` (${Math.floor(Math.random() * 50) + 10})`;
            modalProductRating.appendChild(ratingCount);
            
            // Set main image
            modalMainImage.src = product.images[0];
            modalMainImage.alt = product.title;
            
            // Set thumbnails
            const thumbnailsContainer = document.querySelector('.thumbnail-images');
            thumbnailsContainer.innerHTML = '';
            
            product.images.forEach((image, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.classList.add('thumbnail');
                if (index === 0) thumbnail.classList.add('active');
                
                const img = document.createElement('img');
                img.src = image;
                img.alt = `${product.title} ${index + 1}`;
                
                thumbnail.appendChild(img);
                thumbnailsContainer.appendChild(thumbnail);
                
                // Thumbnail click event
                thumbnail.addEventListener('click', function() {
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    modalMainImage.src = image;
                });
            });
            
            // Set add to cart button
            addToCartModal.setAttribute('data-id', productId);
            
            // Reset quantity
            quantityInput.value = 1;
            
            // Open modal
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Quantity controls
    quantityPlus.addEventListener('click', function() {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    quantityMinus.addEventListener('click', function() {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    // Close modal
    modalClose.addEventListener('click', function() {
        productModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    productModal.addEventListener('click', function(e) {
        if (e.target === this) {
            productModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Shopping Cart Functionality
    const cartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-modal');
    const cartCount = document.querySelector('.cart-count');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartClose = document.querySelector('.cart-close');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const viewCartBtn = document.querySelector('.view-cart');
    const checkoutBtn = document.querySelector('.checkout');
    
    let cart = [];
    
    // Load cart from localStorage
    if (localStorage.getItem('typhonxCart')) {
        cart = JSON.parse(localStorage.getItem('typhonxCart'));
        updateCartCount();
    }
    
    // Add to cart
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const product = products[productId];
            const quantity = this.classList.contains('add-to-cart-modal') ? 
                parseInt(document.querySelector('.quantity-input').value) : 1;
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: productId,
                    title: product.title,
                    price: parseFloat(product.price),
                    image: product.images[0],
                    quantity: quantity
                });
            }
            
            // Save to localStorage
            localStorage.setItem('typhonxCart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount();
            
            // Show added notification
            showNotification(`${product.title} ajouté au panier`);
            
            // Close modal if adding from modal
            if (this.classList.contains('add-to-cart-modal')) {
                productModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Toggle cart sidebar
    const cartToggleButtons = document.querySelectorAll('.cart-btn, .view-cart');
    cartToggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderCartItems();
        });
    });
    
    // Close cart sidebar
    cartClose.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Render cart items
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Votre panier est vide</div>';
            totalPriceElement.textContent = '0 MAD';
            return;
        }
        
        cartItemsContainer.innerHTML = '';
        
        let totalPrice = 0;
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            
            const itemPrice = item.price * item.quantity;
            totalPrice += itemPrice;
            
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">${item.price.toFixed(2)} MAD</div>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="cart-item-minus" data-index="${index}">-</button>
                            <input type="number" class="cart-item-qty" value="${item.quantity}" min="1" data-index="${index}">
                            <button class="cart-item-plus" data-index="${index}">+</button>
                        </div>
                        <button class="cart-item-remove" data-index="${index}">Supprimer</button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        totalPriceElement.textContent = `${totalPrice.toFixed(2)} MAD`;
        
        // Add event listeners to quantity controls
        document.querySelectorAll('.cart-item-minus').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    localStorage.setItem('typhonxCart', JSON.stringify(cart));
                    renderCartItems();
                    updateCartCount();
                }
            });
        });
        
        document.querySelectorAll('.cart-item-plus').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart[index].quantity++;
                localStorage.setItem('typhonxCart', JSON.stringify(cart));
                renderCartItems();
                updateCartCount();
            });
        });
        
        document.querySelectorAll('.cart-item-qty').forEach(input => {
            input.addEventListener('change', function() {
                const index = this.getAttribute('data-index');
                const newQuantity = parseInt(this.value);
                
                if (newQuantity >= 1) {
                    cart[index].quantity = newQuantity;
                    localStorage.setItem('typhonxCart', JSON.stringify(cart));
                    renderCartItems();
                    updateCartCount();
                } else {
                    this.value = cart[index].quantity;
                }
            });
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('typhonxCart', JSON.stringify(cart));
                renderCartItems();
                updateCartCount();
                
                if (cart.length === 0) {
                    setTimeout(() => {
                        cartSidebar.classList.remove('active');
                        cartOverlay.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }, 500);
                }
            });
        });
    }
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) return;
        
        // In a real app, this would redirect to checkout page
        alert('Fonctionnalité de paiement à implémenter');
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                }
                
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.about-stats, .feature-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real app, you would send this data to a server
            console.log('Form submitted:', { name, email, phone, subject, message });
            
            // Show success message
            showNotification('Votre message a été envoyé avec succès!');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            // In a real app, you would send this to your newsletter service
            console.log('Newsletter subscription:', email);
            
            // Show success message
            showNotification('Merci pour votre abonnement!');
            
            // Reset form
            this.reset();
        });
    }
});

// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
.notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #48bb78;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 3000;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.notification.show {
    opacity: 1;
}
`;
document.head.appendChild(notificationStyles);