// ============================================
// KATULUNAN FOUNDATION - MAIN JAVASCRIPT
// All mandatory JS features implemented
// ============================================

// ============================================
// 1. MODAL FUNCTIONALITY (Campaign Highlight)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('campaignModal');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const donateBtn = document.getElementById('donateBtn');
    const closeBtn = document.querySelector('.close');

    // Open modal when clicking Learn More or Donate buttons
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    if (donateBtn) {
        donateBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// ============================================
// 2. ACCORDION/TOGGLE FOR SERVICES PAGE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const isActive = this.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
            });
            document.querySelectorAll('.accordion-content').forEach(c => {
                c.classList.remove('active');
            });

            // If clicked item wasn't active, open it
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });
});

// ============================================
// 3. DYNAMIC EVENT RENDERING (Events Page)
// ============================================

// Event data - NOT hardcoded in HTML
const eventsData = [
    {
        id: 1,
        title: "National Blood Donation Drive",
        date: "February 14-15, 2025",
        location: "SM Mall of Asia, Pasay City",
        description: "Join us for our Valentine's themed blood donation drive. Give the gift of life this season of love. Free health screening and snacks for all donors.",
        category: "blood-drive",
        status: "upcoming"
    },
    {
        id: 2,
        title: "Disaster Preparedness Training",
        date: "February 20, 2025",
        location: "Katulunan Foundation HQ, Quezon City",
        description: "Free community training on disaster preparedness, first aid, and emergency response. Open to all residents of Metro Manila.",
        category: "training",
        status: "upcoming"
    },
    {
        id: 3,
        title: "Flood Relief Operation - Bulacan",
        date: "February 8-12, 2025",
        location: "Various barangays in Bulacan",
        description: "Active relief operations providing food packs, clean water, and medical assistance to families affected by recent flooding.",
        category: "relief",
        status: "ongoing"
    },
    {
        id: 4,
        title: "Mobile Health Clinic - Rizal Province",
        date: "February 22, 2025",
        location: "Remote barangays in Rizal",
        description: "Free medical consultations, basic medications, and health screenings for underserved communities in mountainous areas of Rizal.",
        category: "health",
        status: "upcoming"
    },
    {
        id: 5,
        title: "First Aid and CPR Certification",
        date: "February 25-26, 2025",
        location: "Katulunan Training Center, Makati",
        description: "Two-day comprehensive first aid and CPR certification course. Limited slots available. Certificate upon completion.",
        category: "training",
        status: "upcoming"
    },
    {
        id: 6,
        title: "Community Blood Drive - Cebu",
        date: "March 1, 2025",
        location: "Ayala Center Cebu",
        description: "Monthly blood donation event in partnership with Cebu hospitals. Help save lives in the Visayas region.",
        category: "blood-drive",
        status: "upcoming"
    },
    {
        id: 7,
        title: "Typhoon Preparedness Seminar",
        date: "March 5, 2025",
        location: "Coastal barangays, Batangas",
        description: "Community education program on typhoon preparedness, evacuation procedures, and emergency kit preparation for coastal communities.",
        category: "training",
        status: "upcoming"
    },
    {
        id: 8,
        title: "Maternal Health Program",
        date: "March 8, 2025 (International Women's Day)",
        location: "Various community centers, NCR",
        description: "Free prenatal check-ups, nutrition counseling, and health education for expectant mothers in underserved communities.",
        category: "health",
        status: "upcoming"
    },
    {
        id: 9,
        title: "Emergency Relief - Mindanao",
        date: "February 1-7, 2025",
        location: "Davao del Norte",
        description: "Ongoing emergency response providing shelter materials and relief goods to communities affected by recent earthquake.",
        category: "relief",
        status: "ongoing"
    },
    {
        id: 10,
        title: "World Water Day - Clean Water Project",
        date: "March 22, 2025",
        location: "Mountain Province",
        description: "Installation of water filtration systems and hygiene education in remote indigenous communities with limited water access.",
        category: "health",
        status: "upcoming"
    }
];

