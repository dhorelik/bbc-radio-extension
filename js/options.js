var options = {

    initialize: function(){

        var content = '';

        for (var i = 0, l = this._stations.length; i < l; i++) {
            content += this.itemConstructor(this._stations[i]);
        }     

        this
            .insertContent(content)
            .bindCheck();

    },

    /**
     * Builds the html code for the item based on its data
     */
    itemConstructor: function(params){

        var title = params.title, 
            identifier = params.identifier,
            isChecked = params.active ? 'checked' : '',
            isHighlighted = params.active ? ' highlighted' : '',
            item = [
                '<li class="' + identifier + isHighlighted +'">',
                '<input type="checkbox" name="station" id="' + identifier + '" value="' + identifier + '" ' + isChecked + '>',
                '<label for="' + identifier + '">' + title + '</label>',
                '</li>'
            ].join('\n');

        return item;

    },

    insertContent: function(html){
        
        document.getElementById('stations_wrapper').innerHTML = html;

        return this;
    
    },

    /**
     * Sets event listeners for checkboxes
     */
    bindCheck: function(){

        var checkboxes = document.getElementsByTagName('input');

        for (var i = 0, l = checkboxes.length; i < l; i++){
            checkboxes[i].addEventListener('change', this.updateActiveList.bind(this), false);
        }

    },

    /**
     * Updates the list of active station in localStorage
     */
    updateActiveList: function(e) {

        var target = e.srcElement,
            id = target.id,
            status = target.checked;
                    
        for (var i = 0, l = options._stations.length; i < l; i++) {
            if (this._stations[i].identifier === id) {
                this._stations[i].active = status;
                break;    
            }
        }

        this.highlightItem(status, target.parentNode);

        chrome.storage.local.set({'stations': this._stations});

    },

    /**
     * Toggles class name responsible for selected items styling
     */
    highlightItem: function(status, parentNode) {

        status
            ? parentNode.className += ' highlighted'
            : parentNode.className = parentNode.className.replace(/(?:^|\s)highlighted(?!\S)/, '');

    }
        
}

chrome.storage.local.get('stations', function(fetchedData) {
    options._stations = fetchedData.stations;
    options.initialize();
});
