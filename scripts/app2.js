/* Global Variables */
var map;
var infowindow;
var markers = [];
/* Location: {title: -blank-, venue: -blank-, location: {lat: -blank-, lng: -blank-}, id: -blank-}*/
var defLocations = [{
    title: 'Ramen Tatsu-Ya',
    venue: '501831f5e4b06251be422605',
    location: {
      lat: 30.361154,
      lng: -97.71515,
    },
  },
  {
    title: 'Michi Ramen',
    venue: '50f74169e4b08087631dbf2d',
    location: {
      lat: 30.333353,
      lng: -97.721413,
    },
  },
  {
    title: 'Daruma Ramen',
    venue: '515632e9e4b00bf3a21b3bf4',
    location: {
      lat: 30.266527,
      lng: -97.736489,
    },
  },
  {
    title: 'Hanabi Ramen',
    venue: '52c8bebe11d21cada26b2a5e',
    location: {
      lat: 30.354803,
      lng: -97.765086,
    },
  },
  {
    title: 'Kanji Ramen',
    venue: '56f71be8498e940835c43997',
    location: {
      lat: 30.431106,
      lng: -97.712949,
    },
  },
  {
    title: 'JINYA Ramen',
    venue: '5768ca69498e74ee4edf87b9',
    location: {
      lat: 30.400302,
      lng: -97.723252,
    },
  },
];

/* Foursquare JSON Feed */

function searchNearby() {
  var CLIENT_SECRET = '0HW5I3K1UJHUVP2JC0FYWWIF03ZG1NOSCVOAA5XU4MUZ502R';
  var CLIENT_ID = 'DUVIVE2GZV12HUGHAOHVWM4KABWCRQXY10LGQMRNDBNLQFNG';
  var version = '20170801';
  var searchURL = 'https://api.foursquare.com/v2/venues/search?client_secret=' + CLIENT_SECRET + '&client_id=' + CLIENT_ID + '&v=' + version + '&ll=' + '30.372921, -97.721386' + '&query=ramen';

  $.getJSON(searchURL, function (result) {
    var venuesList = result.response.venues;
    $.each(venuesList, function (i, val) {
      defLocations.push({
        title: this.name,
        location: {
          lat: this.location.lat,
          lng: this.location.lng,
        },
        venue: this.id,
      });
    });
  });
}

/* Google Maps Functionality */

function initMap() {
  var center = new google.maps.LatLng(30.372921, -97.721386);
  map = new google.maps.Map(document.getElementById('googleMap'), {
    mapTypeId: 'roadmap',
    center: center,
    zoom: 12,
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
      id: i,
    });
    markers.push(marker);
    marker.addListener('click', function() {
      populateInfoWindow(this, infowindow);
      animateMarkers(this);
    });

    markers[i].setMap(map);
  }
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function showMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function populateInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('');
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });

    var CLIENT_SECRET = '0HW5I3K1UJHUVP2JC0FYWWIF03ZG1NOSCVOAA5XU4MUZ502R';
    var CLIENT_ID = 'DUVIVE2GZV12HUGHAOHVWM4KABWCRQXY10LGQMRNDBNLQFNG';
    var version = '20170801';
    var venueID = marker.text;
    var url = 'https://api.foursquare.com/v2/venues/' + venueID + '/?client_secret=' + CLIENT_SECRET + '&client_id=' + CLIENT_ID + '&v=' + version;

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        var currentVenue = data.response.venue;
        var placeName = currentVenue.name;
        infowindow.setContent(placeName);
      },

      error: function(data) {
        alert('ERROR: Unable to retrieve details from Foursquare - ' + data.status);
      },
    });

  }

  infowindow.open(map, marker);
}

function animateMarkers(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 1400);
  }
}

function refresh() {
  window.location.reload();
}

function gm_authFailure() {
  alert('The Key is Wrong, Buddy.');
}

function mapError() {
  alert('Failed to Load Google Maps Script!');
}


/* Knockout */

function Shop(title, venue, location, id) {
  this.title = ko.observable(title);
  this.venue = ko.observable(venue);
  this.location = ko.observable(location);
}

var ViewModel = function(data) {
  var self = this;
  self.filter = ko.observable('');
  self.clickShop = ko.observable('');
  self.shops = data.shops;
  self.filteredItems = ko.dependentObservable(function() {
    var filter = self.filter().toLowerCase();
    if (!filter) {
      for (var i = 0; i < markers.length; i++) {
        marker = markers[i];
        marker.setVisible(true);
      }
      return self.shops();
    } else {
      for (var i = 0; i < markers.length; i++) {
        marker = markers[i];
        if (marker.title.toLowerCase().indexOf(filter) !== -1) {
          marker.setVisible(true);
          marker.setAnimation(4);
        } else {
          marker.setVisible(false);
        }
      }
      return ko.utils.arrayFilter(self.shops(), function(Shop) {
        return Shop.title().toLowerCase().indexOf(filter) !== -1;
      });
    }
  }, ViewModel);

  self.toggle = function(location) {
    markers.forEach(function(marker) {
      if (marker.title == location.title()) {
        google.maps.event.trigger(marker, 'click');
      }
    });
  };
};

/* Getting raw location data into Knockout Observables */

var initialData = {
  shops: ko.observableArray([]),
};

var mappedData = ko.utils.arrayMap(defLocations, function(shop) {
  return new Shop(shop.title, shop.venue, shop.location);
});

initialData.shops(mappedData);

/* Executing KO */

ko.applyBindings(new ViewModel(initialData));
