document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize tabs
    initTabs();
    
    // Initialize booking modal
    initBookingModal();
    
    // Initialize date and time pickers
    initDateTimePickers();
    
    // Initialize facility filter
    initFacilityFilter();
    
    // Initialize calendar interactions
    initCalendarInteractions();
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
    
    // Animate calendar header
    gsap.from(".calendar-header", {
        duration: 0.8,
        opacity: 0,
        y: 20,
        ease: "power2.out",
        delay: 0.7
    });
    
    // Animate calendar
    gsap.from(".calendar-container", {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: "power2.out",
        delay: 0.9
    });
    
    // Animate legend
    gsap.from(".calendar-legend", {
        duration: 0.8,
        opacity: 0,
        y: 20,
        ease: "power2.out",
        delay: 1.1
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
            if (tabId === 'list') {
                animateFacilityCards();
            } else if (tabId === 'my-bookings') {
                animateBookingCards();
            } else if (tabId === 'calendar') {
                // Re-animate calendar elements
                gsap.from(".calendar-container", {
                    duration: 0.8,
                    opacity: 0,
                    y: 30,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Animate facility cards
function animateFacilityCards() {
    const facilityCards = document.querySelectorAll('.facility-card');
    
    gsap.fromTo(facilityCards, 
        { opacity: 0, y: 30 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out" 
        }
    );
}

// Animate booking cards
function animateBookingCards() {
    const bookingCards = document.querySelectorAll('.booking-card');
    
    gsap.fromTo(bookingCards, 
        { opacity: 0, x: -30 },
        { 
            opacity: 1, 
            x: 0, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out" 
        }
    );
}

// Initialize booking modal
function initBookingModal() {
    const newBookingBtn = document.getElementById('new-booking-btn');
    const bookNowButtons = document.querySelectorAll('.book-btn');
    const modal = document.getElementById('booking-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const proceedBtn = modal.querySelector('.proceed-btn');
    const facilitySelect = document.getElementById('facility');
    
    // Open modal when New Booking button is clicked
    newBookingBtn.addEventListener('click', function() {
        openModal();
    });
    
    // Open modal when Book Now button is clicked
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const facility = this.getAttribute('data-facility');
            openModal(facility);
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
        // Validate form
        const form = document.getElementById('booking-form');
        if (form.checkValidity()) {
            // Simulate booking processing
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                // Show success message
                const modalBody = modal.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <div class="booking-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Booking Successful!</h3>
                        <p>Your booking has been confirmed.</p>
                        <p>Booking ID: BK${Math.floor(Math.random() * 1000000)}</p>
                        <p>You will receive a confirmation email shortly.</p>
                    </div>
                `;
                
                // Update modal footer
                const modalFooter = modal.querySelector('.modal-footer');
                modalFooter.innerHTML = `
                    <button class="proceed-btn" onclick="window.location.reload()">Done</button>
                `;
                
                // Animate success message
                gsap.from(".booking-success", {
                    duration: 0.8,
                    opacity: 0,
                    scale: 0.8,
                    ease: "back.out(1.7)"
                });
            }, 2000);
        } else {
            // Trigger form validation
            form.reportValidity();
        }
    });
    
    // Update booking fee when facility changes
    facilitySelect.addEventListener('change', updateBookingFee);
    
    // Function to open modal
    function openModal(facility = '') {
        // Reset form
        document.getElementById('booking-form').reset();
        
        // Set facility if provided
        if (facility) {
            facilitySelect.value = facility;
            updateBookingFee();
        }
        
        // Show modal
        modal.classList.add('active');
        
        // Add body class to prevent scrolling
        document.body.classList.add('modal-open');
        
        // Animate modal content
        gsap.fromTo('.modal-content', 
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    }
    
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
    
    // Function to update booking fee
    function updateBookingFee() {
        const facility = facilitySelect.value;
        let fee = 0;
        
        // Set fee based on facility
        switch (facility) {
            case 'clubhouse':
                fee = 1000;
                break;
            case 'gym':
                fee = 100;
                break;
            case 'pool':
                fee = 200;
                break;
            case 'tennis':
                fee = 300;
                break;
            case 'party':
                fee = 2000;
                break;
        }
        
        // Update fee display
        document.getElementById('fee-amount').textContent = `₹${fee}`;
        
        // Animate fee change
        gsap.from("#fee-amount", {
            duration: 0.5,
            scale: 1.2,
            color: "#4a6bff",
            ease: "power2.out"
        });
    }
}

// Initialize date and time pickers
function initDateTimePickers() {
    // Initialize date picker
    flatpickr("#booking-date", {
        dateFormat: "Y-m-d",
        minDate: "today",
        disableMobile: true
    });
    
    // Initialize time pickers
    flatpickr("#start-time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minuteIncrement: 60,
        disableMobile: true
    });
    
    flatpickr("#end-time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minuteIncrement: 60,
        disableMobile: true
    });
}

// Initialize facility filter
function initFacilityFilter() {
    const filterSelect = document.getElementById('facility-filter');
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function() {
        const facility = this.value;
        
        if (facility === 'all') {
            // Show all facilities in list view
            document.querySelectorAll('.facility-card').forEach(card => {
                card.style.display = 'flex';
            });
            
            // Show all columns in calendar view
            document.querySelectorAll('.facility-column').forEach(column => {
                column.style.display = 'flex';
            });
            
            // Show all facility labels
            document.querySelectorAll('.facility-label:not(:first-child)').forEach(label => {
                label.style.display = 'block';
            });
        } else {
            // Filter facilities in list view
            document.querySelectorAll('.facility-card').forEach(card => {
                const facilityBtn = card.querySelector('.book-btn');
                if (facilityBtn.getAttribute('data-facility') === facility) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Filter columns in calendar view
            document.querySelectorAll('.facility-column').forEach(column => {
                if (column.getAttribute('data-facility') === facility) {
                    column.style.display = 'flex';
                } else {
                    column.style.display = 'none';
                }
            });
            
            // Filter facility labels
            document.querySelectorAll('.facility-label:not(:first-child)').forEach((label, index) => {
                const columns = document.querySelectorAll('.facility-column');
                if (columns[index] && columns[index].getAttribute('data-facility') === facility) {
                    label.style.display = 'block';
                } else {
                    label.style.display = 'none';
                }
            });
        }
    });
}

// Initialize calendar interactions
function initCalendarInteractions() {
    // Calendar navigation
    const prevBtn = document.querySelector('.calendar-nav.prev');
    const nextBtn = document.querySelector('.calendar-nav.next');
    const calendarMonth = document.getElementById('calendar-month');
    
    // Current month index (0-11)
    let currentMonth = 3; // April
    let currentYear = 2025;
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Previous month button
    prevBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendarMonth();
        animateCalendarChange('right');
    });
    
    // Next month button
    nextBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendarMonth();
        animateCalendarChange('left');
    });
    
    // Update calendar month display
    function updateCalendarMonth() {
        calendarMonth.textContent = `${months[currentMonth]} ${currentYear}`;
    }
    
    // Animate calendar change
    function animateCalendarChange(direction) {
        const xValue = direction === 'left' ? -50 : 50;
        
        // Animate month text
        gsap.fromTo(calendarMonth, 
            { opacity: 0, x: xValue },
            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        );
        
        // Animate booking slots
        const bookingSlots = document.querySelectorAll('.booking-slot');
        
        gsap.fromTo(bookingSlots, 
            { opacity: 0, scale: 0.9 },
            { 
                opacity: 1, 
                scale: 1, 
                duration: 0.5, 
                stagger: 0.001, 
                ease: "power2.out" 
            }
        );
    }
    
    // Make available slots clickable
    const availableSlots = document.querySelectorAll('.booking-slot.available');
    
    availableSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Get facility and time
            const facilityColumn = this.closest('.facility-column');
            const facility = facilityColumn.getAttribute('data-facility');
            const timeIndex = Array.from(facilityColumn.children).indexOf(this);
            const timeSlot = document.querySelectorAll('.time-slot')[timeIndex].textContent;
            
            // Open booking modal with pre-filled information
            const modal = document.getElementById('booking-modal');
            const facilitySelect = document.getElementById('facility');
            
            // Reset form
            document.getElementById('booking-form').reset();
            
            // Set facility
            facilitySelect.value = facility;
            
            // Set date to today
            const today = new Date();
            const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            document.getElementById('booking-date')._flatpickr.setDate(dateStr);
            
            // Set start time
            document.getElementById('start-time')._flatpickr.setDate(timeSlot);
            
            // Set end time (1 hour later)
            const startHour = parseInt(timeSlot.split(':')[0]);
            const endHour = startHour + 1;
            const endTimeStr = `${endHour}:00`;
            document.getElementById('end-time')._flatpickr.setDate(endTimeStr);
            
            // Update booking fee
            updateBookingFee();
            
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
    
    // Function to update booking fee
    function updateBookingFee() {
        const facility = document.getElementById('facility').value;
        let fee = 0;
        
        // Set fee based on facility
        switch (facility) {
            case 'clubhouse':
                fee = 1000;
                break;
            case 'gym':
                fee = 100;
                break;
            case 'pool':
                fee = 200;
                break;
            case 'tennis':
                fee = 300;
                break;
            case 'party':
                fee = 2000;
                break;
        }
        
        // Update fee display
        document.getElementById('fee-amount').textContent = `₹${fee}`;
    }
    
    // Show booking details on hover
    const bookedSlots = document.querySelectorAll('.booking-slot.booked, .booking-slot.my-booking, .booking-slot.maintenance');
    
    bookedSlots.forEach(slot => {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'booking-tooltip';
        tooltip.textContent = slot.getAttribute('data-booking');
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'rgba(22, 33, 62, 0.9)';
        tooltip.style.color = '#e0e0e0';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.fontSize = '0.85rem';
        tooltip.style.zIndex = '100';
        tooltip.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        tooltip.style.display = 'none';
        
        document.body.appendChild(tooltip);
        
        // Show tooltip on mouseover
        slot.addEventListener('mouseover', function(e) {
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.display = 'block';
            
            // Animate tooltip
            gsap.fromTo(tooltip, 
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        });
        
        // Hide tooltip on mouseout
        slot.addEventListener('mouseout', function() {
            tooltip.style.display = 'none';
        });
    });
}

// Handle view schedule buttons
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function() {
        const facility = this.getAttribute('data-facility');
        
        // Switch to calendar tab
        document.querySelector('.tab-btn[data-tab="calendar"]').click();
        
        // Filter to show only this facility
        document.getElementById('facility-filter').value = facility;
        document.getElementById('facility-filter').dispatchEvent(new Event('change'));
        
        // Scroll to calendar
        document.querySelector('.calendar-container').scrollIntoView({ behavior: 'smooth' });
    });
});

// Handle cancel booking button
document.querySelectorAll('.cancel-btn').forEach(button => {
    if (!button.closest('.modal-actions')) {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
                const bookingCard = this.closest('.booking-card');
                
                // Animate card removal
                gsap.to(bookingCard, {
                    opacity: 0,
                    x: -100,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: function() {
                        bookingCard.style.display = 'none';
                    }
                });
            }
        });
    }
});

// Handle edit booking button
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('Edit booking functionality will be implemented here');
    });
});

// Handle review button
document.querySelectorAll('.review-btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('Review functionality will be implemented here');
    });
});

// Handle book again button
document.querySelectorAll('.book-again-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Get booking details
        const bookingCard = this.closest('.booking-card');
        const facility = bookingCard.querySelector('.booking-facility').textContent.trim().replace('Facility: ', '');
        
        // Open booking modal
        document.getElementById('new-booking-btn').click();
    });
});
