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
