document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize category filter
    initCategoryFilter();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize dropdown filter
    initDropdownFilter();
    
    // Initialize service details modal
    initServiceDetailsModal();
    
    // Initialize booking modal
    initBookingModal();
    
    // Initialize pagination
    initPagination();
});

// Initialize GSAP animations
function initAnimations() {
    // Animate page header
    gsap.from(".page-header h1", {
        duration: 0.8,
        opacity: 0,
        x: -30,
        ease: "power2.out",
        delay: 0.2
    });
    
    gsap.from(".page-actions", {
        duration: 0.8,
        opacity: 0,
        x: 30,
        ease: "power2.out",
        delay: 0.3
    });
    
    // Animate categories
    gsap.from(".category-card", {
        duration: 0.8,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
    });
    
    // Animate service cards
    gsap.from(".service-card", {
        duration: 0.8,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.7
    });
}

// Initialize category filter
function initCategoryFilter() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Get category
            const category = this.getAttribute('data-category');
            
            // Filter services
            filterServices(category);
            
            // Update dropdown filter
            document.getElementById('service-filter').value = category;
        });
    });
}

// Filter services based on category
function filterServices(category) {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            // Show card with animation
            gsap.fromTo(card, 
                { opacity: 0, scale: 0.9 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.5, 
                    ease: "power2.out",
                    onStart: function() {
                        card.style.display = 'flex';
                    }
                }
            );
        } else {
            // Hide card with animation
            gsap.to(card, {
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                ease: "power2.in",
                onComplete: function() {
                    card.style.display = 'none';
                }
            });
        }
    });
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('service-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.service-description').textContent.toLowerCase();
            const provider = card.querySelector('.service-meta span:first-child').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || provider.includes(searchTerm)) {
                card.style.display = 'flex';
                
                // Add subtle highlight animation
                gsap.fromTo(card, 
                    { backgroundColor: 'rgba(74, 107, 255, 0.1)' },
                    { backgroundColor: 'rgba(42, 42, 78, 0.7)', duration: 1.5, ease: "power2.out" }
                );
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize dropdown filter
function initDropdownFilter() {
    const filterSelect = document.getElementById('service-filter');
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function() {
        const category = this.value;
        
        // Update category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('active');
            if (card.getAttribute('data-category') === category) {
                card.classList.add('active');
            }
        });
        
        // Filter services
        filterServices(category);
    });
}

