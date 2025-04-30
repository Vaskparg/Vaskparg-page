document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize tabs
    initTabs();
    
    // Initialize request modal
    initRequestModal();
    
    // Initialize update modal
    initUpdateModal();
    
    // Initialize feedback modal
    initFeedbackModal();
    
    // Initialize details modal
    initDetailsModal();
    
    // Initialize request filter
    initRequestFilter();
    
    // Initialize request actions
    initRequestActions();
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
    
    // Animate stats cards
    gsap.from(".stat-card", {
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
    
    // Animate request cards
    gsap.from(".request-card", {
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
            animateTabContent(tabId);
        });
    });
}

// Animate tab content based on tab ID
function animateTabContent(tabId) {
    const requestCards = document.querySelectorAll(`#${tabId}-tab .request-card`);
    
    gsap.fromTo(requestCards, 
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

// Initialize request modal
function initRequestModal() {
    const newRequestBtn = document.getElementById('new-request-btn');
    const modal = document.getElementById('request-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const proceedBtn = modal.querySelector('.proceed-btn');
    
    // Open modal when New Request button is clicked
    newRequestBtn.addEventListener('click', function() {
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
        const form = document.getElementById('request-form');
        if (form.checkValidity()) {
            // Simulate adding request
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
                        <h3>Request Submitted Successfully!</h3>
                        <p>Your service request has been submitted and is now being reviewed.</p>
                        <p>Request ID: SR${Math.floor(Math.random() * 1000000)}</p>
                        <p>You will be notified of any updates.</p>
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

// Initialize update modal
function initUpdateModal() {
    const updateButtons = document.querySelectorAll('.update-btn');
    const modal = document.getElementById('update-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const proceedBtn = modal.querySelector('.proceed-btn');
    
    // Open modal when Update button is clicked
    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get request details
            const requestCard = this.closest('.request-card');
            const requestTitle = requestCard.querySelector('h3').textContent;
            
            // Update modal title
            modal.querySelector('.modal-header h2').textContent = `Add Update: ${requestTitle}`;
            
            // Open modal
            openModal(modal);
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
        const form = document.getElementById('update-form');
        if (form.checkValidity()) {
            // Get update text
            const updateText = document.getElementById('update-text').value;
            
            // Simulate adding update
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
                        <h3>Update Added Successfully!</h3>
                        <p>Your update has been added to the service request.</p>
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
            }, 1000);
        } else {
            // Trigger form validation
            form.reportValidity();
        }
    });
}

// Initialize feedback modal
function initFeedbackModal() {
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    const modal = document.getElementById('feedback-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const proceedBtn = modal.querySelector('.proceed-btn');
    const ratingStars = modal.querySelectorAll('.rating-input i');
    const ratingInput = document.getElementById('rating-value');
    
    // Open modal when Feedback button is clicked
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get request details
            const requestCard = this.closest('.request-card');
            const requestTitle = requestCard.querySelector('h3').textContent;
            
            // Update modal title
            modal.querySelector('.modal-header h2').textContent = `Give Feedback: ${requestTitle}`;
            
            // Reset rating
            ratingStars.forEach(star => {
                star.className = 'far fa-star';
            });
            ratingInput.value = 0;
            
            // Open modal
            openModal(modal);
        });
    });
    
    // Handle star rating
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Update star display
            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.className = 'fas fa-star active';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
        
        // Hover effect
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.className = 'fas fa-star';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const currentRating = parseInt(ratingInput.value);
            
            ratingStars.forEach((s, index) => {
                if (index < currentRating) {
                    s.className = 'fas fa-star active';
                } else {
                    s.className = 'far fa-star';
                }
            });
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
        const form = document.getElementById('feedback-form');
        if (form.checkValidity() && ratingInput.value > 0) {
            // Get feedback text and rating
            const feedbackText = document.getElementById('feedback-text').value;
            const rating = ratingInput.value;
            
            // Simulate submitting feedback
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
                        <h3>Feedback Submitted Successfully!</h3>
                        <p>Thank you for your feedback. Your input helps us improve our services.</p>
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
            }, 1000);
        } else if (ratingInput.value === '0') {
            alert('Please select a rating');
        } else {
            // Trigger form validation
            form.reportValidity();
        }
    });
}

