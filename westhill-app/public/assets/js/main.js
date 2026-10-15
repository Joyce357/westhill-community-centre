// Real West Hill Programs Data
const LOCAL_PROGRAMS_DATA = [
  {
    "id": "seniors-support",
    "title": "West Hill Seniors Program",
    "category": "Support Services",
    "description": "Weekly community program for older adults featuring chair exercise, digital skills, Housing Tuesday, health talks, wellness, safety, and social connection.",
    "icon": "fas fa-heartbeat",
    "image": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
    "link": "programs.html?id=seniors-support"
  },
  {
    "id": "youth-leadership",
    "title": "Youth Development & Leadership",
    "category": "Youth Services",
    "description": "Empowering young leaders with formal leadership workshops, community service opportunities, and peer tutoring roles.",
    "icon": "fas fa-graduation-cap",
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    "link": "programs.html?id=youth-leadership"
  },
  {
    "id": "women-family",
    "title": "Women’s Wellness Program",
    "category": "Family Services",
    "description": "A welcoming community program focused on wellness, health education, and social connection for women.",
    "icon": "fas fa-child",
    "image": "images/family_support.png",
    "link": "programs.html?id=women-family"
  },
  {
    "id": "disability-services",
    "title": "Disability Support Services",
    "category": "Support Services",
    "description": "Customized, inclusive life-skill sessions and social recreation designed to empower individuals with special needs.",
    "icon": "fas fa-wheelchair",
    "image": "images/disability_support.png",
    "link": "programs.html?id=disability-services"
  },
  {
    "id": "benefits-support",
    "title": "Benefits Support",
    "category": "Support Services",
    "description": "Assisting residents with navigating government benefits applications, taxation queries, child benefits, and pensions.",
    "icon": "fas fa-file-invoice-dollar",
    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    "link": "programs.html?id=benefits-support"
  },
  {
    "id": "housing-support",
    "title": "Housing Referrals & Support",
    "category": "Support Services",
    "description": "Guiding families in housing crises with emergency shelter referrals, landlord dispute info, and social housing forms.",
    "icon": "fas fa-home",
    "image": "images/housing_support.png",
    "link": "programs.html?id=housing-support"
  },
  {
    "id": "employment-resume",
    "title": "Employment & Resume Support",
    "category": "Career Services",
    "description": "One-on-one employment counselling, resume writing clinics, cover letter reviews, and mock interview practice.",
    "icon": "fas fa-briefcase",
    "image": "images/employment_support.png",
    "link": "programs.html?id=employment-resume"
  },
  {
    "id": "community-engagement",
    "title": "Community Engagement",
    "category": "Advocacy",
    "description": "Organizing clean-up days, Scarborough block parties, community asset mapping, and positive civic participation projects.",
    "icon": "fas fa-bullhorn",
    "image": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
    "link": "programs.html?id=community-engagement"
  },
  {
    "id": "community-advocacy",
    "title": "Community Advocacy",
    "category": "Advocacy",
    "description": "Empowering Scarborough residents to advocate for transit equity, tenant rights, local jobs, and neighborhood resources.",
    "icon": "fas fa-users",
    "image": "images/community_advocacy.png",
    "link": "programs.html?id=community-advocacy"
  }
];