// Initialize service details modal
function initServiceDetailsModal() {
    const detailsButtons = document.querySelectorAll('.details-btn');
    const modal = document.getElementById('service-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const bookServiceBtn = modal.querySelector('.book-service-btn');
    
    // Open modal when details button is clicked
    detailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            
            // Get service details
            const serviceTitle = serviceCard.querySelector('h3').textContent;
            const serviceImage = serviceCard.querySelector('.service-image img').src;
            const serviceRating = serviceCard.querySelector('.service-rating span').textContent;
            const serviceProvider = serviceCard.querySelector('.service-meta span:first-child').textContent.replace(/[^a-zA-Z0-9\s.]/g, '').trim();
            const servicePhone = serviceCard.querySelector('.service-meta span:last-child').textContent.replace(/[^+0-9]/g, '');
            const serviceDescription = serviceCard.querySelector('.service-description').textContent;
            
            // Update modal with service details
            document.getElementById('detail-title').textContent = serviceTitle;
            document.getElementById('detail-image').src = serviceImage;
            document.getElementById('detail-rating').textContent = serviceRating;
            document.getElementById('detail-provider').textContent = serviceProvider;
            document.getElementById('detail-phone').textContent = servicePhone;
            document.getElementById('detail-description').textContent = serviceDescription;
            
            // Generate email based on provider name
            const email = serviceProvider.toLowerCase().replace(/\s+/g, '.') + '@example.com';
            document.getElementById('detail-email').textContent = email;
            
            // Open modal
            openModal(modal);
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Open booking modal when book service button is clicked
    bookServiceBtn.addEventListener('click', function() {
        // Close service details modal
        closeModal(modal);
        
        // Get service details
        const serviceTitle = document.getElementById('detail-title').textContent;
        const serviceProvider = document.getElementById('detail-provider').textContent;
        
        // Open booking modal with service details
        openBookingModal(serviceTitle, serviceProvider);
    });
}

// Initialize booking modal
function initBookingModal() {
    const bookButtons = document.querySelectorAll('.book-btn');
    const modal = document.getElementById('booking-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const proceedBtn = modal.querySelector('.proceed-btn');
    
    // Open modal when book button is clicked
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            
            // Get service details
            const serviceTitle = serviceCard.querySelector('h3').textContent;
            const serviceProvider = serviceCard.querySelector('.service-meta span:first-child').textContent.replace(/[^a-zA-Z0-9\s.]/g, '').trim();
            
            // Open booking modal with service details
            openBookingModal(serviceTitle, serviceProvider);
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Close modal when cancel button is clicked
    cancelBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Handle proceed button click
    proceedBtn.addEventListener('click', function() {
        // Validate form
        const form = document.getElementById('booking-form');
        if (form.checkValidity()) {
            // Simulate booking process
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                // Show success message
                const modalBody = modal.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <div class="success-message">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Booking Successful!</h3>
                        <p>Your service booking has been confirmed.</p>
                        <p>Booking ID: BK${Math.floor(Math.random() * 1000000)}</p>
                        <p>The service provider will contact you shortly to confirm the details.</p>
                    </div>
                `;
                
                // Update modal footer
                const modalFooter = modal.querySelector('.modal-footer');
                modalFooter.innerHTML = `
                    <button class="proceed-btn" onclick="window.location.reload()">Done</button>
                `;
                
                // Animate success message
                gsap.from(".success-message", {
                    duration: 0.8,
                    opacity: 0,
                    scale: 0.8,
                    ease: "back.out(1.7)"
                });
            }, 1500);
        } else {
            // Trigger form validation
            form.reportValidity();
        }
    });
}

// Open booking modal with service details
function openBookingModal(serviceTitle, serviceProvider) {
    const modal = document.getElementById('booking-modal');
    
    // Set service details in form
    document.getElementById('booking-service').value = serviceTitle;
    document.getElementById('booking-provider').value = serviceProvider;
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('booking-date').min = today;
    
    // Populate service type options based on service title
    const serviceTypeSelect = document.getElementById('booking-service-type');
    serviceTypeSelect.innerHTML = '<option value="">Select Service Type</option>';
    
    // Add service-specific options
    if (serviceTitle.includes('Plumbing')) {
        addServiceTypeOptions([
            'Leakage Repair',
            'Pipe Installation',
            'Bathroom Fitting',
            'Water Heater Installation',
            'Drain Cleaning',
            'Emergency Service'
        ]);
    } else if (serviceTitle.includes('Electrician')) {
        addServiceTypeOptions([
            'Wiring Installation',
            'Electrical Repairs',
            'Appliance Installation',
            'Fan/Light Installation',
            'Circuit Breaker Issues',
            'Emergency Service'
        ]);
    } else if (serviceTitle.includes('Healthcare')) {
        addServiceTypeOptions([
            'Nursing Care',
            'Physiotherapy',
            'Elder Care',
            'Medical Consultation',
            'Health Check-up',
            'Emergency Service'
        ]);
    } else if (serviceTitle.includes('Tutoring')) {
        addServiceTypeOptions([
            'Mathematics',
            'Science',
            'English',
            'Social Studies',
            'Exam Preparation',
            'Regular Classes'
        ]);
    } else if (serviceTitle.includes('Grocery')) {
        addServiceTypeOptions([
            'Fresh Produce',
            'Dairy Products',
            'Household Essentials',
            'Packaged Foods',
            'Beverages',
            'Monthly Subscription'
        ]);
    } else if (serviceTitle.includes('Salon')) {
        addServiceTypeOptions([
            'Haircut & Styling',
            'Facial',
            'Manicure & Pedicure',
            'Makeup',
            'Hair Coloring',
            'Full Package'
        ]);
    } else if (serviceTitle.includes('Cab')) {
        addServiceTypeOptions([
            'Local Ride',
            'Airport Transfer',
            'Outstation Trip',
            'Hourly Rental',
            'Daily Rental',
            'Regular Commute'
        ]);
    } else {
        addServiceTypeOptions([
            'Basic Service',
            'Premium Service',
            'Consultation',
            'Emergency Service',
            'Regular Service',
            'One-time Service'
        ]);
    }
    
    // Open modal
    openModal(modal);
    
    // Helper function to add options
    function addServiceTypeOptions(options) {
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.toLowerCase().replace(/\s+/g, '-');
            optionElement.textContent = option;
            serviceTypeSelect.appendChild(optionElement);
        });
    }
}

// Initialize pagination
function initPagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            paginationButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            if (!this.classList.contains('next')) {
                this.classList.add('active');
            }
            
            // In a real app, this would load the next page of services
            console.log('Page changed to: ' + this.textContent);
            
            // Simulate page change with animation
            const serviceCards = document.querySelectorAll('.service-card');
            
            // Animate out
            gsap.to(serviceCards, {
                duration: 0.3,
                opacity: 0,
                y: -20,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: function() {
                    // Simulate loading new content (in a real app, you would fetch new data)
                    setTimeout(() => {
                        // Animate in
                        gsap.to(serviceCards, {
                            duration: 0.5,
                            opacity: 1,
                            y: 0,
                            stagger: 0.1,
                            ease: "power2.out"
                        });
                    }, 300);
                }
            });
        });
    });
}

// Function to open modal
function openModal(modal) {
    // Show modal
    modal.classList.add('active');
    
    // Add body class to prevent scrolling
    document.body.classList.add('modal-open');
    
    // Animate modal content
    gsap.fromTo(modal.querySelector('.modal-content'), 
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
}

// Function to close modal
function closeModal(modal) {
    // Animate modal out
    gsap.to(modal.querySelector('.modal-content'), {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: function() {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
}
