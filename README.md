# Noodle Shops in Austin
---
---
Just a few noodle shops in Austin. Filter them, click on them to see Foursquare info.

---
## Requirements

- [**Foursquare API Key**](https://developer.foursquare.com/): You need a key to the Foursquare API to be able to retrieve the JSON data the app uses. They hand 'em out like candy, so just sign up.
- [**Google Maps API Key**](https://www.python.org/): You also need a google maps API key to be able to use the map feature. They also hand 'em out like candy, so just sign up.

---
### What's In in the Folder

- index.html
    - The single web page needed for everything to come together visually.

- app2.js
    - App.JS holds the code for functionality.

- stylesheet.css
    - The CSS to make the page pretty.
---
### Setting Up
    Find yourself a server to host all these files on, my dude, or you can just open up 'index.html' straight from the folder.
---
### Using the Noodle App

    Open up 'index.html' and click around.

---
### Changing FourSquare and Google Maps API Keys

At the end of the index.html code you will find the following:
```
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyARV76QjC0HDKXP0ru9Ye4kyAH8N5UUEME&callback=initMap" async defer></script>
```
Simply change the code between *key=* and *&callback* to your API key for Google Maps.

The FourSquare API uses a client secret and ID, when you have those: just change them in app2.js
```
        var client_secret = "0HW5I3K1UJHUVP2JC0FYWWIF03ZG1NOSCVOAA5XU4MUZ502R";
        var client_id = "DUVIVE2GZV12HUGHAOHVWM4KABWCRQXY10LGQMRNDBNLQFNG";
```
---

### F.A.Q.
    None as of yet, but you can contact me at [Whatever] At [Whatever] Dot Com for help.

---
### Known Bugs
    None as of yet but you can contact me at [Whatever] At [Whatever] Dot Com and let me know.
---

 
