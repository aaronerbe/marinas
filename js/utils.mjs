
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