const LOCAL_EVENTS_DATA = [
  {
    "id": "westhill-day",
    "title": "West Hill Day: Celebrating Community Together",
    "day": "20",
    "month": "JUN",
    "date": "2026-06-20",
    "time": "11:00 AM - 5:00 PM",
    "location": "Morningside Park",
    "category": "Community Events",
    "description": "Our signature annual celebration featuring local vendor booths, children's zone, cultural dances, live music, and local support services.",
    "image": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": "job-fair",
    "title": "Community Job Fair & Networking",
    "day": "22",
    "month": "JUN",
    "date": "2026-06-22",
    "time": "10:00 AM - 3:00 PM",
    "location": "Main Gymnasium",
    "category": "Career Services",
    "description": "Meet hiring managers from local Scarborough businesses in hospitality, customer support, warehousing, and retail sectors.",
    "image": "https://images.unsplash.com/photo-1521791136368-1a8df3d95b35?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": "youth-leadership",
    "title": "Youth Development & Leadership Workshop",
    "day": "12",
    "month": "JUN",
    "date": "2026-06-12",
    "time": "4:00 PM - 6:00 PM",
    "location": "Community Activity Room",
    "category": "Youth Services",
    "description": "Interactive session focusing on communication skills, community project planning, and collaborative teamwork for youth.",
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": "community-bbq",
    "title": "Welcome Neighborhood Summer BBQ",
    "day": "15",
    "month": "JUN",
    "date": "2026-06-15",
    "time": "12:00 PM - 4:00 PM",
    "location": "Central Courtyard",
    "category": "Community Events",
    "description": "Meet your neighbors and learn about our upcoming summer programs. Free burgers, halal options, and games for kids.",
    "image": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": "volunteer-orientation",
    "title": "Volunteer Orientation & Information Session",
    "day": "08",
    "month": "JUN",
    "date": "2026-06-08",
    "time": "6:00 PM - 7:30 PM",
    "location": "Community Room B",
    "category": "Meetings",
    "description": "Find out how you can support our upcoming programs and events. Learn about open roles, safety checks, and guidelines.",
    "image": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=600"
  }
];

const DONATION_IMPACTS = {
  25: "Provides bus tokens and study snack packs for youth attending youth development programs.",
  50: "Funds a hot, nutritious lunch and social outing for seniors at our center.",
  100: "Provides a private housing counseling session for a family facing emergency relocation.",
  250: "Funds a complete 4-week employment workshop series for a neighborhood resident."
};

let activeCategory = 'All';
let eventsData = [];

document.addEventListener('DOMContentLoaded', () => {
    // 1. STICKY HEADER & NAV CONTROLS
    initStickyHeader();

    // 2. MOBILE NAVIGATION TOGGLE
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            mobileToggle.setAttribute('aria-expanded', isOpen);
            
            // Close all dropdowns inside the nav menu when closing the menu drawer
            if (!isOpen) {
                const openDropdowns = navMenu.querySelectorAll('.dropdown-menu.open');
                openDropdowns.forEach(d => d.classList.remove('open'));
                const activeToggles = navMenu.querySelectorAll('.dropdown-toggle.active-toggle');
                activeToggles.forEach(t => {
                    t.classList.remove('active-toggle');
                    t.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    // 2.5 MOBILE ACCORDION DROPDOWN TOGGLES
    const dropdownToggles = document.querySelectorAll('.nav-menu .dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Only toggle accordion behavior if mobile view is active (hamburger toggle visible)
            if (mobileToggle && getComputedStyle(mobileToggle).display !== 'none') {
                e.preventDefault();
                const parentLi = toggle.closest('.dropdown');
                const dropdownMenu = parentLi ? parentLi.querySelector('.dropdown-menu') : null;
                
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('open');
                    const isSubOpen = dropdownMenu.classList.contains('open');
                    toggle.classList.toggle('active-toggle', isSubOpen);
                    toggle.setAttribute('aria-expanded', isSubOpen ? 'true' : 'false');
                }
            }
        });
    });

    // 3. RENDER COMPONENT LISTS
    initPrograms();
    initEvents();

    // 4. SCROLL REVEAL EFFECTS
    initScrollReveal();

    // 5. TESTIMONIAL CAROUSEL SLIDER
    initHopeSlider();

    // 6. DONATION CALCULATOR LOGIC
    initDonationCalculator();

    // 7. MODALS
    initModal();

    // 7.5. COUNTDOWN TIMER
    initOpeningCountdown();

    // 8. INTERACTIVE SUBMISSION HANDLERS
    initNewsletterForm();
    initFlyerDownloadTriggers();
    initVolunteerFormTrigger();
    initWestHillDayTriggers();
});

