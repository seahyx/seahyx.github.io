// Get the scrolling element
var scrollElm = document.getElementById('main-scroll');
var scrollElmList = scrollElm.getElementsByTagName('li');
scrollElm.addEventListener("wheel", onWheelScroll);
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
        if (currentScrollIndex < scrollElmList.length - 1) {
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
        scrollElm.scrollTo({
            top: sumOfScrollHeights(scrollElmList, currentScrollIndex, false),
            behavior: 'smooth'
        });
        scrollElmList.item(currentScrollIndex).firstElementChild.className = 'def selected-transition';
        scrollElmList.item(currentScrollIndex).className = 'def selected-transition';
        scrollElmList.item(previousScrollIndex).firstElementChild.className = 'def';
        scrollElmList.item(previousScrollIndex).className = 'def';
        previousScrollIndex = currentScrollIndex;
    }
}
/**
 * Calculates sum of the scrollHeights of a list of elements up to the nth-element.
 * @param elementList Array of elements in a list.
 * @param index Index of the last element to which the heights will be summed up to. Starts from 0.
 * @param includeIndexElement Whether the height of the index element will be summed as well.
 * @returns Sum of the scrollHeights of the list of elements up to the nth-element.
 */
function sumOfScrollHeights(elementList, index, includeIndexElement) {
    // Test if index is valid
    if (index > elementList.length - 1 || index < 0) {
        console.warn('sumOfScrollHeights: index (' + index + ') has an invalid value\nClamping value to between ' + 0 + ' and ' + (elementList.length - 1));
        mathClamp(index, 0, elementList.length - 1);
    }
    var heightSum = 0;
    for (var x = 0; x < index; x++) {
        heightSum += elementList.item(x).scrollHeight;
    }
    if (includeIndexElement) {
        heightSum += elementList.item(index).scrollHeight;
    }
    return heightSum;
}
function mathClamp(val, min, max) {
    return Math.min(Math.max(min, val), max);
}
