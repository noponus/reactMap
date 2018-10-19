import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';


class MenuComponent extends Component {


    /*
     openInfo: is called when a list item is clicked(or marker is clicked) to open the infowindow
     depending on the id so if there are 2 venues with the same name it won't mistake and open
     one instead of the other
    */
    openInfo = locationName => {
        // eslint-disable-next-line
        this.props.markers.map(marker => {
            if (marker.title === locationName) {
                window.google.maps.event.trigger(marker, "click")
            }
        })
    }


    render () {
        return (

            <Menu width={ '25%'} isOpen noOverlay >
                <div className="theList" aria-label="List of Venues">

                    {this.props.venues.map(myVenue => (
                        <ul className= "theList" key={myVenue.venue.id} >
                        <li role="menuitem"
                            onClick={() => {
                                this.openInfo(myVenue.venue.name);
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
                        </ul>
                    ))}



                </div>
            </Menu>
        );
    }
}

export default MenuComponent