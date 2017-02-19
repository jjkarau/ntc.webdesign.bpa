(function () {

    
    
    
    var tap_for_nav, NAV_TOGGLED, DEBOUNCE_TOKEN;
    document.addEventListener("DOMContentLoaded", function () {
        
        console.log(document.querySelectorAll(".links-container .link"));
        
        
        
        
        tap_for_nav = document.getElementById("tap_for_nav");

        var links_container = document.getElementById("links-container");
        links_container.addEventListener("mouseover", function (e) {
            e.stopPropagation();
            hideNav();
        });

        links_container.addEventListener("mouseout", function (e) {
            e.stopPropagation();
            showNav();
        });tap_for_nav.addEventListener("touchend", function (e) {
            e.stopPropagation();
            toggleNav();
        });


        window.addEventListener("resize", onResize, false);

    });



    function toggleNav() {
        NAV_TOGGLED ? hideNav() : showNav();
    }

    function hideNav() {
        var links_container = document.getElementById("links-container");
        NAV_TOGGLED = false;
        links_container.classList.add("showall"); links_container.classList.remove("hideall");
    }

    function showNav() {
        var links_container = document.getElementById("links-container");
        NAV_TOGGLED = true;
        links_container.classList.remove("showall"); links_container.classList.add("hideall");
    }

    function onResize() {
        debounce(function () {
            showNav();
        }, 500, false);
    }

    // Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

})();