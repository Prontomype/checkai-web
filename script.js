const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const prompts = {
  ventas: {
    q: '¿Cómo van mis ventas este mes?',
    a: 'Este mes registras S/ 18,340 en ventas. Los viernes muestran tu mejor desempeño. Puedes revisar esa tendencia antes de programar promociones.'
  },
  producto: {
    q: '¿Qué producto debería promocionar esta semana?',
    a: 'Tu producto con mejor tendencia es Polo básico negro. Tiene buena rotación y suficiente stock. Una promoción esta semana podría ayudarte a aprovechar esa demanda.'
  },
  clientes: {
    q: '¿Qué clientes no han vuelto?',
    a: 'Puedo ayudarte a identificar clientes sin compras recientes y agruparlos para una acción de seguimiento o una campaña de reactivación.'
  },
  post: {
    q: 'Crea una publicación para mis redes.',
    a: 'Claro. Puedo ayudarte a preparar un texto promocional usando el producto, precio y objetivo que definas, manteniendo un mensaje sencillo para tus clientes.'
  }
};

const chatBody = document.getElementById('chat-body');
const chips = document.querySelectorAll('.prompt-chips button');
chips.forEach(btn => {
  btn.addEventListener('click', () => {
    chips.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const item = prompts[btn.dataset.prompt];
    chatBody.innerHTML = `
      <div class="bubble user">${item.q}</div>
      <div class="bubble bot"><span class="spark">✦</span><span>${item.a}</span></div>
    `;
  });
});
