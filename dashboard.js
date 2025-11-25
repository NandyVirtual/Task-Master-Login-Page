// Sidebar menu switching
document.querySelectorAll('.menu-item').forEach(btn => {
  btn.addEventListener('click', () => {
    // set active class on menu
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    btn.classList.add('active');

    // show corresponding page
    const target = btn.getAttribute('data-target');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('page-active'));
    const page = document.getElementById(target);
    if (page) page.classList.add('page-active');
  });
});

// Logout button behaviour
document.getElementById('logoutBtn').addEventListener('click', () => {
  alert('Logging out...');
  document.querySelector('.sidebar').style.opacity = 0.8;
});

// Stat cards clickable: toggle soft gradient/darker background on click
document.querySelectorAll('.stat-card.clickable').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('clicked');
  });
  // add keyboard accessibility (Enter)
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') card.classList.toggle('clicked');
  });
});

// Quick actions: when clicked they turn teal/active
document.querySelectorAll('.qa-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');

    // small feedback (demo) — in a real app you'd open the related modal or navigate
    const action = item.getAttribute('data-action');
    // console.log('Quick action clicked:', action);
  });
});

// Pages placeholder content handling
document.querySelectorAll('.page').forEach(p => {
  if (!p.classList.contains('page-active')) {
    p.style.display = 'none';
  }
});
// Keep page show/hide in sync with menu clicks
const observer = new MutationObserver(() => {
  document.querySelectorAll('.page').forEach(p => {
    if (p.classList.contains('page-active')) p.style.display = '';
    else p.style.display = 'none';
  });
});
observer.observe(document.querySelector('main'), { attributes: true, subtree: true, attributeFilter: ['class'] });

// Accessibility:keyboard navigation for menu
document.querySelectorAll('.menu-item').forEach((el) => {
  el.setAttribute('tabindex', '0');
});