/* ==========================================================================
   STICKY HEADER SCROLL EFFECT
   ========================================================================== */

function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

/* ==========================================================================
   PROGRAMS RENDER & FILTER
   ========================================================================== */

function initPrograms() {
    const grid = document.getElementById('dynamic-programs-grid');
    if (!grid) return;

    renderProgramsList(LOCAL_PROGRAMS_DATA);

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-filter');
            
            const filtered = activeCategory === 'All' 
                ? LOCAL_PROGRAMS_DATA 
                : LOCAL_PROGRAMS_DATA.filter(p => p.category === activeCategory);
                
            renderProgramsList(filtered);
        });
    });
}

function renderProgramsList(programs) {
    const grid = document.getElementById('dynamic-programs-grid');
    if (!grid) return;
    grid.innerHTML = '';

    programs.forEach(program => {
        const card = document.createElement('article');
        card.className = 'program-card wh-reveal active';
        card.innerHTML = `
            <div class="program-img-wrapper">
                <span class="program-category">${program.category}</span>
                <img src="${program.image}" alt="${program.title} - West Hill" loading="lazy">
            </div>
            <div class="program-card-body">
                <div class="program-card-icon"><i class="${program.icon}"></i></div>
                <h3>${program.title}</h3>
                <p>${program.description}</p>
                <a href="${program.link}" class="program-card-link">Learn More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ==========================================================================
   UPCOMING EVENTS GRID & CALENDAR
   ========================================================================== */

async function initEvents() {
    try {
        const response = await fetch('assets/data/events.json');
        if (!response.ok) throw new Error();
        eventsData = await response.json();
    } catch {
        eventsData = LOCAL_EVENTS_DATA;
    }

    // 1. Render the main events section grid
    renderEventsGrid();

    // 2. Render the interactive calendar widget
    renderCalendar(6, 2026);
    
    // Auto preview first event on June 15
    showEventInSidebar("2026-06-15");
}

function renderEventsGrid() {
    const grid = document.getElementById('upcoming-events-cards-grid');
    if (!grid) return;
    grid.innerHTML = '';

    eventsData.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-pro-card wh-reveal active';
        card.innerHTML = `
            <div class="event-pro-img">
                <span class="event-pro-badge">${event.day} <span>${event.month}</span></span>
                <img src="${event.image}" alt="${event.title}" loading="lazy">
            </div>
            <div class="event-pro-body">
                <h3>${event.title}</h3>
                <div class="event-pro-meta">
                    <span><i class="fas fa-clock"></i> ${event.time}</span><br>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                </div>
                <p>${event.description}</p>
                <button class="btn btn-secondary" style="padding: 10px 22px; font-size: 0.85rem;" onclick="openDetailsModal('${event.id}')">View Details</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderCalendar(month, year) {
    const calendarGrid = document.getElementById('calendar-days-grid');
    const title = document.getElementById('calendar-month-name');
    if (!calendarGrid || !title) return;

    calendarGrid.innerHTML = '';
    title.innerText = `June 2026`;

    const firstDayIndex = 1;
    const totalDays = 30;

    for (let i = 0; i < firstDayIndex; i++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day empty';
        calendarGrid.appendChild(cell);
    }

    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.innerText = day;

        const dateStr = `2026-06-${day.toString().padStart(2, '0')}`;
        cell.setAttribute('data-date', dateStr);

        const hasEvent = eventsData.some(e => e.date === dateStr);
        if (hasEvent) {
            cell.classList.add('has-event');
        }

        cell.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('active-day'));
            cell.classList.add('active-day');
            showEventInSidebar(dateStr);
        });

        if (day === 15) {
            cell.classList.add('active-day');
        }

        calendarGrid.appendChild(cell);
    }
}