// Function to render events dynamically
function renderEvents(filter = 'all') {
    const eventsContainer = document.getElementById('eventsContainer');
    const noEventsMessage = document.getElementById('noEventsMessage');
    
    if (!eventsContainer) return;

    // Filter events based on category
    const filteredEvents = filter === 'all' 
        ? eventsData 
        : eventsData.filter(event => event.category === filter);

    // Clear container
    eventsContainer.innerHTML = '';

    // Show/hide no events message
    if (filteredEvents.length === 0) {
        noEventsMessage.style.display = 'block';
        return;
    } else {
        noEventsMessage.style.display = 'none';
    }

    // Create event cards dynamically
    filteredEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.setAttribute('data-category', event.category);

        const badgeClass = `badge-${event.category}`;
        const statusClass = `status-${event.status}`;
        const statusText = event.status === 'ongoing' ? 'ONGOING' : 'UPCOMING';

        eventCard.innerHTML = `
            <div class="event-header">
                <span class="event-badge ${badgeClass}">${event.category.replace('-', ' ').toUpperCase()}</span>
                <div class="event-date">📅 ${event.date}</div>
                <h3>${event.title}</h3>
                <div class="event-location">📍 ${event.location}</div>
            </div>
            <div class="event-body">
                <p>${event.description}</p>
                <div class="event-footer">
                    <span class="event-status ${statusClass}">${statusText}</span>
                    <button class="btn btn-outline btn-small" onclick="window.location.href='volunteer.html'">Join Event</button>
                </div>
            </div>
        `;

        eventsContainer.appendChild(eventCard);
    });
}

// Event filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Render all events on page load
    renderEvents('all');

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value and render events
            const filter = this.getAttribute('data-filter');
            renderEvents(filter);
        });
    });
});

// ============================================
// 4. VOLUNTEER FORM VALIDATION
// ============================================

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    return phoneRegex.test(phone);
}

function validateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1;
    }
    return age;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputElement.classList.add('error');
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        inputElement.classList.remove('error');
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.error');
    
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
    
    inputElements.forEach(el => {
        el.classList.remove('error');
    });
}

