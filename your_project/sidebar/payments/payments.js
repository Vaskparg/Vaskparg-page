document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize tabs
    initTabs();
    
    // Initialize payment modal
    initPaymentModal();
    
    // Initialize payment method selection
    initPaymentMethods();
    
    // Initialize filter functionality
    initFilter();
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
    
    // Animate summary cards
    gsap.from(".summary-card", {
        duration: 0.8,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
    });
    
    // Animate tabs
    gsap.from(".tab-btn", {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.8
    });
    
    // Animate payment cards
    gsap.from(".payment-card", {
        duration: 0.8,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1
    });
}

// Initialize tabs functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Animate the new content
            const activeTabContent = document.getElementById(`${tabId}-tab`);
            const items = activeTabContent.querySelectorAll('.payment-card, .receipt-card');
            
            gsap.fromTo(items, 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5, 
                    stagger: 0.1, 
                    ease: "power2.out" 
                }
            );
        });
    });
}

// Initialize payment modal
function initPaymentModal() {
    const payNowButtons = document.querySelectorAll('.pay-now-btn');
    const modal = document.getElementById('payment-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const proceedBtn = modal.querySelector('.proceed-btn');
    
    // Open modal when Pay Now button is clicked
    payNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get payment details from the card
            const card = this.closest('.payment-card');
            const title = card.querySelector('h3').textContent;
            const amount = card.querySelector('.amount').textContent;
            
            // Update modal with payment details
            document.getElementById('payment-title').textContent = title;
            document.getElementById('payment-amount').textContent = amount;
            
            // Show modal
            modal.classList.add('active');
            
            // Add body class to prevent scrolling
            document.body.classList.add('modal-open');
            
            // Animate modal content
            gsap.fromTo('.modal-content', 
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when cancel button is clicked
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Handle proceed button click
    proceedBtn.addEventListener('click', function() {
        // Simulate payment processing
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        this.disabled = true;
        
        setTimeout(() => {
            // Show success message
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="payment-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Payment Successful!</h3>
                    <p>Your payment has been processed successfully.</p>
                    <p>Transaction ID: TX${Math.floor(Math.random() * 1000000)}</p>
                </div>
            `;
            
            // Update modal footer
            const modalFooter = modal.querySelector('.modal-footer');
            modalFooter.innerHTML = `
                <button class="proceed-btn" onclick="window.location.reload()">Done</button>
            `;
            
            // Animate success message
            gsap.from(".payment-success", {
                duration: 0.8,
                opacity: 0,
                scale: 0.8,
                ease: "back.out(1.7)"
            });
        }, 2000);
    });
    
    // Function to close modal
    function closeModal() {
        // Animate modal out
        gsap.to('.modal-content', {
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
}

// Initialize payment method selection
function initPaymentMethods() {
    const methodOptions = document.querySelectorAll('.method-option');
    
    methodOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            methodOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Show corresponding payment section (in a real app)
            // For now, we'll just keep the UPI section visible
        });
    });
}

// Initialize filter functionality
function initFilter() {
    const filterSelect = document.getElementById('payment-filter');
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function() {
        const status = this.value;
        const payments = document.querySelectorAll('.payment-card');
        
        payments.forEach(payment => {
            if (status === 'all') {
                payment.style.display = 'flex';
                
                // Add animation for appearing items
                gsap.from(payment, {
                    duration: 0.5,
                    opacity: 0,
                    y: 20,
                    ease: "power2.out",
                    clearProps: "all"
                });
            } else {
                const paymentStatus = payment.querySelector('.status').textContent.toLowerCase();
                
                if (paymentStatus === status) {
                    payment.style.display = 'flex';
                    
                    // Add animation for appearing items
                    gsap.from(payment, {
                        duration: 0.5,
                        opacity: 0,
                        y: 20,
                        ease: "power2.out",
                        clearProps: "all"
                    });
                } else {
                    // Animate hiding
                    gsap.to(payment, {
                        duration: 0.3,
                        opacity: 0,
                        y: -20,
                        ease: "power2.in",
                        onComplete: function() {
                            payment.style.display = 'none';
                            gsap.set(payment, {clearProps: "opacity,transform"});
                        }
                    });
                }
            }
        });
    });
}

// Receipt view and download functionality
document.querySelectorAll('.view-receipt-btn, .view-btn').forEach(button => {
    button.addEventListener('click', function() {
        // In a real app, this would open the receipt in a modal or new window
        alert('Receipt viewer will open here');
    });
});

document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', function() {
        // In a real app, this would download the receipt
        alert('Receipt download will start here');
    });
});
