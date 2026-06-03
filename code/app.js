document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Theme Toggle
    const topbarBtns = document.querySelectorAll('.topbar-actions button');
    let themeBtn = null;
    let profileBtnNode = null;
    
    // Find the buttons by index
    if (topbarBtns.length >= 2) {
        themeBtn = topbarBtns[0];
        profileBtnNode = topbarBtns[1];
    } else if (topbarBtns.length === 1) {
        themeBtn = topbarBtns[0];
    }

    if (themeBtn) {
        // Load preference from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
        } else if (savedTheme === 'light') {
            document.body.classList.remove('dark');
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            
            if (isDark) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 2. Profile Navigation
    if (profileBtnNode) {
        profileBtnNode.addEventListener('click', () => {
            window.location.href = 'Profile.html';
        });
    }

    // 3. Highlight Active Sidebar Link
    const currentPath = window.location.pathname.split('/').pop() || 'Dashboard.html';
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-item');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Decode URI component in case of encoded spaces in local file paths
        if (href === decodeURIComponent(currentPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Incidents Page Specific Logic ---
    const pathName = window.location.pathname.split('/').pop() || '';
    if (pathName.includes('Incidents.html') || pathName === 'Incidents.html') {
        
        // 1. Modals
        const categoryTags = document.querySelectorAll('.metadata-card:nth-child(1) .ml-auto');
        const mitreTags = document.querySelectorAll('.metadata-card:nth-child(2) .ml-auto');
        
        const categoryModal = document.getElementById('category-modal');
        const mitreModal = document.getElementById('mitre-modal');
        const closeModals = document.querySelectorAll('.close-modal-btn');
        
        if (categoryTags.length && categoryModal) {
            categoryTags[0].style.cursor = 'pointer';
            categoryTags[0].addEventListener('click', () => categoryModal.classList.add('active'));
        }
        if (mitreTags.length && mitreModal) {
            mitreTags[0].style.cursor = 'pointer';
            mitreTags[0].addEventListener('click', () => mitreModal.classList.add('active'));
        }
        
        closeModals.forEach(btn => btn.addEventListener('click', (e) => {
            e.target.closest('.modal-overlay').classList.remove('active');
        }));
        
        // 2. Suggestion/Prediction Panels
        const segmentedBtns = document.querySelectorAll('.segmented-control-large .segment-btn');
        const suggestionPanel = document.getElementById('suggestion-panel');
        const predictionPanel = document.getElementById('prediction-panel');
        const closePanelBtns = document.querySelectorAll('.close-panel-btn');
        
        segmentedBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // remove active from both
                segmentedBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // toggle panels
                if (btn.innerText.trim() === 'Suggestion') {
                    suggestionPanel.classList.add('active');
                    predictionPanel.classList.remove('active');
                } else if (btn.innerText.trim() === 'Prediction') {
                    predictionPanel.classList.add('active');
                    suggestionPanel.classList.remove('active');
                }
            });
        });
        
        closePanelBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.target.closest('.side-panel-card').classList.remove('active');
            segmentedBtns.forEach(b => b.classList.remove('active'));
        }));
        
        // 3. Timeline vs Grid View Toggle
        const viewToggleBtns = document.querySelectorAll('.view-toggles .view-toggle-btn');
        const stagesGrid = document.querySelector('.stages-grid');
        const timelineView = document.getElementById('retrospection-timeline');
        
        if (viewToggleBtns.length >= 2 && stagesGrid && timelineView) {
            viewToggleBtns[0].addEventListener('click', () => { // Grid
                viewToggleBtns[0].classList.add('active');
                viewToggleBtns[1].classList.remove('active');
                stagesGrid.style.display = ''; // revert to default css grid
                timelineView.classList.remove('active');
            });
            viewToggleBtns[1].addEventListener('click', () => { // Chart
                viewToggleBtns[1].classList.add('active');
                viewToggleBtns[0].classList.remove('active');
                stagesGrid.style.display = 'none';
                timelineView.classList.add('active');
            });
        }
        
        // 4. Retrospection Detail Drawer
        const stageCards = document.querySelectorAll('.stage-card');
        const sideDrawerOverlay = document.getElementById('retrospection-drawer-overlay');
        const sideDrawer = document.getElementById('retrospection-drawer');
        const closeDrawerBtn = document.querySelector('.close-drawer-btn');
        
        stageCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                sideDrawerOverlay.classList.add('active');
                sideDrawer.classList.add('active');
            });
        });
        
        if (closeDrawerBtn && sideDrawerOverlay && sideDrawer) {
            closeDrawerBtn.addEventListener('click', () => {
                sideDrawerOverlay.classList.remove('active');
                sideDrawer.classList.remove('active');
            });
            sideDrawerOverlay.addEventListener('click', () => {
                sideDrawerOverlay.classList.remove('active');
                sideDrawer.classList.remove('active');
            });
        }
        
        // 5. Navigate to Offenses from Incident History
        const historyCards = document.querySelectorAll('.history-card');
        historyCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.location.href = 'Offenses.html';
            });
        });
    }

    // --- Offenses Page Specific Logic ---
    if (pathName.includes('Offenses.html') || pathName === 'Offenses.html') {
        // 1. Offense Tabs Toggle
        const tabBtns = document.querySelectorAll('.offense-tab-btn');
        const tabContents = document.querySelectorAll('.offense-tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding content
                const targetId = btn.getAttribute('data-tab') + '-tab';
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // 2. Events Grid/List Toggle
        const viewToggleBtns = document.querySelectorAll('#events-tab .view-toggle-btn');
        const gridView = document.querySelector('.events-grid-view');
        const listView = document.querySelector('.events-list-view');

        viewToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const viewType = btn.getAttribute('data-view');
                
                // Update active state on buttons
                viewToggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Toggle views
                if (viewType === 'grid') {
                    gridView.classList.add('active');
                    listView.classList.remove('active');
                } else if (viewType === 'list') {
                    listView.classList.add('active');
                    gridView.classList.remove('active');
                }
            });
        });

        // 3. Events Details Drawer
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
        const eventsDrawerOverlay = document.getElementById('events-drawer-overlay');
        const eventsDrawer = document.getElementById('events-drawer');
        const closeEventsDrawerBtn = document.querySelector('#events-drawer .close-drawer-btn');

        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                eventsDrawerOverlay.classList.add('active');
                eventsDrawer.classList.add('active');
            });
        });

        if (closeEventsDrawerBtn && eventsDrawerOverlay && eventsDrawer) {
            closeEventsDrawerBtn.addEventListener('click', () => {
                eventsDrawerOverlay.classList.remove('active');
                eventsDrawer.classList.remove('active');
            });
            eventsDrawerOverlay.addEventListener('click', () => {
                eventsDrawerOverlay.classList.remove('active');
                eventsDrawer.classList.remove('active');
            });
        }
    }

    // --- Custom Dropdown Logic ---
    const customDropdowns = document.querySelectorAll('.custom-dropdown');
    
    customDropdowns.forEach(dropdown => {
        const selectedText = dropdown.querySelector('.dropdown-selected');
        const options = dropdown.querySelectorAll('.dropdown-option');
        
        dropdown.addEventListener('click', (e) => {
            // Close other dropdowns
            customDropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });
            dropdown.classList.toggle('active');
        });
        
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent dropdown from closing twice
                if (selectedText) {
                    selectedText.innerText = option.innerText;
                }
                dropdown.classList.remove('active');
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-dropdown')) {
            customDropdowns.forEach(d => d.classList.remove('active'));
        }
    });
});
