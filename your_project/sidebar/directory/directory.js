document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize tabs
    initTabs();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize filter functionality
    initFilter();
    
    // Initialize favorite functionality
    initFavorites();
    
    // Initialize contact modal
    initContactModal();
    
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
    
    // Animate tabs
    gsap.from(".tab-btn", {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
    });
    
    // Animate grid cards
    gsap.from(".resident-card", {
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
            
            // Animate the new content based on tab
            animateTabContent(tabId);
        });
    });
}

// Animate tab content based on tab ID
function animateTabContent(tabId) {
    if (tabId === 'grid') {
        const residentCards = document.querySelectorAll('.resident-card');
        
        gsap.fromTo(residentCards, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                stagger: 0.1, 
                ease: "power2.out" 
            }
        );
    } else if (tabId === 'list') {
        const residentRows = document.querySelectorAll('.resident-row');
        
        gsap.fromTo(residentRows, 
            { opacity: 0, x: -30 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.8, 
                stagger: 0.1, 
                ease: "power2.out" 
            }
        );
    } else if (tabId === 'favorites') {
        const favoritesEmpty = document.querySelector('.favorites-empty');
        
        gsap.fromTo(favoritesEmpty, 
            { opacity: 0, scale: 0.9 },
            { 
                opacity: 1, 
                scale: 1, 
                duration: 0.8, 
                ease: "power2.out" 
            }
        );
    } else if (tabId === 'committee') {
        const committeeCards = document.querySelectorAll('.committee-card');
        
        gsap.fromTo(committeeCards, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                stagger: 0.2, 
                ease: "power2.out" 
            }
        );
    }
    
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

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('directory-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const activeTab = document.querySelector('.tab-content.active').id;
        
        if (activeTab === 'grid-tab') {
            const residentCards = document.querySelectorAll('.resident-card');
            
            residentCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const flat = card.querySelector('.resident-flat').textContent.toLowerCase();
                const block = card.getAttribute('data-block').toLowerCase();
                
                if (name.includes(searchTerm) || flat.includes(searchTerm) || block.includes(searchTerm)) {
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
        } else if (activeTab === 'list-tab') {
            const residentRows = document.querySelectorAll('.resident-row');
            
            residentRows.forEach(row => {
                const name = row.querySelector('h3').textContent.toLowerCase();
                const flat = row.querySelector('.resident-flat').textContent.toLowerCase();
                const block = row.getAttribute('data-block').toLowerCase();
                
                if (name.includes(searchTerm) || flat.includes(searchTerm) || block.includes(searchTerm)) {
                    row.style.display = 'flex';
                    
                    // Add subtle highlight animation
                    gsap.fromTo(row, 
                        { backgroundColor: 'rgba(74, 107, 255, 0.1)' },
                        { backgroundColor: 'rgba(42, 42, 78, 0.7)', duration: 1.5, ease: "power2.out" }
                    );
                } else {
                    row.style.display = 'none';
                }
            });
        } else if (activeTab === 'committee-tab') {
            const committeeCards = document.querySelectorAll('.committee-card');
            
            committeeCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const role = card.querySelector('.committee-role').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || role.includes(searchTerm)) {
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
        }
    });
}

