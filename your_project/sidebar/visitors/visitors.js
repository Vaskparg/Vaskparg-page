document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize tabs
    initTabs();
    
    // Initialize visitor modal
    initVisitorModal();
    
    // Initialize QR code modal
    initQRModal();
    
    // Initialize date and time pickers
    initDateTimePickers();
    
    // Initialize visitor filter
    initVisitorFilter();
    
    // Initialize visitor actions
    initVisitorActions();
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
    
    // Animate tabs
    gsap.from(".tab-btn", {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
    });
    
    // Animate visitor cards
    gsap.from(".visitor-card", {
        duration: 0.8,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.7
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
            animateTabContent(tabId);
        });
    });
}

// Animate tab content based on tab ID
function animateTabContent(tabId) {
    const visitorCards = document.querySelectorAll(`#${tabId}-tab .visitor-card`);
    
    gsap.fromTo(visitorCards, 
        { opacity: 0, y: 30 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out" 
        }
    );
    
    // Animate pagination if it exists
    const pagination = document.querySelector(`#${tabId}-tab .pagination`);
    if (pagination) {
        gsap.fromTo(pagination, 
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                ease: "power2.out",
                delay: 0.5
            }
        );
    }
}

// Initialize visitor modal
function initVisitorModal() {
    const addVisitorBtn = document.getElementById('add-visitor-btn');
    const modal = document.getElementById('visitor-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const proceedBtn = modal.querySelector('.proceed-btn');
    
    // Open modal when Add Visitor button is clicked
    addVisitorBtn.addEventListener('click', function() {
        openModal(modal);
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
        const form = document.getElementById('visitor-form');
        if (form.checkValidity()) {
            // Simulate adding visitor
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
                        <h3>Visitor Added Successfully!</h3>
                        <p>Your visitor has been added to the expected visitors list.</p>
                        <p>A notification will be sent to security when they arrive.</p>
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

// Initialize QR code modal
function initQRModal() {
    const qrButtons = document.querySelectorAll('.qr-btn');
    const modal = document.getElementById('qr-modal');
    const closeBtn = modal.querySelector('.close-btn');
    
    // Open modal when QR Code button is clicked
    qrButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get visitor details
            const visitorCard = this.closest('.visitor-card');
            const visitorName = visitorCard.querySelector('h3').textContent;
            const visitorDate = visitorCard.querySelector('.visitor-meta span:nth-child(1)').textContent.replace('Expected: ', '');
            const visitorTime = visitorCard.querySelector('.visitor-meta span:nth-child(2)').textContent.replace('Time: ', '');
            const visitorGuests = visitorCard.querySelector('.visitor-meta span:nth-child(3)').textContent.replace('Guests: ', '');
            
            // Update QR modal with visitor details
            document.getElementById('qr-visitor-name').textContent = visitorName;
            document.getElementById('qr-date').textContent = visitorDate;
            document.getElementById('qr-time').textContent = visitorTime;
            document.getElementById('qr-guests').textContent = visitorGuests;
            
            // Generate new QR code with visitor details
            const qrData = `Name: ${visitorName}, Date: ${visitorDate}, Time: ${visitorTime}, Guests: ${visitorGuests}`;
            const qrImage = document.querySelector('.qr-code img');
            qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
            
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
    
    // Handle share button click
    const shareBtn = modal.querySelector('.share-btn');
    shareBtn.addEventListener('click', function() {
        // In a real app, this would use the Web Share API
        alert('Sharing functionality will be implemented here');
    });
    
    // Handle download button click
    const downloadBtn = modal.querySelector('.download-btn');
    downloadBtn.addEventListener('click', function() {
        // In a real app, this would download the QR code image
        alert('Download functionality will be implemented here');
    });
}

// Initialize date and time pickers
function initDateTimePickers() {
    // Initialize date picker
    flatpickr("#visitor-date", {
        dateFormat: "Y-m-d",
        minDate: "today",
        disableMobile: true
    });
    
    // Initialize time picker
    flatpickr("#visitor-time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        disableMobile: true
    });
}

// Initialize visitor filter
function initVisitorFilter() {
    const filterSelect = document.getElementById('visitor-filter');
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function() {
        const status = this.value;
        
        // If 'all' is selected, show all tabs
        if (status === 'all') {
            // Show first tab by default
            document.querySelector('.tab-btn[data-tab="expected"]').click();
            return;
        }
        
        // Otherwise, show the corresponding tab
        document.querySelector(`.tab-btn[data-tab="${status}"]`).click();
    });
}

// Initialize visitor actions
function initVisitorActions() {
    // Handle edit button click
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get visitor details
            const visitorCard = this.closest('.visitor-card');
            const visitorName = visitorCard.querySelector('h3').textContent;
            
            // Open visitor modal with pre-filled data
            const modal = document.getElementById('visitor-modal');
            document.getElementById('visitor-name').value = visitorName;
            
            // Open modal
            openModal(modal);
        });
    });
    
    // Handle cancel button click
    document.querySelectorAll('.cancel-btn').forEach(button => {
        if (!button.closest('.modal-footer')) {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to cancel this visitor? This action cannot be undone.')) {
                    const visitorCard = this.closest('.visitor-card');
                    
                    // Animate card removal
                    gsap.to(visitorCard, {
                        opacity: 0,
                        x: -100,
                        duration: 0.5,
                        ease: "power2.in",
                        onComplete: function() {
                            visitorCard.style.display = 'none';
                        }
                    });
                }
            });
        }
    });
    
    // Handle checkout button click
    document.querySelectorAll('.checkout-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to check out this visitor?')) {
                const visitorCard = this.closest('.visitor-card');
                
                // Animate card removal
                gsap.to(visitorCard, {
                    opacity: 0,
                    x: -100,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: function() {
                        visitorCard.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Handle extend button click
    document.querySelectorAll('.extend-btn').forEach(button => {
        button.addEventListener('click', function() {
            alert('Extend visit functionality will be implemented here');
        });
    });
    
    // Handle add to frequent button click
    document.querySelectorAll('.add-frequent-btn').forEach(button => {
        button.addEventListener('click', function() {
            alert('Added to frequent visitors');
            
            // Change button style to indicate success
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.disabled = true;
            this.style.background = 'rgba(76, 175, 80, 0.2)';
            this.style.borderColor = '#4caf50';
            this.style.color = '#4caf50';
            
            // Animate button
            gsap.from(this, {
                duration: 0.5,
                scale: 1.2,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });
    
    // Handle invite again button click
    document.querySelectorAll('.invite-again-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get visitor details
            const visitorCard = this.closest('.visitor-card');
            const visitorName = visitorCard.querySelector('h3').textContent;
            
            // Open visitor modal with pre-filled data
            const modal = document.getElementById('visitor-modal');
            document.getElementById('visitor-name').value = visitorName;
            
            // Open modal
            openModal(modal);
        });
    });
    
    // Handle invite button click
    document.querySelectorAll('.invite-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get visitor details
            const visitorCard = this.closest('.visitor-card');
            const visitorName = visitorCard.querySelector('h3').textContent;
            
            // Open visitor modal with pre-filled data
            const modal = document.getElementById('visitor-modal');
            document.getElementById('visitor-name').value = visitorName;
            
            // Open modal
            openModal(modal);
        });
    });
    
    // Handle remove button click
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this visitor from frequent visitors?')) {
                const visitorCard = this.closest('.visitor-card');
                
                // Animate card removal
                gsap.to(visitorCard, {
                    opacity: 0,
                    x: -100,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: function() {
                        visitorCard.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Handle pagination
    document.querySelectorAll('.pagination-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.pagination-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            if (!this.classList.contains('next')) {
                this.classList.add('active');
            }
            
            // In a real app, this would load the next page of visitors
            console.log('Page changed to: ' + this.textContent);
            
            // Simulate page change with animation
            const visitorCards = document.querySelectorAll('.visitor-card');
            
            // Animate out
            gsap.to(visitorCards, {
                duration: 0.3,
                opacity: 0,
                y: -20,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: function() {
                    // Simulate loading new content (in a real app, you would fetch new data)
                    setTimeout(() => {
                        // Animate in
                        gsap.to(visitorCards, {
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
