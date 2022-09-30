// page onload
let loading = document.querySelector('.loading');


window.onload = function() {
  setTimeout(() => loading.style.display = 'none', 0)

}

// setting menu
let floatingMenu = document.querySelector('.floating-menu');
let icon = document.querySelector('.floating-menu .icon')

icon.addEventListener('click', () => {
  // add class open on floating-menu
  floatingMenu.classList.toggle('open');
  //add class fa-spin on icon
  icon.children[0].classList.toggle('fa-spin')
})

// add and remove active class from elements
let colors = document.querySelectorAll('.colors li');

// get color value
let col = window.localStorage.getItem('color');
let colalt = window.localStorage.getItem('colorAlt');
// check if color presents in local
if (col !== null && colalt !== null) {
  // set color from localStorage
  document.documentElement.style.setProperty('--mColor', col);

  document.documentElement.style.setProperty('--mColorAlt', colalt);

  colors.forEach(li => {
    li.classList.remove('active')
  });
  // get item has the same color in
  // localstorage and put in it active class
  document.querySelector(`[data-color="${col}"]`).classList.add('active')
}

colors.forEach(function(li) {
  // add click to every li
  li.addEventListener('click', (e) => {
    // set color in root 
    document.documentElement.style.setProperty('--mColor', e.target.dataset.color);

    document.documentElement.style.setProperty('--mColorAlt', e.target.dataset.color + "A0");
    // add elements to local
    window.localStorage.setItem('color', e.target.dataset.color);

    window.localStorage.setItem('colorAlt', e.target.dataset.color + 'A0')
    // remove active class form all elements
    colors.forEach((e) => {
      e.classList.remove("active");
    });
    //add active to clicked color
    e.target.classList.add('active')
  });
});


// let yesBtn = document.querySelector('.yes');
// let noBtn = document.querySelector('.no');

// let backgroundOption = true;
// let backInterval;
// runImg();
// yesBtn.addEventListener('click', function() {
//   this.classList.add('active');
//   noBtn.classList.remove('active');
//   backgroundOption = true;
//   runImg();
// })

// noBtn.addEventListener('click', function() {
//   this.classList.add('active');
//   yesBtn.classList.remove('active');
//   backgroundOption = false;
//   clearInterval(backInterval);
// })


// // set time that change at it
// function runImg() {
//   if (backgroundOption === true) {
//     backInterval = setInterval(
//       function() {
//         // get random number form array
//         let x = Math.floor(Math.random() * imgs.length);
//         // change background according to random num from array
//         landing.style.backgroundImage = `url(../imgs/landing-${imgs[x]}.jpg)`
//       }, 4000)
//   }
// }

let landing = document.querySelector('.landing');

let imgs = [];
for (var i = 0; i < 6; i++) {
  imgs.push(`0${[i + 1]}`);
}

// check if any img in local

let currentBackImgValue = window.localStorage.getItem('currentBackImg');

if (currentBackImgValue !== null) {
  landing.style.backgroundImage = currentBackImgValue;
}


let btns = document.querySelectorAll('.stop-random .btns span');
let startInterval = true;
let inerval;
runImgs();
let back_option = localStorage.getItem('back_option');

// check element in local
if (back_option !== null) {
  // check is it true or false
  if (back_option === "true") {
    // set interval to true
    startInterval = true;
    // loop on span to remove active
    hBtn('yes');
  } else {
    startInterval = false;
    clearInterval(inerval);
    hBtn('no');
  }
}
// arg of the top function 
function hBtn(arg) {
  btns.forEach(e => {
    e.classList.remove('active');
    if (e.dataset.random === arg) {
      e.classList.add('active');
    }
  })
}


btns.forEach(span => {
  span.addEventListener('click', (e) => {
    btns.forEach(el => {
      el.classList.remove('active')
    });
    e.target.classList.add('active');

    if (e.target.classList.contains('yes')) {
      startInterval = true;
      runImgs();
      localStorage.setItem('back_option', true);
    } else {
      startInterval = false;
      clearInterval(inerval);
      localStorage.setItem('back_option', false);

    }
  })
});


function runImgs() {
  if (startInterval === true) {
    inerval = setInterval(function() {
      // get random number form array
      let x = Math.floor(Math.random() * imgs.length);
      // change background according to random num from array

      let src = `url(../imgs/landing-${imgs[x]}.jpg)`;
      landing.style.backgroundImage = src;


      window.localStorage.setItem('currentBackImg', src);

    }, 5000)

  }
}



// create an animation effect 
let skills = document.querySelector('.skills');

let progress = document.querySelectorAll('.progress span')

// create an animation effect on time line

let experience = document.querySelectorAll('.experience');
let year = document.querySelectorAll('.year');

let time_line = document.querySelector('.time-line')