// Form submission and validation
document.addEventListener('DOMContentLoaded', function() {
    const volunteerForm = document.getElementById('volunteerForm');
    const clearFormBtn = document.getElementById('clearForm');

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            clearAllErrors();

            let isValid = true;

            // Validate First Name
            const firstName = document.getElementById('firstName').value.trim();
            if (firstName === '') {
                showError('firstName', 'First name is required');
                isValid = false;
            } else if (firstName.length < 2) {
                showError('firstName', 'First name must be at least 2 characters');
                isValid = false;
            }

            // Validate Last Name
            const lastName = document.getElementById('lastName').value.trim();
            if (lastName === '') {
                showError('lastName', 'Last name is required');
                isValid = false;
            } else if (lastName.length < 2) {
                showError('lastName', 'Last name must be at least 2 characters');
                isValid = false;
            }

            // Validate Email
            const email = document.getElementById('email').value.trim();
            if (email === '') {
                showError('email', 'Email address is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate Phone
            const phone = document.getElementById('phone').value.trim();
            if (phone === '') {
                showError('phone', 'Phone number is required');
                isValid = false;
            } else if (!validatePhone(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }

            // Validate Address
            const address = document.getElementById('address').value.trim();
            if (address === '') {
                showError('address', 'Address is required');
                isValid = false;
            } else if (address.length < 10) {
                showError('address', 'Please enter your complete address');
                isValid = false;
            }

            // Validate Birthdate
            const birthdate = document.getElementById('birthdate').value;
            if (birthdate === '') {
                showError('birthdate', 'Date of birth is required');
                isValid = false;
            } else {
                const age = validateAge(birthdate);
                if (age < 18) {
                    showError('birthdate', 'You must be at least 18 years old to volunteer');
                    isValid = false;
                } else if (age > 100) {
                    showError('birthdate', 'Please enter a valid date of birth');
                    isValid = false;
                }
            }

            // Validate Occupation
            const occupation = document.getElementById('occupation').value.trim();
            if (occupation === '') {
                showError('occupation', 'Occupation is required');
                isValid = false;
            }

            // Validate Volunteer Type
            const volunteerType = document.getElementById('volunteerType').value;
            if (volunteerType === '') {
                showError('volunteerType', 'Please select a volunteer type');
                isValid = false;
            }

            // Validate Availability
            const availability = document.getElementById('availability').value;
            if (availability === '') {
                showError('availability', 'Please select your availability');
                isValid = false;
            }

            // Validate Motivation
            const motivation = document.getElementById('motivation').value.trim();
            if (motivation === '') {
                showError('motivation', 'Please tell us why you want to volunteer');
                isValid = false;
            } else if (motivation.length < 20) {
                showError('motivation', 'Please provide a more detailed response (at least 20 characters)');
                isValid = false;
            }

            // Validate Terms and Conditions
            const terms = document.getElementById('terms').checked;
            if (!terms) {
                showError('terms', 'You must agree to the terms and conditions');
                isValid = false;
            }

            // If form is valid, save to LocalStorage and show success
            if (isValid) {
                saveVolunteerData({
                    firstName,
                    lastName,
                    email,
                    phone,
                    address,
                    birthdate,
                    occupation,
                    volunteerType,
                    availability,
                    skills: document.getElementById('skills').value.trim(),
                    motivation,
                    submittedAt: new Date().toISOString()
                });

                // Hide form and show success message
                volunteerForm.style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';

                // Refresh the volunteers list
                displayVolunteers();

                // Scroll to success message
                document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.error-message.show');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Clear form button
        if (clearFormBtn) {
            clearFormBtn.addEventListener('click', function() {
                volunteerForm.reset();
                clearAllErrors();
            });
        }
    }

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            clearAllErrors();

            let isValid = true;

            // Validate contact name
            const contactName = document.getElementById('contactName').value.trim();
            if (contactName === '') {
                showError('contactName', 'Name is required');
                isValid = false;
            }

            // Validate contact email
            const contactEmail = document.getElementById('contactEmail').value.trim();
            if (contactEmail === '') {
                showError('contactEmail', 'Email is required');
                isValid = false;
            } else if (!validateEmail(contactEmail)) {
                showError('contactEmail', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate subject
            const subject = document.getElementById('subject').value;
            if (subject === '') {
                showError('subject', 'Please select a subject');
                isValid = false;
            }

            // Validate message
            const message = document.getElementById('message').value.trim();
            if (message === '') {
                showError('message', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                contactForm.style.display = 'none';
                document.getElementById('contactSuccessMessage').style.display = 'block';

                // Save to sessionStorage
                sessionStorage.setItem('lastContact', JSON.stringify({
                    name: contactName,
                    email: contactEmail,
                    subject: subject,
                    message: message,
                    sentAt: new Date().toISOString()
                }));
            }
        });
    }
});

// ============================================
// 5. LOCALSTORAGE FUNCTIONALITY
// ============================================

// Save volunteer data to LocalStorage
function saveVolunteerData(data) {
    // Get existing volunteers from LocalStorage
    let volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
    
    // Add new volunteer
    volunteers.push(data);
    
    // Keep only last 10 volunteers
    if (volunteers.length > 10) {
        volunteers = volunteers.slice(-10);
    }
    
    // Save back to LocalStorage
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
}

// Display volunteers from LocalStorage
function displayVolunteers() {
    const volunteersList = document.getElementById('volunteersList');
    
    if (!volunteersList) return;

    // Get volunteers from LocalStorage
    const volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];

    if (volunteers.length === 0) {
        volunteersList.innerHTML = '<p style="text-align: center; color: var(--gray);">No volunteer registrations yet.</p>';
        return;
    }

    // Clear container
    volunteersList.innerHTML = '';

    // Display volunteers (most recent first)
    volunteers.reverse().forEach((volunteer, index) => {
        const volunteerItem = document.createElement('div');
        volunteerItem.className = 'volunteer-item';

        const submittedDate = new Date(volunteer.submittedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        volunteerItem.innerHTML = `
            <h4>${volunteer.firstName} ${volunteer.lastName}</h4>
            <p><strong>Volunteer Type:</strong> ${formatVolunteerType(volunteer.volunteerType)}</p>
            <p><strong>Availability:</strong> ${formatAvailability(volunteer.availability)}</p>
            <p><strong>Email:</strong> ${volunteer.email}</p>
            <p><strong>Submitted:</strong> ${submittedDate}</p>
        `;

        volunteersList.appendChild(volunteerItem);
    });
}

// Helper functions for formatting
function formatVolunteerType(type) {
    const types = {
        'blood-donor': 'Blood Donor',
        'disaster-response': 'Disaster Response Volunteer',
        'health-services': 'Health Services Volunteer',
        'administrative': 'Administrative Support',
        'trainer': 'Trainer/Instructor',
        'general': 'General Volunteer'
    };
    return types[type] || type;
}

function formatAvailability(availability) {
    const availabilities = {
        'weekends': 'Weekends Only',
        'weekdays': 'Weekdays Only',
        'flexible': 'Flexible Schedule',
        'events-only': 'Events/Emergency Only'
    };
    return availabilities[availability] || availability;
}

// Load volunteers on page load
document.addEventListener('DOMContentLoaded', function() {
    displayVolunteers();
});

// ============================================
// ADDITIONAL FEATURES
// ============================================

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Console message (Easter egg)
console.log('%cKATULUNGAN Foundation', 'color: #2d7a3e; font-size: 24px; font-weight: bold;');
console.log('%cThank you for visiting our website!', 'color: #4caf50; font-size: 16px;');
console.log('%cWebsite built with ❤️ for humanitarian service', 'color: #757575; font-size: 14px;');

// ============================================
// 6. DONATION PAGE FUNCTIONALITY
// ============================================

// Donation type toggle
document.addEventListener('DOMContentLoaded', function() {
    const typeButtons = document.querySelectorAll('.type-btn');
    const donationTypeInput = document.getElementById('donationType');

    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const type = this.getAttribute('data-type');
            if (donationTypeInput) {
                donationTypeInput.value = type;
            }
            updateDonationSummary();
        });
    });
});

