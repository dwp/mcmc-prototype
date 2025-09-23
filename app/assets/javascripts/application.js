//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production');
}

const visibleClass = 'visible';

function initiateHelp() {
  const helpToast = document.getElementsByClassName('toast')[0];
  if (helpToast.classList.contains(visibleClass)) {
    helpToast.classList.remove(visibleClass);
  } else {
    helpToast.classList.add(visibleClass);
  }
}

function closeHelp() {
  const helpToast = document.getElementsByClassName('toast')[0];
  if (helpToast.classList.contains(visibleClass)) {
    helpToast.classList.remove(visibleClass);
  }
}

function toggleMenu() {
  const mobMenu = document.getElementById('accountMenuHomeMobile');
  if (mobMenu.classList.contains(visibleClass)) {
    mobMenu.classList.remove(visibleClass);
  } else {
    mobMenu.classList.add(visibleClass);
  }
  const mobMenuToggle = document.getElementById('accountMenuMobileToggle');
  mobMenuToggle.classList.toggle('menu-toggle-button--open');
}

function toggleFilter() {
  var filtersIcon = document.getElementById('toggle-filter-icon');
  if (filtersIcon) {
    if (filtersIcon.classList.contains('govuk-accordion-nav__chevron--down')) {
      filtersIcon.classList.remove('govuk-accordion-nav__chevron--down')
    } else {
      filtersIcon.classList.add('govuk-accordion-nav__chevron--down');
    }
  }
  var toggleFilter = document.getElementById('toggle-filter');
  if (toggleFilter) {
    var filtersDiv = document.getElementsByClassName('filters-desktop')[0];
    if (filtersDiv) {
      filtersDiv.classList.add('js-hidden-mobile');
    }
    toggleFilter.addEventListener('click', function (e) {
      var filtersDiv = document.getElementsByClassName('filters-desktop')[0];
      if (filtersDiv) {
        if (filtersDiv.classList.contains('js-hidden-mobile')) {
          filtersDiv.classList.remove('js-hidden-mobile');
        } else {
          filtersDiv.classList.add('js-hidden-mobile');
        }
      }
      e.preventDefault();
      e.stopPropagation();

    });
  }
}

const moreFilesButton = document.getElementsByClassName('add-file');

// add more rows to file upload
if(moreFilesButton.length) {
  let count = 1;
  const documentSummary = document.getElementsByClassName('govuk-summary-list');
  const warning = document.getElementsByClassName('max-files-warning');
  moreFilesButton[0].addEventListener('click', function(){
    if(count === 6){
      moreFilesButton[0].classList.add('hidden');
      const childRow = documentSummary[0].getElementsByClassName(`row-7`)
      childRow[0].classList.remove('hidden');
      warning[0].classList.remove('hidden');
    } else {
      count += 1;
      const childRow = documentSummary[0].getElementsByClassName(`row-${count}`)
      childRow[0].classList.remove('hidden');
    }
  })
}

// check if file input has a file
const fileOne = document.getElementById('file-upload-1');
const fileTwo = document.getElementById('file-upload-2');
const fileThree = document.getElementById('file-upload-3');
const fileFour = document.getElementById('file-upload-4');
const fileFive = document.getElementById('file-upload-5');
const fileSix = document.getElementById('file-upload-6');
const fileSeven = document.getElementById('file-upload-7');

const fileAmount = document.getElementsByClassName('file-amount-count');

if(fileOne){
  const firstRow = document.getElementsByClassName('row-1');
  const removeFile = firstRow[0].getElementsByClassName('remove-file');
  fileOne.addEventListener('change', function(){
    removeFile[0].classList.remove('hidden');
    if(fileOne.files.length === 1){
      console.log(fileAmount);
      fileAmount[0].innerHTML = '1';
    } else {
      fileAmount[0].innerHTML = '0';
    }
  })
}

if(fileTwo){
  const secondRow = document.getElementsByClassName('row-2');
  const removeFile = secondRow[0].getElementsByClassName('remove-file');
  fileTwo.addEventListener('change', function(){
    removeFile[0].classList.remove('hidden');
  })
}

if(fileThree){
  const thirdRow = document.getElementsByClassName('row-3');
  const removeFile = thirdRow[0].getElementsByClassName('remove-file');
  fileThree.addEventListener('change', function(){
    removeFile[0].classList.remove('hidden');
  })
}

if(fileFour){
  const fourthRow = document.getElementsByClassName('row-4');
  const removeFile = fourthRow[0].getElementsByClassName('remove-file');
  fileFour.addEventListener('change', function(){
    removeFile[0].classList.remove('hidden');
  })
}

if(fileFive){
  const fifthRow = document.getElementsByClassName('row-5');
  const removeFile = fifthRow[0].getElementsByClassName('remove-file');
  fileFive.addEventListener('change', function(){
    removeFile[0].classList.remove('hidden');
  })
}

if(fileSix){
  const sixthRow = document.getElementsByClassName('row-6');
  const removeFile = sixthRow[0].getElementsByClassName('remove-file');
  fileSix.addEventListener('change', function(){
    removeFile[0].classList.remove('hidden');
  })
}

if(fileSeven){
  const seventhRow = document.getElementsByClassName('row-7');
  const removeFile = seventhRow[0].getElementsByClassName('remove-file');
  fileSeven.addEventListener('change', function(){
    removeFile[0].classList.remove('hidden');
  })
}


$(document).ready(function () {
  window.GOVUKFrontend.initAll();
});

function toggleLoading() {
    var x = document.getElementById("uploadComponent");
    x.style.opacity = "0.5";

    var y = document.getElementById("uploadButton");
    y.style.opacity = ".5";

    var z = document.getElementById("loadingBar");
    z.style.display = "block";

    setTimeout(function () {
      window.location.href = "/pages/messages/upload-evidence/success"; //will redirect to your blog page (an ex: blog.html)
   }, 4000); //will call the function after 10 secs.
}


function toggleFile() {
    var x = document.getElementById("fileEmpty");
    x.style.display = "none";

    var y = document.getElementById("fileSelected");
    y.style.display = "block";
}

})


/* global $ */