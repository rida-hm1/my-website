/* ===== 1. قائمة الهاتف (Burger) ===== */
const menu = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
});
// إغلاق القائمة بعد الضغط على أي رابط
menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    }
});

/* ===== 2. ظهور العناصر عند التمرير (مع تأخير متدرّج بين البطاقات) ===== */
const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            reveal.unobserve(entry.target);
            // نلغي التأخير بعد الظهور حتى لا يتأخر تأثير hover
            setTimeout(() => (entry.target.style.transitionDelay = ''), 1000);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => {
    el.style.transitionDelay = [...el.parentElement.children].indexOf(el) * 90 + 'ms';
    reveal.observe(el);
});

/* ===== 3. تمييز رابط القسم الحالي في الـ navbar ===== */
const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            links.forEach((l) => l.classList.toggle('active', l.hash === '#' + entry.target.id));
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('header[id], section[id]').forEach((s) => spy.observe(s));

/* ===== 4. نموذج الاتصال: يفتح تطبيق البريد برسالة جاهزة (لا يحتاج سيرفر) ===== */
document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `${f.get('message')}\n\n— ${f.get('prenom')} ${f.get('nom')}\n${f.get('email')} ${f.get('tel')}`;
    location.href = 'mailto:ridahammadou2027@gmail.com'
        + '?subject=' + encodeURIComponent('Message depuis le portfolio')
        + '&body=' + encodeURIComponent(body);
});
