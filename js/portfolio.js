/* Portfolio Interactive - Premium Features */
/* Word animation, Mobile menu, Reveals, Modals (Calc/Todo), Form, Scroll */

// Word animation for hero heading
const heading = document.getElementById('animatedHeading');
if(heading){ 
  const words = heading.innerText.split(' '); 
  heading.innerHTML = words.map(w => `<span class="word" style="display:inline-block; opacity:0; transform:translateY(20px); transition:0.6s ease">${w}</span>`).join(' '); 
  document.querySelectorAll('.word').forEach((w,i) => setTimeout(() => { w.style.opacity = '1'; w.style.transform = 'translateY(0)'; }, i*120)); 
}

// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav-links');
if(menuBtn && nav) {
  menuBtn.addEventListener('click', () => { 
    nav.classList.toggle('active'); 
    menuBtn.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>'; 
  });
}

// Reveal animations observer
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => { 
  entries.forEach(entry => { 
    if(entry.isIntersecting) entry.target.classList.add('visible'); 
  }); 
}, { threshold: 0.12 });
revealElements.forEach(el => observer.observe(el));

// Scroll top button
window.addEventListener('scroll', () => { 
  const scrollTop = document.getElementById('scrollTopBtn');
  if(scrollTop) scrollTop.classList.toggle('visible', window.scrollY > 400); 
});
document.addEventListener('click', (e) => {
  if(e.target.id === 'scrollTopBtn' || e.target.closest('#scrollTopBtn')) {
    e.preventDefault();
    window.scrollTo({top:0, behavior:'smooth'});
  }
});

// Contact form - WA.me redirect
const contactForm = document.getElementById('contactForm');
if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('emailAddr').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !subject || !message) return alert('Please fill required fields.');
    const waText = `New inquiry from ${name}%0AEmail: ${email}%0APhone: ${phone || 'Not provided'}%0ASubject: ${subject}%0AMessage: ${message}`;
    window.open(`https://wa.me/919960340222?text=${waText}`, '_blank');
    alert('Redirecting to WhatsApp. I will reply shortly.');
    contactForm.reset();
  });
}

// Calculator Modal
const calcModal = document.getElementById('calcModal');
const calcDemoBtn = document.getElementById('calcDemoBtn');
if(calcDemoBtn) {
  calcDemoBtn.onclick = (e) => { 
    e.preventDefault(); 
    if(calcModal) calcModal.style.display='flex'; 
    buildCalc(); 
  };
}
function buildCalc() {
  const btns = document.getElementById('calcButtons'); 
  const screen = document.getElementById('calcScreen');
  if(!btns || !screen) return;
  btns.innerHTML = '';
  ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C','CE'].forEach(k => {
    const btn = document.createElement('button'); 
    btn.textContent = k; 
    btn.style.cssText = 'background:#1e1e2a;border:none;border-radius:16px;padding:14px;cursor:pointer;color:white;font-weight:600;';
    btn.onclick = () => { 
      if(k === 'C'||k==='CE') screen.value=''; 
      else if(k==='=') { 
        try { screen.value=eval(screen.value); } catch { screen.value='Error'; } 
      } else screen.value+=k; 
    };
    btns.appendChild(btn);
  });
}
document.getElementById('closeCalcModal')?.onclick = () => calcModal.style.display='none';

// Todo Modal
const todoModal = document.getElementById('todoModal');
const todoDemoBtn = document.getElementById('todoDemoBtn');
if(todoDemoBtn) {
  todoDemoBtn.onclick = (e) => { 
    e.preventDefault(); 
    if(todoModal) todoModal.style.display='flex'; 
    initTodo(); 
  };
}
function initTodo() {
  const input = document.getElementById('demoTodoInput'), 
  add = document.getElementById('demoAddTodo'), 
  list = document.getElementById('demoTodoList');
  if(!input || !add || !list) return;
  let tasks = [];
  function render() { 
    list.innerHTML = ''; 
    tasks.forEach((t,i) => { 
      const li = document.createElement('li'); 
      li.style.cssText = 'display:flex;justify-content:space-between;padding:0.5rem 0;list-style:none;'; 
      li.innerHTML = `<span>${t}</span><button data-idx="${i}" class="delTodo" style="background:none;border:none;color:#ff6b6b;font-size:1.2rem;cursor:pointer;">🗑️</button>`; 
      list.appendChild(li); 
    }); 
    document.querySelectorAll('.delTodo').forEach(btn => {
      btn.onclick = () => { tasks.splice(btn.dataset.idx,1); render(); };
    }); 
  }
  add.onclick = () => { 
    if(input.value.trim()) { 
      tasks.push(input.value.trim()); 
      input.value=''; 
      render(); 
    } 
  };
  render();
}
document.getElementById('closeTodoModal')?.onclick = () => todoModal.style.display='none';

// Close modals on outside click
window.onclick = (e) => { 
  if(e.target === calcModal) calcModal.style.display='none'; 
  if(e.target === todoModal) todoModal.style.display='none'; 
};

