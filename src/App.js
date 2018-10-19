import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import escapeRegExp from 'escape-string-regexp';
import MenuComponent from './MenuComponent';
import SearchBar from './SearchBar';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';


class App extends Component {
    constructor(props){
        super(props)
        this.state={
            venues:[],
            markers:[],
            query:'',
            showVenues: [],
            notVisibleMarkers: []

        }
    }


    componentDidMount(){
        this.getVenues();
    }

    renderMap = () =>{
        const script = window.document.createElement("script");
        const index= window.document.getElementsByTagName("script")[0];
        script.src= "https://maps.googleapis.com/maps/api/js?key=AIzaSyDOEghPimL7ftTmRX_uOjqRKopBNQeQbp0&callback=initMap";
        script.async= true;
        script.defer = true;
        index.parentNode.insertBefore(script, index)
        script.onError = function(){
            alert("You have a loading problem with your map. Check your key!! ")
        };
        window.initMap= this.initMap
    };

    getVenues = () =>{
        const endPoint = "https://api.foursquare.com/v2/venues/explore?";
        const parameters ={
            client_id:"PWLTFHBELITVWMRJ51WX2WWYHHW012PH0QHGLLF2BDZLPRNS",
            client_secret:"MDKWA25TEHXVRQQQG4HFOYU4RW3IJSVDAM1PJOVZTW1WVG5Q",
            query:"Church",
            near:"Twin Falls ID",
            limit: 10,
            ll: "42.562786,  -114.4605031",
            v:"20181011"
        };
        axios.get(endPoint + new URLSearchParams(parameters))
            .then(response => {
                this.setState({
                    venues:response.data.response.groups[0].items,
                    showVenues: response.data.response.groups[0].items
                }, this.renderMap())
            })
            .catch(error=>{
                console.log("Problem with the data from FourSquare API. The error might be " + error);
        })

    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 42.562786, lng: -114.4605031},
            zoom: 14
        });

        const infowindow = new window.google.maps.InfoWindow( {maxWidth:200});
        this.infowindow = infowindow;


        this.state.venues.forEach(myVenue => {
            const contentString = (`
                <h2>${myVenue.venue.name}</h2>
                <h3>Type: ${myVenue.venue.categories[0].shortName}</h3>
                <p>Address:${myVenue.venue.location.formattedAddress[0]}
                            ${myVenue.venue.location.formattedAddress[1]} 
                </p>`);
            const marker = new window.google.maps.Marker({
                position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
                map: map,
                title:myVenue.venue.name,
                id: myVenue.venue.id,
                animation: window.google.maps.Animation.DROP,
            });
            this.state.markers.push(marker);

            marker.addListener('click', function() {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            });
            map.addListener('click', function(){
                marker.setAnimation(null);
                infowindow.close(map, marker)
            })
        })



    };
    /*
   * Handling the query update i.e. when the user uses the filter option
  */
    updateQuery = query => {
        this.setState({ query })
        this.state.markers.map(marker => marker.setVisible(true))
        let filterVenues
        let notVisibleMarkers

        if (query) {
            const match = new RegExp(escapeRegExp(query), "i")
            filterVenues = this.state.venues.filter(myVenue =>
                match.test(myVenue.venue.name)
            )
            this.setState({ venues: filterVenues })
            notVisibleMarkers = this.state.markers.filter(marker =>
                filterVenues.every(myVenue => myVenue.venue.name !== marker.title)
            )

            /*
             * Hiding the markers for venues not included in the filtered venues
            */
            notVisibleMarkers.forEach(marker => marker.setVisible(false))

            this.setState({ notVisibleMarkers })
        } else {
            this.setState({ venues: this.state.showVenues })
            this.state.markers.forEach(marker => marker.setVisible(true))
        }
    }



    render() {
        if (this.state.hasError) {
            return <div id="Error-message" aria-label="Error message">Sorry, something went wrong!</div>
        } else {
            return (
                <main>
                    <ErrorBoundary>
                        <div id="header" aria-label="Header">
                            <Header/>
                        </div>
                        <div className="sideBar">
                            <SearchBar
                                venues={this.state.showVenues}
                                markers={this.state.markers}
                                filteredVenues={this.filteredVenues}
                                query={this.state.query}
                                clearQuery={this.clearQuery}
                                updateQuery={b => this.updateQuery(b)}
                                clickLocation={this.clickLocation}

                            />

                        </div>
                        <div id="container" aria-label="Menu Container">
                            <MenuComponent
                                venues={this.state.venues}
                                markers={this.state.markers}
                            />
                        </div>

                        <div id="map" aria-label="Map" role="application"></div>
                    </ErrorBoundary>
                </main>
            );
        }
    }
}



export default App;

