var popup = {

    _params: {
        stationsCount: 0,
        itemHeight: 72
    },

    /**
     * Checks whether scroll or popup resize is required based on the number of items  
     * and calls the corresponding functions
     */
    initialize: function(availableStations){

        var content = '';

        for (var i = 0, l = availableStations.length; i < l; i++) {
            if (availableStations[i].active) {
                content += this.itemConstructor(availableStations[i]);
                this._params.stationsCount++;
            }
        }     

        this.insertContent(content); 

        this._params.stationsCount <= 7
            ? this.adjustPopupHeight()
            : this.initScroll();

    },

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

    insertContent: function(html){
        document.getElementById('stations_wrapper').innerHTML = html;
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

    /**
     * Finding blocks used for scroll
     */
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
     * makes controls inactive/active depending on the scroll position
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
     * performs the scroll
     *
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