// Initialize details modal
function initDetailsModal() {
    const detailsButtons = document.querySelectorAll('.details-btn');
    const modal = document.getElementById('details-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const closeDetailsBtn = modal.querySelector('.close-details-btn');
    
    // Open modal when Details button is clicked
    detailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get request details
            const requestCard = this.closest('.request-card');
            const requestTitle = requestCard.querySelector('h3').textContent;
            const requestStatus = requestCard.querySelector('.request-status').textContent;
            const requestCategory = requestCard.querySelector('.request-category').textContent.replace('Category: ', '');
            const requestDate = requestCard.querySelector('.request-meta span:nth-child(1)').textContent.replace('Reported: ', '');
            const requestPriority = requestCard.querySelector('.request-meta span:nth-child(3)').textContent.replace('Priority: ', '');
            const requestDescription = requestCard.querySelector('.request-description').textContent;
            
            // Update modal with request details
            document.getElementById('details-title').textContent = requestTitle;
            document.getElementById('details-status').textContent = requestStatus;
            document.getElementById('details-category').textContent = requestCategory;
            document.getElementById('details-date').textContent = requestDate;
            document.getElementById('details-priority').textContent = requestPriority;
            document.getElementById('details-location').textContent = 'Kitchen'; // Placeholder
            document.getElementById('details-description').textContent = requestDescription;
            
            // Set status color
            const statusElement = document.getElementById('details-status');
            if (requestStatus === 'Open') {
                statusElement.style.background = 'rgba(74, 107, 255, 0.1)';
                statusElement.style.color = 'var(--primary-color)';
            } else if (requestStatus === 'In Progress') {
                statusElement.style.background = 'rgba(255, 165, 0, 0.1)';
                statusElement.style.color = '#ffa500';
            } else if (requestStatus === 'Resolved') {
                statusElement.style.background = 'rgba(76, 175, 80, 0.1)';
                statusElement.style.color = '#4caf50';
            }
            
            // Build timeline
            const timeline = document.querySelector('.timeline');
            timeline.innerHTML = `
                <div class="timeline-item">
                    <div class="timeline-icon">
                        <i class="fas fa-plus-circle"></i>
                    </div>
                    <div class="timeline-content">
                        <p class="timeline-date">${requestDate}</p>
                        <p class="timeline-text">Request created</p>
                    </div>
                </div>
            `;
            
            // Add updates to timeline if they exist
            const updates = requestCard.querySelectorAll('.update-item');
            updates.forEach(update => {
                const updateTime = update.querySelector('.update-time').textContent;
                const updateText = update.querySelector('.update-text').textContent;
                
                timeline.innerHTML += `
                    <div class="timeline-item">
                        <div class="timeline-icon">
                            <i class="fas fa-comment"></i>
                        </div>
                        <div class="timeline-content">
                            <p class="timeline-date">${updateTime}</p>
                            <p class="timeline-text">${updateText}</p>
                        </div>
                    </div>
                `;
            });
            
            // Add resolved status to timeline if resolved
            if (requestStatus === 'Resolved') {
                const resolvedDate = requestCard.querySelector('.request-meta span:nth-child(3)').textContent.replace('Resolved: ', '');
                
                timeline.innerHTML += `
                    <div class="timeline-item">
                        <div class="timeline-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="timeline-content">
                            <p class="timeline-date">${resolvedDate}</p>
                            <p class="timeline-text">Request resolved</p>
                        </div>
                    </div>
                `;
            }
            
            // Open modal
            openModal(modal);
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Close modal when close details button is clicked
    closeDetailsBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

// Initialize request filter
function initRequestFilter() {
    const filterSelect = document.getElementById('request-filter');
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function() {
        const status = this.value;
        
        // If 'all' is selected, show all tabs
        if (status === 'all') {
            // Show first tab by default
            document.querySelector('.tab-btn[data-tab="all"]').click();
            return;
        }
        
        // Otherwise, show the corresponding tab
        document.querySelector(`.tab-btn[data-tab="${status}"]`).click();
    });
}

// Initialize request actions
function initRequestActions() {
    // Handle edit button click
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get request details
            const requestCard = this.closest('.request-card');
            const requestTitle = requestCard.querySelector('h3').textContent;
            const requestCategory = requestCard.querySelector('.request-category').textContent.replace('Category: ', '');
            const requestDescription = requestCard.querySelector('.request-description').textContent;
            
            // Open request modal with pre-filled data
            const modal = document.getElementById('request-modal');
            document.getElementById('request-title').value = requestTitle;
            document.getElementById('request-description').value = requestDescription;
            
            // Open modal
            openModal(modal);
        });
    });
    
    // Handle cancel button click
    document.querySelectorAll('.cancel-btn').forEach(button => {
        if (!button.closest('.modal-footer')) {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to cancel this request? This action cannot be undone.')) {
                    const requestCard = this.closest('.request-card');
                    
                    // Animate card removal
                    gsap.to(requestCard, {
                        opacity: 0,
                        x: -100,
                        duration: 0.5,
                        ease: "power2.in",
                        onComplete: function() {
                            requestCard.style.display = 'none';
                            
                            // Update stats
                            updateStats();
                        }
                    });
                }
            });
        }
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
            
            // In a real app, this would load the next page of requests
            console.log('Page changed to: ' + this.textContent);
            
            // Simulate page change with animation
            const requestCards = document.querySelectorAll('.request-card');
            
            // Animate out
            gsap.to(requestCards, {
                duration: 0.3,
                opacity: 0,
                y: -20,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: function() {
                    // Simulate loading new content (in a real app, you would fetch new data)
                    setTimeout(() => {
                        // Animate in
                        gsap.to(requestCards, {
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

// Update stats after actions
function updateStats() {
    // Count requests by status
    const openRequests = document.querySelectorAll('.request-card.open:not([style*="display: none"])').length;
    const inProgressRequests = document.querySelectorAll('.request-card.in-progress:not([style*="display: none"])').length;
    const resolvedRequests = document.querySelectorAll('.request-card.resolved:not([style*="display: none"])').length;
    const totalRequests = openRequests + inProgressRequests + resolvedRequests;
    
    // Update stats
    document.querySelector('.stat-card:nth-child(1) .stat-count').textContent = totalRequests;
    document.querySelector('.stat-card:nth-child(2) .stat-count').textContent = openRequests;
    document.querySelector('.stat-card:nth-child(3) .stat-count').textContent = inProgressRequests;
    document.querySelector('.stat-card:nth-child(4) .stat-count').textContent = resolvedRequests;
    
    // Animate stats update
    gsap.from('.stat-card .stat-count', {
        duration: 0.5,
        scale: 1.2,
        color: 'var(--primary-color)',
        ease: "power2.out",
        stagger: 0.1
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
