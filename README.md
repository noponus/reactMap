Neighborhood Map Project

Table of Contents
	(1)Introduction
	(2) Project goal
	(3) How to run the project
	(4) How to run production build 
	(5) APIs Used
	(6) Future plans

Introduction
	This is an application that listed churches in my town, Twin Falls Idaho US. I want people that comes into the town to be able to locate church near them. This application is not intended to replace googlee, Google API was used as the backbone. When the project is completed, the images of the church and a short video will be displayed (still developing)

Project goal/ focus
	This project utilize React app, Google API and Foursquare API to access the map, and the location informations.

How to run the project
	Download or clone the repository using :
		$ git clone https://github.com/noponus/reactMap

	 install project dependencies listed below
		 npm install axios 
		 npm install react-burger-menu
		 npm install escape-string-regexp

	Once everything is completed, you can tart the development server with
    npm run start
	This will open http://localhost:3000 to view it in the browser.

How to run production build 
	The service worker is implemented only in the production build. To view the app with service worker:
		npm install -g serve
		npm run build
		serve -s build
		This will open http://localhost:5000 to view it in the browser.
APIs used
	Google Maps API for the map.
	Places API by FourSquare to access the location infrmation

Help recieved
	Udacity | Neighborhood Map - Project Explained by Yahya Elharony.
	Project 7 slack community
	Stackoverflow 
Future plans
	I want to be able to ask user to put in thier address and then give them distance to the churches
	I want to have custom picture and welcome vedio of each of the churches listed by the size of the app
	I want to use more API to get historical information about the churches
	