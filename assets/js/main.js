/* MENU */
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    /* Validar que existen las variables */
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
                       nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    /* When we click on each nav__link, we remove the show-menu class */
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* Mostrar Volver Arriba */
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    /* When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class */
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

/* Activar o desactivar el tema con el boton */
themeButton.addEventListener('click', () => {
    /* Agregar o quitar el icono Oscuro o Claro */
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* Reducir tamaño para imprimir en a4 */ 
function scaleCv(){
    document.body.classList.add('scale-cv')
}

function removeScale(){
    document.body.classList.remove('scale-cv')
}

/* GENERAR PDF */ 

/* Area generada del PDF */
let areaCv = document.getElementById('area-cv')

let resumeButton = document.getElementById('resume-button')

/* Opciones Html2pdf */
let opt = {
  margin:       0,
  filename:     'Muhammad-Essa-Resume.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 4 },
  jsPDF:        { format: 'a4', orientation: 'portrait' }
};

/* Funcion para llamar las opciones de areaCv y Html2Pdf */
    function generateResume(){
    html2pdf(areaCv, opt)
}

/* Cuando se clickea el boton, se ejecutan 3 funciones */
    resumeButton.addEventListener('click', () =>{

    /* 1. La clase .scale-cv se agrega a body, donde achica el tamaño de los elementos */
    scaleCv()

    /* 2. El PDF se genera */
    generateResume()

    /* 3. La clase .scale-cv se borra del body despues de 5 segundos para volver al tamaño normal */
        setTimeout(removeScale, 5000)
})