// Amount selection
document.addEventListener('DOMContentLoaded', function() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountContainer = document.getElementById('customAmountContainer');
    const customAmountInput = document.getElementById('customAmount');
    const selectedAmountInput = document.getElementById('selectedAmount');

    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');

            if (this.classList.contains('custom-btn')) {
                customAmountContainer.style.display = 'block';
                if (selectedAmountInput) {
                    selectedAmountInput.value = '';
                }
            } else {
                customAmountContainer.style.display = 'none';
                const amount = this.getAttribute('data-amount');
                if (selectedAmountInput) {
                    selectedAmountInput.value = amount;
                }
            }
            updateDonationSummary();
        });
    });

    // Custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            if (selectedAmountInput) {
                selectedAmountInput.value = this.value;
            }
            updateDonationSummary();
        });
    }
});

// Payment method selection
document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const paymentInstructions = document.getElementById('paymentInstructions');

    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            const selectedMethod = this.value;
            showPaymentInstructions(selectedMethod);
            updateDonationSummary();
        });
    });

    function showPaymentInstructions(method) {
        if (!paymentInstructions) return;

        const instructions = {
            'gcash': `
                <h4>GCash Payment Instructions</h4>
                <p>1. Open your GCash app</p>
                <p>2. Select "Send Money"</p>
                <p>3. Send to: <strong>0917-123-4567</strong> (KATULUNGAN Foundation)</p>
                <p>4. Enter the donation amount</p>
                <p>5. Complete the payment and save the reference number</p>
            `,
            'bank': `
                <h4>Bank Transfer Instructions</h4>
                <p><strong>Bank Name:</strong> BDO Unibank</p>
                <p><strong>Account Name:</strong> KATULUNGAN Foundation Inc.</p>
                <p><strong>Account Number:</strong> 1234-5678-9012</p>
                <p>Please use your name as reference and email the deposit slip to finance@katulungan.org</p>
            `,
            'card': `
                <h4>Credit/Debit Card Payment</h4>
                <p>You will be redirected to our secure payment gateway to complete your donation with your credit or debit card.</p>
                <p>We accept Visa, Mastercard, and JCB cards.</p>
            `,
            'paypal': `
                <h4>PayPal Payment</h4>
                <p>You will be redirected to PayPal to complete your donation securely.</p>
                <p><strong>PayPal Email:</strong> donate@katulungan.org</p>
                <p>Perfect for international donors!</p>
            `
        };

        paymentInstructions.innerHTML = instructions[method] || '';
        paymentInstructions.style.display = 'block';
    }
});

// Dedication field toggle
document.addEventListener('DOMContentLoaded', function() {
    const dedicationType = document.getElementById('dedicationType');
    const dedicationNameContainer = document.getElementById('dedicationNameContainer');

    if (dedicationType) {
        dedicationType.addEventListener('change', function() {
            if (this.value === 'in-honor' || this.value === 'in-memory') {
                dedicationNameContainer.style.display = 'block';
            } else {
                dedicationNameContainer.style.display = 'none';
            }
        });
    }
});

// Update donation summary
function updateDonationSummary() {
    const summaryDiv = document.getElementById('donationSummary');
    if (!summaryDiv) return;

    const amount = document.getElementById('selectedAmount')?.value || '0';
    const type = document.getElementById('donationType')?.value || 'one-time';
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    if (amount && parseInt(amount) > 0) {
        summaryDiv.style.display = 'block';
        
        document.getElementById('summaryAmount').textContent = '₱' + parseInt(amount).toLocaleString();
        document.getElementById('summaryType').textContent = type === 'monthly' ? 'Monthly' : 'One-Time';
        document.getElementById('summaryPayment').textContent = paymentMethod ? 
            paymentMethod.nextElementSibling.querySelector('strong').textContent : '-';
    } else {
        summaryDiv.style.display = 'none';
    }
}

