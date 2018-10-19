import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';


class MenuFilter extends Component {

    /*
     openInfo: is called when a list item is clicked(or marker is clicked) to open the infowindow
     depending on the id so if there are 2 venues with the same name it won't mistake and open
     one instead of the other
    */
    openInfo = locationId => {
        this.props.markers.forEach(marker => {
            if (marker.id === locationId) {
                window.google.maps.event.trigger(marker, "click")
            }
        })
    }

    render () {
        return (

            <Menu isOpen noOverlay >
                <p>
                    <i>Sourced from Foursquare</i>
                </p>
                <div className="searchBar" role="application">
                    <input
                        type="text"
                        autoFocus
                        id="theFilter"
                        placeholder="Search for your location"
                        aria-label="Search Church"
                        value={this.props.query}
                        onChange={event => this.props.handleSearch(event.target.value)}
                    />
                </div>
                <div className="theList" aria-label="List of Venues">
                    <ul className="menu-result">
                        {this.props.venues.map(myVenue => (
                            <li role="menuitem"
                                onClick={() => {
                                    this.openInfo(myVenue.venue.id);
                                }}
                                aria-label={myVenue.venue.name}
                                tabIndex="0"
                                id={myVenue.venue.id}
                                key={myVenue.venue.id}
                            >
                                <br/>
                                <b>{myVenue.venue.name}</b>
                                <br/>
                                <i>{myVenue.venue.location.address}</i>
                            </li>
                        ))}
                    </ul>

                </div>
            </Menu>
        );
    }
}

export default MenuFilter