// Initialize filter functionality
function initFilter() {
    const filterSelect = document.getElementById('directory-filter');
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function() {
        const block = this.value;
        const activeTab = document.querySelector('.tab-content.active').id;
        
        if (activeTab === 'grid-tab') {
            const residentCards = document.querySelectorAll('.resident-card');
            
            residentCards.forEach(card => {
                const cardBlock = card.getAttribute('data-block');
                
                if (block === 'all' || cardBlock === block) {
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
        } else if (activeTab === 'list-tab') {
            const residentRows = document.querySelectorAll('.resident-row');
            
            residentRows.forEach(row => {
                const rowBlock = row.getAttribute('data-block');
                
                if (block === 'all' || rowBlock === block) {
                    // Show row with animation
                    gsap.fromTo(row, 
                        { opacity: 0, x: -30 },
                        { 
                            opacity: 1, 
                            x: 0, 
                            duration: 0.5, 
                            ease: "power2.out",
                            onStart: function() {
                                row.style.display = 'flex';
                            }
                        }
                    );
                } else {
                    // Hide row with animation
                    gsap.to(row, {
                        opacity: 0,
                        x: -30,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: function() {
                            row.style.display = 'none';
                        }
                    });
                }
            });
        }
    });
}

// Initialize favorite functionality
function initFavorites() {
    const favoriteButtons = document.querySelectorAll('.action-btn.favorite');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle favorite state
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                // Change icon to filled star
                this.innerHTML = '<i class="fas fa-star"></i>';
                
                // Animate button
                gsap.fromTo(this, 
                    { scale: 1 },
                    { 
                        scale: 1.3, 
                        duration: 0.3, 
                        ease: "back.out(1.7)",
                        onComplete: function() {
                            gsap.to(button, { scale: 1, duration: 0.2 });
                        }
                    }
                );
                
                // Show toast notification
                showToast('Added to favorites');
                
                // Update favorites tab
                updateFavoritesTab();
            } else {
                // Change icon back to outline star
                this.innerHTML = '<i class="far fa-star"></i>';
                
                // Show toast notification
                showToast('Removed from favorites');
                
                // Update favorites tab
                updateFavoritesTab();
            }
        });
    });
}

// Update favorites tab
function updateFavoritesTab() {
    const favoritesTab = document.getElementById('favorites-tab');
    const favoriteButtons = document.querySelectorAll('.action-btn.favorite.active');
    
    if (favoriteButtons.length > 0) {
        // Create favorites grid if it doesn't exist
        let favoritesGrid = favoritesTab.querySelector('.directory-grid');
        if (!favoritesGrid) {
            favoritesGrid = document.createElement('div');
            favoritesGrid.className = 'directory-grid';
            favoritesTab.innerHTML = '';
            favoritesTab.appendChild(favoritesGrid);
        } else {
            // Clear existing favorites
            favoritesGrid.innerHTML = '';
        }
        
        // Add favorite residents to grid
        favoriteButtons.forEach(button => {
            const residentCard = button.closest('.resident-card');
            if (residentCard) {
                const clonedCard = residentCard.cloneNode(true);
                favoritesGrid.appendChild(clonedCard);
                
                // Update favorite button in cloned card
                const clonedButton = clonedCard.querySelector('.action-btn.favorite');
                clonedButton.classList.add('active');
                clonedButton.innerHTML = '<i class="fas fa-star"></i>';
                
                // Add event listener to cloned button
                clonedButton.addEventListener('click', function() {
                    // Find the original button and click it
                    const originalButton = document.querySelector(`.resident-card[data-block="${residentCard.getAttribute('data-block')}"][data-flat="${residentCard.getAttribute('data-flat')}"] .action-btn.favorite`);
                    if (originalButton) {
                        originalButton.click();
                    }
                });
                
                // Add event listener to cloned contact button
                const clonedContactButton = clonedCard.querySelector('.action-btn.contact');
                clonedContactButton.addEventListener('click', function() {
                    openContactModal(clonedCard);
                });
            }
        });
    } else {
        // Show empty state
        favoritesTab.innerHTML = `
            <div class="favorites-empty">
                <div class="empty-icon">
                    <i class="far fa-star"></i>
                </div>
                <h3>No Favorites Yet</h3>
                <p>Add residents to your favorites for quick access by clicking the star icon.</p>
            </div>
        `;
    }
}

// Show toast notification
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
        
        // Style the toast
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.background = 'rgba(74, 107, 255, 0.9)';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '2000';
        toast.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        toast.style.opacity = '0';
    }
    
    // Set message
    toast.textContent = message;
    
    // Animate toast
    gsap.to(toast, { opacity: 1, y: -10, duration: 0.3, ease: "power2.out" });
    
    // Hide toast after 3 seconds
    gsap.to(toast, { 
        opacity: 0, 
        y: 0, 
        duration: 0.3, 
        delay: 3, 
        ease: "power2.in" 
    });
}