function showEventInSidebar(dateStr) {
    const sidebar = document.getElementById('calendar-sidebar-preview');
    if (!sidebar) return;

    const matchedEvents = eventsData.filter(e => e.date === dateStr);
    
    if (matchedEvents.length === 0) {
        const parts = dateStr.split('-');
        sidebar.innerHTML = `
            <h3>Events on June ${parseInt(parts[2])}</h3>
            <p style="color: var(--wh-text-muted); font-size: 0.95rem;">No community events scheduled for this date.</p>
        `;
        return;
    }

    const parts = dateStr.split('-');
    sidebar.innerHTML = `<h3>Events on June ${parseInt(parts[2])}</h3>`;

    matchedEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = `preview-event-card`;
        card.innerHTML = `
            <h4>${event.title}</h4>
            <p class="preview-event-meta" style="font-size: 0.8rem; color: var(--wh-text-muted); margin-bottom: 8px;">
                <span>🕒 ${event.time}</span> | 
                <span>📍 ${event.location}</span>
            </p>
            <p style="font-size: 0.88rem; color: var(--wh-text-body); margin-bottom: 12px;">${event.description}</p>
            <button class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.78rem;" onclick="openDetailsModal('${event.id}')">View Details</button>
        `;
        sidebar.appendChild(card);
    });
}

/* ==========================================================================
   STORIES OF HOPE CAROUSEL
   ========================================================================== */

function initHopeSlider() {
    const track = document.querySelector('.hope-track');
    const slides = document.querySelectorAll('.hope-slide');
    const dotsContainer = document.querySelector('.hope-dots');
    if (!track || slides.length === 0 || !dotsContainer) return;

    let currentIndex = 0;
    
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `hope-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
        dot.addEventListener('click', () => {
            goToSlide(idx);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.hope-dot');

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }, 6000);
}

/* ==========================================================================
   DONATION CALCULATOR
   ========================================================================== */

function initDonationCalculator() {
    const btns = document.querySelectorAll('.calc-btn');
    const input = document.getElementById('custom-donation-amount');
    const preview = document.getElementById('calc-impact-text');
    if (!preview) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (input) input.value = '';

            const amt = btn.getAttribute('data-value');
            preview.innerText = DONATION_IMPACTS[amt];
        });
    });

    if (input) {
        input.addEventListener('input', () => {
            btns.forEach(b => b.classList.remove('active'));
            const val = parseFloat(input.value);

            if (isNaN(val) || val <= 0) {
                preview.innerText = "Select or enter an amount to see the impact of your support.";
            } else if (val < 25) {
                preview.innerText = "Helps support essential administrative needs and volunteer supply kits.";
            } else if (val >= 25 && val < 50) {
                preview.innerText = DONATION_IMPACTS[25];
            } else if (val >= 50 && val < 100) {
                preview.innerText = DONATION_IMPACTS[50];
            } else if (val >= 100 && val < 250) {
                preview.innerText = DONATION_IMPACTS[100];
            } else {
                preview.innerText = DONATION_IMPACTS[250];
            }
        });
    }
}

/* ==========================================================================
   MODAL MANAGER
   ========================================================================== */

function initModal() {
    const closeBtn = document.querySelector('.modal-close');
    const modal = document.getElementById('details-modal');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    }
}

window.openDetailsModal = function(id) {
    const modal = document.getElementById('details-modal');
    const mTitle = document.getElementById('modal-title-elt');
    const mBody = document.getElementById('modal-body-elt');
    if (!modal || !mTitle || !mBody) return;

    const matched = eventsData.find(e => e.id === id);
    if (!matched) return;

    mTitle.innerText = matched.title;
    mBody.innerHTML = `
        <p><strong>📅 Date:</strong> June ${matched.day}, 2026</p>
        <p><strong>🕒 Time:</strong> ${matched.time}</p>
        <p><strong>📍 Location:</strong> ${matched.location}</p>
        <p><strong>📂 Category:</strong> ${matched.category}</p>
        <p style="margin-top: 15px; border-top: 1px solid var(--wh-bg-alt); padding-top: 15px;">${matched.description}</p>
        <div style="margin-top: 30px; display: flex; gap: 15px;">
            <button class="btn btn-secondary" onclick="triggerRegistrationAlert('${matched.title}')">Register Free RSVP</button>
            <button class="btn btn-blue" onclick="document.getElementById('details-modal').classList.remove('open')">Close</button>
        </div>
    `;
    modal.classList.add('open');
};

window.triggerRegistrationAlert = function(eventTitle) {
    alert(`Thank you! Your registration request for "${eventTitle}" has been received. An email confirmation has been sent!`);
    document.getElementById('details-modal').classList.remove('open');
};

/* ==========================================================================
   SCROLL REVEALS
   ========================================================================== */

function initScrollReveal() {
    const reveals = document.querySelectorAll('.wh-reveal');
    if (reveals.length === 0) return;
    
    if (!('IntersectionObserver' in window)) {
        reveals.forEach(el => el.style.opacity = '1');
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
        .wh-reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .wh-reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);

    setTimeout(() => {
        const allReveals = document.querySelectorAll('.wh-reveal');
        allReveals.forEach(el => revealObserver.observe(el));
    }, 500);
}

/* ==========================================================================
   FORM HANDLING & ACTION ALERTS
   ========================================================================== */

function initNewsletterForm() {
    const form = document.getElementById('newsletter-form-elt');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const val = input ? input.value.trim() : '';

        if (val) {
            const container = form.parentElement;
            form.style.display = 'none';
            const msg = document.createElement('p');
            msg.style.color = 'var(--wh-green-light)';
            msg.style.fontWeight = '600';
            msg.innerHTML = '<i class="fas fa-check-circle"></i> Subscribed successfully! Thank you for staying connected.';
            container.appendChild(msg);
        }
    });
}

function initFlyerDownloadTriggers() {
    const flyerBtns = document.querySelectorAll('.flyer-btn');
    flyerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.closest('.flyer-card').querySelector('h3').innerText;
            alert(`Your download for "${title}" has started! Check your browser's download folder.`);
        });
    });
}