// select button and create icon
let button = document.querySelector('.to-up');
let btnicon = document.createElement('i');
btnicon.className = 'fas fa-angle-up';
button.appendChild(btnicon);
// add click to button
button.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})
// on scroll
window.onscroll = function() {
  // window height 
  let windowHeight = this.innerHeight;
  // length scrolled
  let windowScrolled = this.scrollY;

  // height above skills
  let skillsOffSetTop = skills.offsetTop;
  // skill height
  let skillsHeight = skills.offsetHeight;
  // check if element is reached
  if (windowScrolled > (skillsOffSetTop - windowHeight + skillsHeight)) {
    progress.forEach((e) => {
      e.style.width = e.dataset.score;
      e.parentElement.querySelector('h3').classList.add('active')
    })
  }

  // height above class left in element
  let time_line_offSet = time_line.offsetTop;
  // skill height
  let time_line_Height = time_line.offsetHeight;
  // loop on experience
  for (let i = 0; i < experience.length; i++) {
    let expoffSet = experience[i].offsetTop;
    if (windowScrolled > (time_line_offSet - windowHeight * 2.6 + time_line_Height + expoffSet)) {
      // add class to experience
      experience[i].classList.add('active');
    }
  }

  // create button that makes you go up

  if (windowScrolled > 2700) {
    button.style.right = "20px"
  } else {
    button.style.right = '-50px'
  }
}



// create popup
let gallery = document.querySelectorAll('.gallery img');

gallery.forEach(function(img) {
  img.addEventListener('click', () => {
    // create overlay
    let overlay = document.createElement('div');
    overlay.classList.add('overlay-img')
    document.body.appendChild(overlay);
    // add click on overlay
    overlay.addEventListener('click', function() {
      overlay.remove();
      divOnOverlay.remove();
      img.style.opacity = '1'
    })
    img.style.opacity = '0'
    // create img above overlay
    let divOnOverlay = document.createElement('div');
    divOnOverlay.className = 'div-on-overlay';

    // put alt as heading
    if (img.alt !== null) {
      let h3 = document.createElement('h3');
      let altText = document.createTextNode(img.alt);

      h3.appendChild(altText);
      divOnOverlay.appendChild(h3)
    }

    // create img
    let imginPupUp = document.createElement('img');
    imginPupUp.src = img.src;
    divOnOverlay.appendChild(imginPupUp);
    // create closing button
    let icon = document.createElement('i');
    icon.className = 'fas fa-x icon';
    divOnOverlay.appendChild(icon);

    icon.addEventListener('click', () => {
      img.style.opacity = '1';
      overlay.remove();
      divOnOverlay.remove();
    })
    // appand elements in body
    document.body.appendChild(divOnOverlay);
  });
});


// scroll to your wanted place
// experience[0].scrollIntoView({
//   behavior: 'smooth'
// });

//=======advanced toggled menu======
let menuBtn = document.querySelector('.menu-btn');
let megaMenu = document.querySelector('.mega-menu');

let megaMenuClassInLocal = window.localStorage.getItem('megaClass');

if (megaMenuClassInLocal !== null) {
  menuBtn.classList.add('active');
  setTimeout(function() {
    megaMenu.classList.add('block')
  }, 100);
  setTimeout(function() {
    megaMenu.classList.add('active');
  }, 200);
}

menuBtn.onclick = function(e) {
  e.stopPropagation();
  this.classList.toggle('active');
  // check if active class is in local
  if (megaMenuClassInLocal !== null) {
    window.localStorage.removeItem('megaClass');
  } else {
    window.localStorage.setItem('megaClass', 'active')
  }

  if (megaMenu.classList.contains('active') && megaMenu.classList.contains('block')) {
    setTimeout(function() {
      megaMenu.classList.toggle('active');
    }, 200);
    setTimeout(function() {
      megaMenu.classList.toggle('block')
    }, 300);
  } else {
    setTimeout(function() {
      megaMenu.classList.toggle('block')
    }, 100);
    setTimeout(function() {
      megaMenu.classList.toggle('active');
    }, 200);
  }
};

// close menu if you clicked anywhere 
document.addEventListener('click', (e) => {
  // anything except menu and button
  if (e.target !== menuBtn && e.target !== megaMenu) {
    // check if menu and button have active classes 
    if (megaMenu.classList.contains('block', 'active') && menuBtn.classList.contains('active')) {
     // remove active from button
      menuBtn.classList.toggle('active');
      // remove active from mega
      setTimeout(function() {
        megaMenu.classList.toggle('active');
      }, 200);
      setTimeout(function() {
        megaMenu.classList.toggle('block')
      }, 300);
      // remove active class from local
      window.localStorage.removeItem('megaClass');
    }
  }
});

// stop propaganda on mega-menu 
megaMenu.onclick = (e) => {
  e.stopPropagation();
}
// ####### end of menu #######


// go to section
let links = document.querySelectorAll('.nav a');

// let checkIfSectionSrored = window.localStorage.getItem('section');

// if (checkIfSectionSrored !== null) {
//   document.querySelector(checkIfSectionSrored).scrollIntoView({

//     behavior: 'smooth' 

//   });
// }

links.forEach((link) => {

  link.addEventListener('click', (e) => {

    if (e.target.dataset.class !== undefined) {
      document.querySelector(e.target.dataset.class).scrollIntoView({
        behavior: 'smooth'
      });
      // window.localStorage.setItem('section', e.target.dataset.class)
    }

  });

});

// reset all eidts
document.querySelector('.reset-all').onclick = function() {

  localStorage.removeItem('megaClass')
  localStorage.removeItem('color')
  localStorage.removeItem('back_option')

  window.location.reload();
}



//========= validated inputs ==============
