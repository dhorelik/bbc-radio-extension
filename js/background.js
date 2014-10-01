chrome.runtime.onInstalled.addListener(function(details){

    if (details.reason === 'chrome_update')
        return;

    var stations = [
        {
            title: 'Radio 1',
            identifier: 'radio_one',
            listenUrl: 'bbc_radio_one',
            openUrl: 'radio1'
        },
        {
            title: 'Radio 1Xtra',
            identifier: 'radio_one_extra',
            listenUrl: 'bbc_1xtra',
            openUrl: '1xtra'
        },
        {
            title: 'Radio 2',
            identifier: 'radio_two',
            listenUrl: 'bbc_radio_two',
            openUrl: 'radio2'
        },
        {
            title: 'Radio 3',
            identifier: 'radio_three',
            listenUrl: 'bbc_radio_three',
            openUrl: 'radio3'
        },
        {
            title: 'Radio 4',
            identifier: 'radio_four',
            listenUrl: 'bbc_radio_four',
            openUrl: 'radio4'
        },
        {
            title: 'Radio 4 extra',
            identifier: 'radio_four_extra',
            listenUrl: 'bbc_radio_four_extra',
            openUrl: 'radio4extra'
        },
        {
            title: 'Radio 5 live',
            identifier: 'radio_five',
            listenUrl: 'bbc_radio_five_live',
            openUrl: '5live'
        },
        {
            title: 'Radio 5 live sports extra',
            identifier: 'radio_five_sports',
            listenUrl: 'bbc_radio_five_live_sports_extra',
            openUrl: '5livesportsextra'
        },
        {
            title: 'Radio 6 music',
            identifier: 'radio_six_music',
            listenUrl: 'bbc_6music',
            openUrl: '6music'
        },
        {
            title: 'Asian Network',
            identifier: 'asian_network',
            listenUrl: 'bbc_asian_network',
            openUrl: 'asiannetwork'
        },
        {
            title: 'World Service',
            identifier: 'world_service',
            listenUrl: 'bbc_world_service',
            openUrl: 'worldserviceradio'
        },
        {
            title: 'Radio Scotland',
            identifier: 'radio_scotland',
            listenUrl: 'bbc_radio_scotland',
            openUrl: 'radioscotland'
        },
        {
            title: 'Radio Nan Gaidheal',
            identifier: 'radio_nan_gaidheal',
            listenUrl: 'bbc_radio_nan_gaidheal',
            openUrl: 'radionangaidheal'
        },
        {
            title: 'Radio Ulster',
            identifier: 'radio_ulster',
            listenUrl: 'bbc_radio_ulster',
            openUrl: 'radioulster'
        },
        {
            title: 'Radio Foyle',
            identifier: 'radio_foyle',
            listenUrl: 'bbc_radio_foyle',
            openUrl: 'radiofoyle'
        },
        {
            title: 'Radio Wales',
            identifier: 'radio_wales',
            listenUrl: 'bbc_radio_wales',
            openUrl: 'radiowales'
        },
        {
            title: 'Radio Cymru',
            identifier: 'radio_cymru',
            listenUrl: 'bbc_radio_cymru',
            openUrl: 'radiocymru'
        }
    ];

    // all stations are available on install
    for (var i = 0, l = stations.length; i < l; i++) {
        stations[i].active = true;
    }

    chrome.storage.local.set({'stations': stations}, function(){
        chrome.tabs.create({url: "options.html"});
    });

});