// Initialize contact modal
function initContactModal() {
    const contactButtons = document.querySelectorAll('.action-btn.contact');
    const modal = document.getElementById('contact-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const closeDetailsBtn = modal.querySelector('.close-details-btn');
    
    // Open modal when contact button is clicked
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const residentCard = this.closest('.resident-card') || this.closest('.resident-row');
            openContactModal(residentCard);
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
    
    // Handle method buttons
    document.querySelector('.method-btn.call').addEventListener('click', function() {
        const phone = document.getElementById('contact-phone').textContent;
        alert(`Calling ${phone}...`);
    });
    
    document.querySelector('.method-btn.sms').addEventListener('click', function() {
        const phone = document.getElementById('contact-phone').textContent;
        alert(`Sending SMS to ${phone}...`);
    });
    
    document.querySelector('.method-btn.email').addEventListener('click', function() {
        const email = document.getElementById('contact-email').textContent;
        alert(`Sending email to ${email}...`);
    });
    
    document.querySelector('.method-btn.message').addEventListener('click', function() {
        const name = document.getElementById('contact-name').textContent;
        alert(`Opening message window for ${name}...`);
    });
}

// Open contact modal with resident details
function openContactModal(residentCard) {
    const modal = document.getElementById('contact-modal');
    const residentName = residentCard.querySelector('h3').textContent;
    const residentFlat = residentCard.querySelector('.resident-flat').textContent;
    const residentAvatar = residentCard.querySelector('.resident-avatar img').src;
    
    // Get contact details
    let phone, email;
    const metaSpans = residentCard.querySelectorAll('.resident-meta span');
    metaSpans.forEach(span => {
        const text = span.textContent;
        if (text.includes('+91')) {
            phone = text.replace(/[^+0-9]/g, '');
        } else if (text.includes('@')) {
            email = text.replace(/[^a-zA-Z0-9@._-]/g, '');
        }
    });
    
    // Update modal with resident details
    document.getElementById('contact-name').textContent = residentName;
    document.getElementById('contact-flat').textContent = residentFlat;
    document.getElementById('contact-avatar').src = residentAvatar;
    document.getElementById('contact-phone').textContent = phone;
    document.getElementById('contact-email').textContent = email;
    
    // Open modal
    openModal(modal);
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
            
            // In a real app, this would load the next page of residents
            console.log('Page changed to: ' + this.textContent);
            
            // Simulate page change with animation
            const activeTab = document.querySelector('.tab-content.active').id;
            
            if (activeTab === 'grid-tab') {
                const residentCards = document.querySelectorAll('.resident-card');
                
                // Animate out
                gsap.to(residentCards, {
                    duration: 0.3,
                    opacity: 0,
                    y: -20,
                    stagger: 0.05,
                    ease: "power2.in",
                    onComplete: function() {
                        // Simulate loading new content (in a real app, you would fetch new data)
                        setTimeout(() => {
                            // Animate in
                            gsap.to(residentCards, {
                                duration: 0.5,
                                opacity: 1,
                                y: 0,
                                stagger: 0.1,
                                ease: "power2.out"
                            });
                        }, 300);
                    }
                });
            } else if (activeTab === 'list-tab') {
                const residentRows = document.querySelectorAll('.resident-row');
                
                // Animate out
                gsap.to(residentRows, {
                    duration: 0.3,
                    opacity: 0,
                    x: -20,
                    stagger: 0.05,
                    ease: "power2.in",
                    onComplete: function() {
                        // Simulate loading new content (in a real app, you would fetch new data)
                        setTimeout(() => {
                            // Animate in
                            gsap.to(residentRows, {
                                duration: 0.5,
                                opacity: 1,
                                x: 0,
                                stagger: 0.1,
                                ease: "power2.out"
                            });
                        }, 300);
                    }
                });
            }
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
