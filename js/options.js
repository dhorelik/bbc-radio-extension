var options = {

    /**
     * TODO везде комменты
     */
    initialize: function(){

        var content = '';

        for (var i = 0, l = this._stations.length; i < l; i++) {
            content += this.itemConstructor(this._stations[i]);
        }     

        this
            .insertContent(content)
            .bindCheck();

    },

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

    bindCheck: function(){

        var checkboxes = document.getElementsByTagName('input');

        for (var i = 0, l = checkboxes.length; i < l; i++){
            checkboxes[i].addEventListener('change', this.updateActiveList, false);
        }

    },

    updateActiveList: function(e) {

        var target = e.srcElement,
            id = target.id,
            status = target.checked;
                    
        for (var i = 0, l = options._stations.length; i < l; i++) {
            if (options._stations[i].identifier === id) {
                options._stations[i].active = status;
                break;    
            }
        }

// todo хрень с this
        options.highlightItem(status, target.parentNode);

        chrome.storage.local.set({'stations': options._stations});

    },

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
