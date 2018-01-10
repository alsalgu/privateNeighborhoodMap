var map;
var infowindow;
var markers = [];
var defLocations = [
    { title: "Ramen Tatsu-Ya", venue: "501831f5e4b06251be422605", location: { lat: 30.361154, lng: -97.71515 } },
    { title: "Michi Ramen", venue: "50f74169e4b08087631dbf2d", location: { lat: 30.333353, lng: -97.721413 } },
    { title: "Daruma Ramen", venue: "515632e9e4b00bf3a21b3bf4", location: { lat: 30.266527, lng: -97.736489 } },
    { title: "Hanabi Ramen", venue: "52c8bebe11d21cada26b2a5e", location: { lat: 30.354803, lng: -97.765086 } },
    { title: "Kanji Ramen", venue: "56f71be8498e940835c43997", location: { lat: 30.431106, lng: -97.712949 } },
    { title: "JINYA Ramen", venue: "5768ca69498e74ee4edf87b9", location: { lat: 30.400302, lng: -97.723252 } }
];



/* Google Maps Stuff */
function initMap() {
    var center = new google.maps.LatLng(30.372921, -97.721386);
    map = new google.maps.Map(document.getElementById("googleMap"), {
        mapTypeId: "roadmap",
        center: center,
        zoom: 12
    });

    infowindow = new google.maps.InfoWindow();

    for (var i = 0; i < defLocations.length; i++) {
        var position = defLocations[i].location;
        var title = defLocations[i].title;
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            text: defLocations[i].venue,
            id: i
        });
        markers.push(marker);
        marker.addListener("click", function() {
            populateInfoWindow(this, infowindow);
            animateMarkers(this);
        });
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function showMarkers() {
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('');
        infowindow.addListener("closeclick", function() {
            infowindow.marker = null;
        });
        var client_secret = "0HW5I3K1UJHUVP2JC0FYWWIF03ZG1NOSCVOAA5XU4MUZ502R";
        var client_id = "DUVIVE2GZV12HUGHAOHVWM4KABWCRQXY10LGQMRNDBNLQFNG";
        var version = "20170801";
        var venueID = marker.text;
        var url = "https://api.foursquare.com/v2/venues/" + venueID + "/?client_secret=" + client_secret + "&client_id=" + client_id + "&v=" + version;

        $.getJSON(url,
            function(data) {
                var currentVenue = data.response.venue;
                var placeName = currentVenue.name;
                var placeAddress = currentVenue.location.formattedAddress;
                var placeType = currentVenue.categories[0].name;
                var placePhoto1 = currentVenue.photos.groups[0].items[0].prefix;
                var placePhoto2 = "300x300"
                var placePhoto3 = currentVenue.photos.groups[0].items[0].suffix;
                infowindow.setContent("<div><strong>" + placeName + "</strong><br>" + placeType + "</div><img src='" + placePhoto1 + placePhoto2 + placePhoto3 + "'> <div>" + placeAddress + "</div>" )
            });

    };
    infowindow.open(map, marker);
}

function animateMarkers(marker) {
    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() { marker.setAnimation(null); }, 1400);
    }
}

function filterMarkers() {
    var filter = this.filter().toLowerCase();
    for (i = 0; i < markers.length; i++) {
        marker = markers[i];
        if (marker.title.toLowerCase().indexOf(filter) !== -1) {
            marker.setVisible(true);
            marker.setAnimation(4);
        } else {
            marker.setVisible(false);
        }
    }
}

function refresh() {
    window.location.reload();
}


function toggleGroup(title) {
    var i;
    for (i = 0; i < markers.length; i++) {
        var marker = markers[i];
        if (marker.title.includes(title)) {
            marker.setVisible(true);
        } else {
            markers[i].setVisible(false);
        }
    }
}


/* KO Bindings */