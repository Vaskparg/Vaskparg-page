document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize filter functionality
    initFilter();
    
    // Initialize mark as read functionality
    initMarkAsRead();
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
    
    // Animate announcement cards with stagger
    gsap.from(".announcement-card", {
        duration: 0.8,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
    });
    
    // Animate pagination
    gsap.from(".pagination", {
        duration: 0.8,
        opacity: 0,
        y: 20,
        ease: "power2.out",
        delay: 1
    });
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('announcement-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const announcements = document.querySelectorAll('.announcement-card');
        
        announcements.forEach(announcement => {
            const title = announcement.querySelector('h2').textContent.toLowerCase();
            const content = announcement.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                announcement.style.display = 'block';
                
                // Highlight the search term
                if (searchTerm.length > 0) {
                    highlightText(announcement, searchTerm);
                } else {
                    // Remove highlights
                    removeHighlights(announcement);
                }
            } else {
                announcement.style.display = 'none';
            }
        });
    });
}

// Highlight search terms in text
function highlightText(element, term) {
    // Remove existing highlights first
    removeHighlights(element);
    
    // Highlight in title
    const title = element.querySelector('h2');
    title.innerHTML = title.textContent.replace(
        new RegExp(term, 'gi'),
        match => `<span class="highlight">${match}</span>`
    );
    
    // Highlight in content
    const content = element.querySelector('p');
    content.innerHTML = content.textContent.replace(
        new RegExp(term, 'gi'),
        match => `<span class="highlight">${match}</span>`
    );
}

// Remove highlights
function removeHighlights(element) {
    const title = element.querySelector('h2');
    const content = element.querySelector('p');
    
    if (title.innerHTML.includes('<span class="highlight">')) {
        title.textContent = title.textContent;
    }
    
    if (content.innerHTML.includes('<span class="highlight">')) {
        content.textContent = content.textContent;
    }
}

// Initialize filter functionality
function initFilter() {
    const filterSelect = document.getElementById('announcement-filter');
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function() {
        const category = this.value;
        const announcements = document.querySelectorAll('.announcement-card');
        
        announcements.forEach(announcement => {
            if (category === 'all') {
                announcement.style.display = 'block';
                
                // Add animation for appearing items
                gsap.from(announcement, {
                    duration: 0.5,
                    opacity: 0,
                    y: 20,
                    ease: "power2.out",
                    clearProps: "all"
                });
            } else {
                const announcementCategory = announcement.querySelector('.announcement-category').textContent.toLowerCase();
                
                if (announcementCategory === category) {
                    announcement.style.display = 'block';
                    
                    // Add animation for appearing items
                    gsap.from(announcement, {
                        duration: 0.5,
                        opacity: 0,
                        y: 20,
                        ease: "power2.out",
                        clearProps: "all"
                    });
                } else {
                    // Animate hiding
                    gsap.to(announcement, {
                        duration: 0.3,
                        opacity: 0,
                        y: -20,
                        ease: "power2.in",
                        onComplete: function() {
                            announcement.style.display = 'none';
                            gsap.set(announcement, {clearProps: "opacity,transform"});
                        }
                    });
                }
            }
        });
    });
}

// Initialize mark as read functionality
function initMarkAsRead() {
    const markReadButtons = document.querySelectorAll('.mark-read-btn:not(.read)');
    
    markReadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add 'read' class to button
            this.classList.add('read');
            
            // Change text
            this.innerHTML = '<i class="fas fa-check"></i> Read';
            
            // Disable button
            this.disabled = true;
            
            // Add animation
            gsap.from(this, {
                duration: 0.5,
                scale: 1.2,
                ease: "elastic.out(1, 0.5)"
            });
            
            // In a real application, you would send an AJAX request to mark the announcement as read in the database
            console.log('Announcement marked as read');
        });
    });
}

// Pagination functionality
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
        
        // In a real application, you would load the next page of announcements here
        console.log('Page changed to: ' + this.textContent);
        
        // Simulate page change with animation
        const announcements = document.querySelectorAll('.announcement-card');
        
        // Animate out
        gsap.to(announcements, {
            duration: 0.3,
            opacity: 0,
            y: -20,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: function() {
                // Simulate loading new content (in a real app, you would fetch new data)
                setTimeout(() => {
                    // Animate in
                    gsap.to(announcements, {
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
