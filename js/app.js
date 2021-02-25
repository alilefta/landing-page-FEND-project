/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const header = document.querySelector(".page__header");
const navbar = document.querySelector(".navbar__menu");
const main = document.querySelector("main");
const sections = document.querySelectorAll("[data-nav]");



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const elementInViewport2 = (el) => {
    const bounding = el.getBoundingClientRect();
    if(bounding.y < 200 && bounding.y > -(bounding.height)){
        return true;
    }
    else{
        return false;
    }

};

const removeCollapse = (element)=> {
    element.querySelector("h2").classList.add("active");
    element.querySelectorAll("p").forEach(p=> {return p.classList.add("collapse");});
};   

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

const createNavMenu = () => {
    const list = document.createElement("ul");
    list.id = "navbar__list";
    navbar.appendChild(list);
};

// Build the nav
const generateNavItems = ()=>{
    const navList = document.getElementById("navbar__list");
    const sectionsNum = 6;

    for(let i =0; i < sectionsNum; i++){
        const navItem = document.createElement("li");
        const aTag = document.createElement("a");
        
        if(sections[i] !== undefined){
            aTag.href = "#" + sections[i].id;
            aTag.textContent = sections[i].dataset.nav;
            aTag.classList.add("menu__link");
            
        }

        navItem.appendChild(aTag);
        navList.appendChild(navItem);
    }

    // Scroll Effect to the desierd section
    scrollIng();
};



const returnToTop = () => {
    const btn = document.createElement("a");
    btn.innerHTML = "<i class=\"fas fa-chevron-up\"></i>";
    btn.href = "#home";
    btn.classList.add("sticky-btn");
    main.appendChild(btn);

    document.querySelector(".sticky-btn").addEventListener("click", (e)=> {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior:"smooth"
        });
    });
};

// Add class 'active' to section when near top of viewport
const addActiveClass = ()=> {
    sections.forEach(section => {
        if(elementInViewport2(section)){
            section.classList.add("your-active-class");
            const highlight = document.querySelectorAll('#navbar__list li a');
            highlight.forEach(e=> {
                if(e.innerText === section.querySelector('h2').innerText){
                    e.style.backgroundColor = '#000';
                    e.style.color = "#fff"
                }else{
                    e.style.backgroundColor = '#fff';
                    e.style.color = "#000"
                }
            })
        }else{
            section.classList.remove("your-active-class");
        }
    });


};

// Scroll to anchor ID using scrollTO event
const scrollIng = ()=> {
    const navItems = document.querySelectorAll(".menu__link");
    navItems.forEach(item => {
        item.addEventListener("click", (e)=> {
            e.preventDefault();

            // Get the right section
            sections.forEach(section => {
                if(section.dataset.nav === e.target.innerText){
                    window.scrollTo({
                        top: section.offsetTop,
                        left: section.offsetLeft,
                        behavior: "smooth"
                    });
                    removeCollapse(section);
                }
            });
            if(e.target.innerText === "Home"){
                window.scrollTo({
                    top:0,
                    behavior: "smooth"
                });
            }
        });
    });

    // Generate TOP button on first scrolling
    returnToTop();
};


const showNav = ()=> {
    let isScrolling;
    window.addEventListener("scroll", ()=> {
        window.clearTimeout(isScrolling);

        header.style.transform = "translateY(0)";
        header.style.transition = ".2s linear transform";

        if(window.scrollY > 0){
            isScrolling = setTimeout(()=> {
                header.style.transform = "translateY(-100px)";
                header.style.transition = ".5s linear transform";
                // document.querySelector('.sticky-btn').style.opacity = 0;
            }, 1000);
        }

        // Show "return to top" button on scrolling
        if(window.scrollY > 200){
            document.querySelector(".sticky-btn").style.opacity = 1;
        }else{
            document.querySelector(".sticky-btn").style.opacity = 0;
        }
       
    }, false);

};





const collapsing = () => {
    sections.forEach(section => {
        const h2 = section.querySelector("h2");
        const content = section.querySelectorAll("p");
        h2.addEventListener("click", ()=> {
            if(h2.classList.contains("active")){
                h2.classList.remove("active");
                content.forEach(e=> {
                    e.classList.remove("collapse");
                });

            }else{
                h2.classList.add("active");
                content.forEach(e=> {
                    e.classList.add("collapse");
                });
            }
        });
    });
    
};


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
document.addEventListener("DOMContentLoaded", createNavMenu);

// Create NavList items
document.addEventListener("DOMContentLoaded", generateNavItems);

// Show / hide navbar
document.addEventListener("DOMContentLoaded", showNav);

// Set sections as active
document.addEventListener("scroll", addActiveClass);

// Collapse sections
document.addEventListener("DOMContentLoaded", collapsing);

