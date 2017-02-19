(function () {
    // The tab browser.
    var obj_tabBrowser = {
        currentTab: 0,
        arr_tabs: [],
        next: function () {
            if (this.currentTab == this.arr_tabs.length - 1) {
                this.displayTab(0);
            } else {
                this.displayTab(this.currentTab + 1);
            }
        },
        previous: function () {
            if (this.currentTab == 0) {
                this.displayTab(this.arr_tabs.length - 1);
            } else {
                this.displayTab(this.currentTab - 1);
            }
        },
        displayTab(id) {
            
            this.currentTab = id;
            
            
            this.arr_tabs.forEach(function(tab){
                tab = document.getElementById(tab.id)
                if(!tab.classList.contains("hidden")){
                    tab.classList.add("hidden");
                }                
                if(tab.id.split("_")[1] == id){
                    tab.classList.remove("hidden");
                }
            });
            
            
            this.arr_tabs[this.currentTab].classList.remove("hidden");
            
            // Notify observers.
            this.tabChangedEventListeners.forEach(function(eventListener){
                eventListener(id + 1);
            });
        },
        tabChangedEventListeners: [],

        obj_classNames: {
            str_container: "tabcontents",
            str_nextButton: "next_tab_button",
            str_previousButton: "previous_tab_button",
            str_currentTabNumber: "current_tab",
            str_TabCountNumber: "tab_count"
        },
        // Is populated with found elements matching the above.
        obj_htmlElements: {}
    }

    // On load events.
    var init_tasks = [
        // Get the html elements.
        function () {
            obj_tabBrowser.obj_htmlElements = {};
            var classes = obj_tabBrowser.obj_classNames;
            for (var prop in classes) {
                if (prop[0] == "s" && prop[1] == "t") {
                    obj_tabBrowser.obj_htmlElements[prop.split("_")[1]] = getElems(classes[prop]);
                }
            }

            function getElems(str_className) {
                var result = document.getElementsByClassName(str_className);
                return result;
            }
        },

        // ID the tabs.
        function () {
            var next_iterator = (function () {
                var i = 0;
                return function () {
                    var r = i;
                    i = i + 1;
                    return r;
                }
            })();

            var container_children = obj_tabBrowser.obj_htmlElements.container[0].children;
            var tabs = [];
            container_children.forEach = Array.prototype.forEach;
            container_children.forEach(function (node) {
                if (node.nodeType == 1) {
                    tabs.push(node);
                }
            });
            tabs.forEach(function (tab) {
                tab.id = "tab_" + next_iterator();
                obj_tabBrowser.arr_tabs.push(tab);
            });
        },

        // Hide the tabs (except for the first)
        function () {
            obj_tabBrowser.arr_tabs.forEach(function (tab) {

                tab.classList.add("anti-flash");
                if (tab.id != "tab_0") {
                    tab.classList.add("hidden");
                }
            });
        },

        // Load the controls.
        function () {
            var browser_elem = obj_tabBrowser.obj_htmlElements.container[0];
            var controls = '<div class="tab_controls anti-flash"><div class="left"><span>Page <span class="current_tab">1</span> of <span class="tab_count">N</span></span></div><div class="right"><div class="previous_tab_container"><span class="previous_tab_button"><img class="previousButton" src="../graphics/pagenavicon.svg" alt="Click here to go to the last sub page"/></span></div><div class="next_tab_container"><span class="next_tab_button"><img class="nextButton" src="../graphics/pagenavicon.svg" alt="Click here to go to the next sub page"/></span></div></div></div>';
            browser_elem.innerHTML = controls + browser_elem.innerHTML + controls;
            
            
        },
        
        // Get the html elements (again).
        function () {
            obj_tabBrowser.obj_htmlElements = {};
            var classes = obj_tabBrowser.obj_classNames;
            for (var prop in classes) {
                if (prop[0] == "s" && prop[1] == "t") {
                    obj_tabBrowser.obj_htmlElements[prop.split("_")[1]] = getElems(classes[prop]);
                }
                classes[prop].forEach = Array.prototype.forEach;
            }

            function getElems(str_className) {
                var result = document.getElementsByClassName(str_className);
                return result;
            }
        },

        // Attach event listeners.
        function(){
            var nextButtons = obj_tabBrowser.obj_htmlElements.nextButton
            var previousButtons = obj_tabBrowser.obj_htmlElements.previousButton
            var currentTabNumbers = obj_tabBrowser.obj_htmlElements.currentTabNumber
            var tabCountNumbers = obj_tabBrowser.obj_htmlElements.TabCountNumber
            
            nextButtons.forEach = Array.prototype.forEach;
            previousButtons.forEach = Array.prototype.forEach;
            currentTabNumbers.forEach = Array.prototype.forEach;
            tabCountNumbers.forEach = Array.prototype.forEach;
            
            nextButtons.forEach(function(elem){
                elem.onclick = (function(event){
                   obj_tabBrowser.next(); 
                });
            });            
            
            previousButtons.forEach(function(elem){
                elem.onclick = (function(event){
                   obj_tabBrowser.previous(); 
                });
            });            
            
            obj_tabBrowser.tabChangedEventListeners.push(function(tabNumber){
                currentTabNumbers.forEach(function(elem){
                    elem.innerHTML = tabNumber;
                });
            });
            
            tabCountNumbers.forEach(function(elem){
               elem.innerHTML = obj_tabBrowser.arr_tabs.length; 
            });
            
            
            

        }
    ]

    init_tasks.forEach(function (event) {
        if (window.addEventListener) {
            window.addEventListener('load', event, false); //W3C
        } else {
            window.attachEvent('onload', event); //IE
        }
    });

})();