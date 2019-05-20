// Get the scrolling element
var scrollEl = document.getElementById('main-scroll');
var scrollElLs = scrollEl.getElementsByTagName('li');
scrollEl.addEventListener("wheel", onWheelScroll);
var previousScrollIndex = 0;
var currentScrollIndex = 0;
function onWheelScroll(event) {
    // Vertical scroll value of a wheel scroll event
    // positive values denote page scrolling down
    // negative values denote page scrolling up
    var dy = event.deltaY;
    // Track if value has changed
    var currentScrollIndexChanged = false;
    // Check page scroll
    if (dy > 0) {
        // Page scroll down
        // increase item selected index
        if (currentScrollIndex < scrollElLs.length) {
            currentScrollIndex++;
            currentScrollIndexChanged = true;
        }
    }
    else {
        // Page scroll up
        // decrease item selected index
        if (currentScrollIndex > 0) {
            currentScrollIndex--;
            currentScrollIndexChanged = true;
        }
    }
    // Value has changed
    if (currentScrollIndexChanged) {
        scrollEl.scrollTo({
            top: scrollElLs.item(0).scrollHeight * currentScrollIndex,
            behavior: 'smooth'
        });
        scrollElLs.item(currentScrollIndex).firstElementChild.className = 'def selected-transition';
        scrollElLs.item(previousScrollIndex).firstElementChild.className = 'def';
        previousScrollIndex = currentScrollIndex;
    }
}