// Donation form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const donationForm = document.getElementById('donationForm');

    if (donationForm) {
        donationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            clearAllErrors();

            let isValid = true;

            // Validate amount
            const amount = parseInt(document.getElementById('selectedAmount').value);
            if (!amount || amount < 100) {
                alert('Please select a donation amount of at least ₱100');
                isValid = false;
                return;
            }

            // Validate first name
            const firstName = document.getElementById('donorFirstName').value.trim();
            if (firstName === '') {
                showError('donorFirstName', 'First name is required');
                isValid = false;
            }

            // Validate last name
            const lastName = document.getElementById('donorLastName').value.trim();
            if (lastName === '') {
                showError('donorLastName', 'Last name is required');
                isValid = false;
            }

            // Validate email
            const email = document.getElementById('donorEmail').value.trim();
            if (email === '') {
                showError('donorEmail', 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('donorEmail', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate phone
            const phone = document.getElementById('donorPhone').value.trim();
            if (phone === '') {
                showError('donorPhone', 'Phone number is required');
                isValid = false;
            } else if (!validatePhone(phone)) {
                showError('donorPhone', 'Please enter a valid phone number');
                isValid = false;
            }

            // Validate payment method
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
            if (!paymentMethod) {
                showError('paymentMethod', 'Please select a payment method');
                isValid = false;
            }

            // Validate terms
            const terms = document.getElementById('donorTerms').checked;
            if (!terms) {
                showError('donorTerms', 'Please accept the terms');
                isValid = false;
            }

            if (isValid) {
                // Save donation to LocalStorage
                const donationType = document.getElementById('donationType').value;
                const dedicationType = document.getElementById('dedicationType').value;
                const dedicationName = document.getElementById('dedicationName').value.trim();

                saveDonation({
                    firstName,
                    lastName,
                    email,
                    phone,
                    amount,
                    donationType,
                    paymentMethod: paymentMethod.value,
                    dedicationType,
                    dedicationName,
                    donatedAt: new Date().toISOString()
                });

                // Hide form and show success
                donationForm.style.display = 'none';
                const successMessage = document.getElementById('donationSuccessMessage');
                successMessage.style.display = 'block';

                // Update success message
                const typeText = donationType === 'monthly' ? 'monthly donation of' : 'donation of';
                document.getElementById('successDonationAmount').textContent = 
                    `Your ${typeText} ₱${amount.toLocaleString()} has been received!`;
                document.getElementById('successEmail').textContent = email;

                // Refresh donations list
                displayDonations();

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            } else {
                const firstError = document.querySelector('.error-message.show');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
});

// Save donation to LocalStorage
function saveDonation(data) {
    let donations = JSON.parse(localStorage.getItem('donations')) || [];
    donations.push(data);
    
    // Keep only last 20 donations
    if (donations.length > 20) {
        donations = donations.slice(-20);
    }
    
    localStorage.setItem('donations', JSON.stringify(donations));
}

// Display donations from LocalStorage
function displayDonations() {
    const donationsList = document.getElementById('donationsList');
    
    if (!donationsList) return;

    const donations = JSON.parse(localStorage.getItem('donations')) || [];

    if (donations.length === 0) {
        donationsList.innerHTML = '<p style="text-align: center; color: var(--gray);">No donations yet. Be the first to donate!</p>';
        return;
    }

    donationsList.innerHTML = '';

    // Display donations (most recent first)
    donations.reverse().slice(0, 10).forEach(donation => {
        const donationItem = document.createElement('div');
        donationItem.className = 'donation-item';

        const donatedDate = new Date(donation.donatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const typeText = donation.donationType === 'monthly' ? 'Monthly Donation' : 'One-Time Donation';
        
        let dedicationText = '';
        if (donation.dedicationType === 'in-honor') {
            dedicationText = `<p><em>In honor of ${donation.dedicationName}</em></p>`;
        } else if (donation.dedicationType === 'in-memory') {
            dedicationText = `<p><em>In memory of ${donation.dedicationName}</em></p>`;
        }

        donationItem.innerHTML = `
            <h4>${donation.firstName} ${donation.lastName.charAt(0)}.</h4>
            <p class="donation-amount">₱${parseInt(donation.amount).toLocaleString()}</p>
            <p><strong>${typeText}</strong></p>
            ${dedicationText}
            <p>Donated: ${donatedDate}</p>
        `;

        donationsList.appendChild(donationItem);
    });
}

// Load donations on page load
document.addEventListener('DOMContentLoaded', function() {
    displayDonations();
});