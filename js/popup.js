var popup = {

    _params: {
        stationsCount: 0,
        itemHeight: 72,
        availableStations: []
    },

    /**
     * Checks whether scroll or popup resize is required based on the number of items  
     * and calls the corresponding functions
     */
    initialize: function(stations){

        var content = '';

        // just leave active stations in an array and generate content based on them
        for (var i = stations.length - 1; i >= 0; i--) {
            if (stations[i].active) {
                content = this.handleActiveStation(stations[i]) + content;
            } else {
                stations.splice(i, 1);
            }
        }

        if (this.isSpecialCase())
            return;

        this.insertContent(content); 

        this._params.stationsCount <= 7
            ? this.adjustPopupHeight()
            : this.initScroll();

    },

    handleActiveStation: function(station){

        this._params.stationsCount++;
        this._params.availableStations.unshift(station);

        return this.itemConstructor(station);

    },

    /**
     * Builds the html code for the item based on its data
     */
    itemConstructor: function(params){

        var title = params.title, 
            identifier = params.identifier,
            listenUrl = params.listenUrl, 
            openUrl = params.openUrl,
            item = [
                '<li class="' + identifier + '">',
                '<span>' + title + '</span>',
                '<a href="http://www.bbc.co.uk/radio/player/' + listenUrl + '" class="listen" target="_blank">Listen live</a>',
                '<a href="http://www.bbc.co.uk/' + openUrl + '" class="read" target="_blank">Check page</a>',
                '</li>'
            ].join('\n');

        return item;

    },

    /**
     * If one or none items are to be shown, 
     * badge click has to be handled in a different way
     */
    isSpecialCase: function(){
        
        var isEmpty = this._params.stationsCount === 0,
            isOneItem = this._params.stationsCount === 1;

        isEmpty && this.handleEmptyList();
        isOneItem && this.openRightAway();

        return isEmpty || isOneItem;

    },

    /**
     * If no items are to be displayed in a popup, it'll show the corresponding notification
     */
    handleEmptyList: function(){
        
        var content = [
                '<li class="message">',
                'please pick some stations to show here via the',
                '<a href="options.html" target="_blank">options page</a>',
                '</li>'
            ].join('\n');

        this
            .insertContent(content)
            .adjustPopupHeight();

    },

    openRightAway: function(){
        
        // todo чё с params??
        var windowParams = "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400",
            url = 'http://www.bbc.co.uk/radio/player/' + this._params.availableStations[0].listenUrl;

        window.open(url, windowParams);

    },

    /**
     * Inserts content 
     * @param {String} html
     */
    insertContent: function(html){
        
        document.getElementById('stations_wrapper').innerHTML = html;
        
        return this;

    },

    /**
     * Makes the popup smaller if there are few stations in it
     */
    adjustPopupHeight: function(){
        document.getElementById('container').className += 'few_items';
    },

    /**
     * Shows the scroll arrows
     */
    initScroll: function(){

        document.getElementById('container').className += ' scrollable';

        this
            .findBlocks()
            .bindEvents();

    },

    findBlocks: function(){

        this.upControl = document.getElementById('scroll_down');
        this.downControl = document.getElementById('scroll_up');
        
        this.container = document.getElementById('stations_wrapper');

        return this;

    },

    bindEvents: function(){

        this.upControl.addEventListener('click', this._onArrowClick, false);
        this.downControl.addEventListener('click', this._onArrowClick, false);

        this.container.addEventListener('scroll', this._onScroll, false);

        document.addEventListener('keydown', keyrouter.bindKeys, false);

    },

    _onScroll: function(){
        popup.fadeArrows(this.scrollTop);
    },

    _onArrowClick: function(){

        var direction = this.id === 'scroll_up'
            ? 'up'
            : 'down';

        popup.scroll(direction);

    },   

    /**
     * Makes controls inactive/active depending on the scroll position
     */
    fadeArrows: function(scrollTop){

        var containerHeight = this.container.clientHeight,
            contentHeight = this._params.stationsCount * this._params.itemHeight  + 10,
            maxOffset = contentHeight - containerHeight;

        if (scrollTop === 0) {
            this.downControl.className += ' inactive';
        } else if (scrollTop === maxOffset) {
            this.upControl.className += ' inactive';
        } else {
            this.downControl.className = 'scroll_control';
            this.upControl.className = 'scroll_control';
        }
    
    },

    /**
     * Performs the scroll
     * @param {String} ['up', 'down'] direction
     */
    scroll: function(direction){

        var offset = direction === 'up' 
            ? -this._params.itemHeight
            : this._params.itemHeight;

        this.container.scrollTop += offset; 

    }

}

var keyrouter = {

    bindKeys: function(e) {

        var keyCode = e.keyCode,
            direction;

        if (keyCode === 38)
            direction = 'up';
        else if (keyCode === 40)
            direction = 'down';
        else
            return;

        popup.scroll(direction);

    }    

}

chrome.storage.local.get('stations', function(fetchedData) {
    popup.initialize(fetchedData.stations);
});
