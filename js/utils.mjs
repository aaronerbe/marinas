
/* 
░█░█░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░█░█▀▀░█▀█░█▀█░▀█▀░█▀▀░█▀▄░░░█░░░█▀█░█▀█░█▀▄░█▀▀░█▀▄
░█▀█░█▀▀░█▀█░█░█░█▀▀░█▀▄░▄▀░░█▀▀░█░█░█░█░░█░░█▀▀░█▀▄░░░█░░░█░█░█▀█░█░█░█▀▀░█▀▄
░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░▀░░░▀░░░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀░░░▀▀▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀
*/
export async function loadHeaderFooter(){
    //grab header/footer elements
    const header = document.getElementById('main-header');
    const footer = document.getElementById('main-footer');
    console.log(header);
    console.log(footer);
    //grab the template data
    const headerTemplate = await loadTemplate('../partials/header.html');
    const footerTemplate = await loadTemplate('../partials/footer.html');
    renderWithTemplate(headerTemplate, header);
    renderWithTemplate(footerTemplate, footer);
}
/*
░█▀▀░█▀▀░▀█▀░█▀▀░█░█░░░▀█▀░█▀▀░█▄█░█▀█░█░░░█▀█░▀█▀░█▀▀
░█▀▀░█▀▀░░█░░█░░░█▀█░░░░█░░█▀▀░█░█░█▀▀░█░░░█▀█░░█░░█▀▀
░▀░░░▀▀▀░░▀░░▀▀▀░▀░▀░░░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░▀░▀░░▀░░▀▀▀
*/
export async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template
}
/* 
░█▀▄░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░▀█▀░█▀▀░█▄█░█▀█░█░░░█▀█░▀█▀░█▀▀
░█▀▄░█▀▀░█░█░█░█░█▀▀░█▀▄░░░░█░░█▀▀░█░█░█▀▀░█░░░█▀█░░█░░█▀▀
░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░▀░▀░░▀░░▀▀▀
*/
export function renderWithTemplate(templateFn, parentElement, position = "afterbegin", clear=false){
    //templateFn = template data, parentElement = where were putting the template, data = ?, callback = ?, position = where we put it, clear = if true, clear existing data in the element
    if (clear){
        parentElement.innerHTML = '';
    }
    //insert the template data at the beginning of the element.
    parentElement.insertAdjacentHTML(position, templateFn);
}

/* 
░█▀▀░█░░░█▀▀░█▀█░█▀█░░░░░░░█▀▀░█▀█░█▀█░▀█▀░▀█▀░█▀█░█░░░▀█▀░▀▀█░█▀▀
░█░░░█░░░█▀▀░█▀█░█░█░░▄█▄░░█░░░█▀█░█▀▀░░█░░░█░░█▀█░█░░░░█░░▄▀░░█▀▀
░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀░▀░░░▀░░░▀▀▀░▀░▀░▀░░░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀
*/
//remove dashes and capitalize a word used for category in a couple places
export function capitalizeWord(word) {
    if (word !== null) {
    word = word.replace(/-/g, ' ');
    const words = word.split(' ');
    const capitalizedWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
    return capitalizedWords.join(' ');}
}


/* 
░█░█░▀█▀░█▀▄░█▀▀░░█▀▀░█░░░█▀▀░█▄█░█▀▀░█▀█░▀█▀
░█▀█░░█░░█░█░█▀▀░░█▀▀░█░░░█▀▀░█░█░█▀▀░█░█░░█░
░▀░▀░▀▀▀░▀▀░░▀▀▀░░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀░▀░░▀░
*/
//Toggle visibility of the cart counter depending on if something is in it
//default is hidden
export function showElement(element) {
    element.classList.add('visible');
    element.classList.remove('hidden');
}
export function hideElement(element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
}
export function getCartCount() {
    const cart = getLocalStorage('so-cart');
    let cartCount = 0;
    if (cart !== null && cart !== undefined) {
        cartCount = cart.length;
    }
    return cartCount;
}