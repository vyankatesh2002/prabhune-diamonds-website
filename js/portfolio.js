 (function() {
    // Sticky header
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10));

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Scroll to top button
    const topBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
      const show = window.scrollY > 400;
      topBtn.style.opacity = show ? '1' : '0';
      topBtn.style.visibility = show ? 'visible' : 'hidden';
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');
    menuBtn.addEventListener('click', () => {
      if (nav.style.display === 'flex') {
        nav.style.display = '';
        nav.removeAttribute('style');
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = 'rgba(255,255,255,0.98)';
        nav.style.padding = '1.5rem';
        nav.style.backdropFilter = 'blur(8px)';
        nav.style.zIndex = '998';
      }
    });

    // Close mobile menu on link click (smooth scroll included)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) nav.style.display = '';
      });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#" || href === "") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
      });
    });

    // Modals
    const calcModal = document.getElementById('calcModal');
    const todoModal = document.getElementById('todoModal');
    const closeCalc = document.getElementById('closeCalcModal');
    const closeTodo = document.getElementById('closeTodoModal');

    function openModal(modal) { modal.style.display = 'flex'; }
    function closeModal(modal) { modal.style.display = 'none'; }

    document.getElementById('calcDemoBtn').addEventListener('click', (e) => {
      e.preventDefault();
      openModal(calcModal);
      buildCalc();
    });
    document.getElementById('todoDemoBtn').addEventListener('click', (e) => {
      e.preventDefault();
      openModal(todoModal);
    });

    closeCalc.addEventListener('click', () => closeModal(calcModal));
    closeTodo.addEventListener('click', () => closeModal(todoModal));
    window.addEventListener('click', (e) => {
      if (e.target === calcModal) closeModal(calcModal);
      if (e.target === todoModal) closeModal(todoModal);
    });

    // Calculator logic
    let calcExp = '';
    function buildCalc() {
      const container = document.getElementById('calcButtons');
      container.innerHTML = '';
      const keys = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'];
      keys.forEach(k => {
        const btn = document.createElement('button');
        btn.textContent = k;
        btn.addEventListener('click', () => {
          const screen = document.getElementById('calcScreen');
          if (k === 'C') {
            calcExp = '';
            screen.value = '0';
          } else if (k === '=') {
            try {
              const res = Function('"use strict";return (' + calcExp + ')')();
              screen.value = res;
              calcExp = res.toString();
            } catch {
              screen.value = 'Error';
              calcExp = '';
            }
          } else {
            if (calcExp === '' && screen.value === '0' && !isNaN(k)) calcExp = k;
            else calcExp += k;
            screen.value = calcExp;
          }
        });
        container.appendChild(btn);
      });
    }

    // Simple Todo demo
    const todoInput = document.getElementById('demoTodoInput');
    const addBtn = document.getElementById('demoAddTodo');
    const todoList = document.getElementById('demoTodoList');
    addBtn.addEventListener('click', () => {
      if (todoInput.value.trim()) {
        const li = document.createElement('li');
        li.textContent = todoInput.value;
        li.style.padding = '0.5rem';
        li.style.borderBottom = '1px solid #3a3a50';
        li.style.color = '#ddd';
        todoList.appendChild(li);
        todoInput.value = '';
      }
    });
    todoInput.addEventListener('keypress', (e) => { if(e.key==='Enter') addBtn.click(); });

    // Contact form (mailto)
    const form = document.getElementById('contactForm');
    const fb = document.getElementById('formFeedback');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim() || 'Project Inquiry';
      const msg = document.getElementById('contactMessage').value.trim();
      if (!name || !email) {
        fb.innerHTML = '<span style="color:#f87171;">Name and email required.</span>';
        return;
      }
      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${msg}`;
      window.location.href = `mailto:vyankateshvjaware9960@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      fb.innerHTML = '<span style="color:#4ade80;">✓ Opening email client...</span>';
      form.reset();
    });
  })();