function initVolunteerFormTrigger() {
    const volBtns = document.querySelectorAll('.vol-opp-btn');
    volBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const position = btn.closest('.vol-opp-card').querySelector('h3').innerText;
            alert(`Thank you for your interest in the "${position}" role! Redirecting you to the registration portal...`);
            window.location.href = 'volunteer.html';
        });
    });
}

function initWestHillDayTriggers() {
    const vendorBtn = document.getElementById('vendor-btn');
    const sponsorBtn = document.getElementById('sponsor-btn');
    
    if (vendorBtn) {
        vendorBtn.addEventListener('click', () => {
            alert("Thank you! Opening the West Hill Day 2026 Vendor Application Form...");
        });
    }
    if (sponsorBtn) {
        sponsorBtn.addEventListener('click', () => {
            alert("Thank you! Opening the West Hill Day 2026 Corporate Sponsorship Pack...");
        });
    }
}

/* ==========================================================================
   OPENING CEREMONY COUNTDOWN TIMER
   ========================================================================== */
function initOpeningCountdown() {
    const countdownElt = document.getElementById('opening-countdown-elt');
    if (!countdownElt) return;

    // Target: June 9, 2026 at 10:00 AM EST (simulated local date is June 8)
    const targetDate = new Date('2026-06-09T10:00:00-04:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownElt.innerHTML = `<h4>Welcome!</h4><p style="color: var(--wh-orange-accent); font-weight:600; margin-top: 15px;">The West Hill Community Centre is now officially open!</p>`;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const dElt = document.getElementById('countdown-days');
        const hElt = document.getElementById('countdown-hours');
        const mElt = document.getElementById('countdown-mins');

        if (dElt) dElt.innerText = days.toString().padStart(2, '0');
        if (hElt) hElt.innerText = hours.toString().padStart(2, '0');
        if (mElt) mElt.innerText = mins.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}
