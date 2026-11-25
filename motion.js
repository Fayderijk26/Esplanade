const stack = document.querySelector('.stack');
function replay() {
  stack.classList.remove('drop');
  void stack.offsetWidth;
  stack.classList.add('drop');
}
document.querySelector('.replay').addEventListener('click',replay);
Promise.all([...stack.querySelectorAll('img')].map(img=>img.decode().catch(()=>{}))).then(replay);
const pages = [...document.querySelectorAll('.menupage')];
const categories = [...document.querySelectorAll('.categories a')];
function selectPage(id) {
  pages.forEach(page => {page.hidden = page.id !== id;});
  categories.forEach(link => {
    if (link.hash === '#' + id) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
}
function selectHash() {
  const page = pages.find(page => '#' + page.id === location.hash);
  selectPage(page ? page.id : pages[0].id);
  if (page) page.scrollIntoView({block:'nearest'});
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link && pages.some(page => '#' + page.id === link.hash)) {
    selectPage(link.hash.slice(1));
    if (categories.includes(link)) {
      event.preventDefault();
      history.pushState(null,'',link.hash);
    }
  }
});
addEventListener('hashchange', selectHash);
selectHash();

const ribbon = document.querySelector('.ribbon');
const hours = ribbon.querySelectorAll('.hours-message');
const pause = ribbon.querySelector('.ribbon-pause');
const amsterdamClock = new Intl.DateTimeFormat('nl-NL', {
  timeZone: 'Europe/Amsterdam', hour: '2-digit', hourCycle: 'h23'
});
function openingMessage(now) {
  return Number(amsterdamClock.format(now)) < 21
    ? 'Vandaag geopend van 10.00 tot 21.00 uur'
    : 'Morgen weer geopend vanaf 10.00 uur';
}
let hoursTimer;
function refreshHours() {
  clearTimeout(hoursTimer);
  const now = new Date();
  const message = openingMessage(now);
  hours.forEach(label => { label.textContent = message; });
  hoursTimer = setTimeout(refreshHours, 60000 - now.getTime() % 60000);
}
refreshHours();
document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshHours(); });
pause.hidden = false;
pause.addEventListener('click', () => {
  const paused = ribbon.classList.toggle('is-paused');
  pause.textContent = paused ? '▶' : 'Ⅱ';
  pause.setAttribute('aria-label', paused ? 'Hervat de bewegende tekst' : 'Pauzeer de bewegende tekst');
});
