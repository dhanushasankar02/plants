/**
 * Greenery Shared Navigation & Layout Controller
 * Handles:
 *  - Sticky header scrolling state
 *  - Dark/Light mode theme switching with localStorage persistence
 *  - RTL/LTR direction layout switching with localStorage persistence
 *  - Mobile navigation drawer open/close & accordion menu
 *  - Wishlist and Cart badge counts updates
 *  - Active navigation links highlighting
 */

// Immediate Theme and RTL layout sync to prevent page flash before DOM is ready
(function() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  const savedRtl = localStorage.getItem('rtl') === 'true';
  document.documentElement.setAttribute('dir', savedRtl ? 'rtl' : 'ltr');
})();

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const header = document.getElementById('appHeader');
  
  // Desktop Toggles
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const rtlToggle = document.getElementById('rtlToggle') || document.getElementById('rtlToggleBtn');
  
  // Mobile Drawer Toggles
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const mobileThemeIcon = document.getElementById('mobileThemeIcon');
  const mobileRtlToggle = document.getElementById('mobileRtlToggle') || document.getElementById('mobileRtlToggleBtn');
  
  
  // Drawer Elements
  const hamburgerToggle = document.getElementById('hamburgerToggle');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDropdownBtn = document.getElementById('mobileDropdownBtn');
  const mobileDropdownMenu = document.getElementById('mobileDropdownMenu');

  // --- Sticky Header Scroll Handling ---
  let ticking = false;
  function updateHeaderState() {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeaderState();
      });
      ticking = true;
    }
  }, { passive: true });
  
  // Initial run
  updateHeaderState();

  // --- Dark/Light Theme Handler ---
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Sync desktop toggle class & icon
    if (themeToggle) {
      if (theme === 'dark') themeToggle.classList.add('active');
      else themeToggle.classList.remove('active');
    }
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    // Sync mobile toggle class & icon
    if (mobileThemeToggle) {
      if (theme === 'dark') mobileThemeToggle.classList.add('active');
      else mobileThemeToggle.classList.remove('active');
    }
    if (mobileThemeIcon) {
      mobileThemeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  function toggleTheme() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // Bind Theme Listeners
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
  
  // Initial UI sync for theme
  setTheme(getTheme());

  // --- RTL/LTR Layout Handler ---
  function getRtl() {
    return document.documentElement.getAttribute('dir') === 'rtl';
  }

  function setRtl(isRtl) {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    localStorage.setItem('rtl', isRtl);
    
    // Sync desktop RTL toggle class
    if (rtlToggle) {
      if (isRtl) rtlToggle.classList.add('active');
      else rtlToggle.classList.remove('active');
    }

    // Sync mobile RTL toggle class
    if (mobileRtlToggle) {
      if (isRtl) mobileRtlToggle.classList.add('active');
      else mobileRtlToggle.classList.remove('active');
    }


  }

  function toggleRtl() {
    setRtl(!getRtl());
  }

  // Bind RTL Listeners
  if (rtlToggle) rtlToggle.addEventListener('click', toggleRtl);
  if (mobileRtlToggle) mobileRtlToggle.addEventListener('click', toggleRtl);
  
  // Initial UI sync for RTL
  setRtl(getRtl());

  // --- Mobile Drawer Open/Close Handler ---
  function openMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('active');
  }

  function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
  }

  if (hamburgerToggle) hamburgerToggle.addEventListener('click', openMobileDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeMobileDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileDrawer);

  // Mobile drawer links auto-close drawer on click (helpful for same-page anchors)
  const drawerLinks = document.querySelectorAll('.mobile-nav-list a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Don't close if it is the dropdown button itself
      if (link.id === 'mobileDropdownBtn' || link.closest('#mobileDropdownBtn')) return;
      closeMobileDrawer();
    });
  });

  // Mobile Accordion Dropdown Menu (Home submenu)
  if (mobileDropdownBtn && mobileDropdownMenu) {
    mobileDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const arrow = mobileDropdownBtn.querySelector('.mobile-dropdown-btn');
      if (arrow) arrow.classList.toggle('active');
      mobileDropdownMenu.classList.toggle('open');
    });
  }

  // --- Wishlist and Cart Badge Sync ---
  function updateWishlistBadges() {
    const wishlistBadge = document.getElementById('wishlistBadge');
    const mobileWishlistBadge = document.getElementById('mobileWishlistBadge');
    
    const stored = localStorage.getItem('greenery_wishlist');
    const wishlistArr = stored ? JSON.parse(stored) : [];
    const count = wishlistArr.length;
    
    if (wishlistBadge) {
      wishlistBadge.textContent = count;
      wishlistBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
    if (mobileWishlistBadge) {
      mobileWishlistBadge.textContent = count;
      mobileWishlistBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  }

  function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    const count = parseInt(localStorage.getItem('greenery_cart_count') || '0');
    
    if (cartBadge) {
      cartBadge.textContent = count;
      cartBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  }

  // Run immediately on page load
  updateWishlistBadges();
  updateCartBadge();

  // Expose updating functions globally so page-specific code can trigger updates
  window.updateWishlistBadges = updateWishlistBadges;
  window.updateCartBadge = updateCartBadge;

  // Listen for storage changes in other windows/tabs to auto-sync badges
  window.addEventListener('storage', (e) => {
    if (e.key === 'greenery_wishlist') {
      updateWishlistBadges();
      if (typeof syncWishlistIcons === 'function') {
        syncWishlistIcons();
      }
    }
    if (e.key === 'greenery_cart_count') {
      updateCartBadge();
    }
  });

  // --- Active Navigation Link Highlighting ---
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  // Desktop active links highlighting
  const desktopLinks = document.querySelectorAll('.nav-menu .nav-link, .nav-menu .dropdown-link');
  let desktopActiveFound = false;

  desktopLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName) {
      link.classList.add('active');
      desktopActiveFound = true;
      
      // If it's a dropdown child link, activate parent "Home" nav link
      if (link.classList.contains('dropdown-link')) {
        const parentHome = link.closest('.nav-item').querySelector('.nav-link');
        if (parentHome) parentHome.classList.add('active');
      }
    } else {
      link.classList.remove('active');
    }
  });

  // If no match found, fallback logic for home pages
  if (!desktopActiveFound && (pageName === 'index.html' || pageName === 'home2.html')) {
    const homeLink = document.querySelector('.nav-menu .nav-link');
    if (homeLink) homeLink.classList.add('active');
  }

  // Mobile active links highlighting
  const mobileLinks = document.querySelectorAll('.mobile-nav-list .mobile-nav-link, .mobile-dropdown-menu .mobile-nav-link');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName) {
      link.classList.add('active');
      
      // Expand mobile dropdown if the active item is inside it
      if (link.closest('.mobile-dropdown-menu')) {
        const dropdownMenu = link.closest('.mobile-dropdown-menu');
        const parentBtn = document.getElementById('mobileDropdownBtn');
        if (dropdownMenu) dropdownMenu.classList.add('open');
        if (parentBtn) {
          parentBtn.classList.add('active');
          const arrow = parentBtn.querySelector('.mobile-dropdown-btn');
          if (arrow) arrow.classList.add('active');
        }
      }
    } else {
      link.classList.remove('active');
    }
  });
});
