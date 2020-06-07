## Personal ePortfolio System

ePortfolio System is a web-based application for users to create, manage and share their own portfolio. Users can store, edit and share their personal information conveniently and securely (with proper configuation).

Index
-----
* [Availability](#availability)
* [Compatibility](#Compatibility)
* [Highlights](#highlights)
* [Features](#features)
* [Limitations](#limitations)
* [Structure](#structure)
* [Deployment](#deployment)
* [Our Team](#software-project-team-12)
* [Acknowledgements](#acknowledgements)

Availability
------------
The e-portfolio system can be visited on unique URL: https://eport.dev. Due to the enforcement of HSTS, the website only accept HTTPS connection via TLSv1.3. Source code can be visited on Github: https://github.com/KarlChenxf/Personal-eportfolio-system.

Compatibility
--------
* Web Browser<br />
	Chrome: 70+<br />
	Firefox: 63+<br />
	Chromium based edge: any version<br />
	Other chromium based web browser: 70+<br />
* JavaScript must be enabled.

Highlights
----------
* Complete customization for personal portfolio.
* Security data transmission and security profile sharing.
* Easy self deployment/automated deployment.

Features
--------
* A user can have multiple profiles.
* Create new profile from template or plain page.
* Edit any components by user-friendly dialog.
* Arrange layout by simply dragging.
* Text component for showing formated paragraph.
* Picture component for showing images.
* Video component for showing videos given a link to Youtube.
* Avator&Text component allowing you to have an avaster on the left and details on its right.
* SNS component for showing an icon to a Social Media that will automatically change based on the URL given.
* HTML component for advanced user to implement component by raw html code.
* Layout and backgournd is editable for each component or the whole page.
* Share your profile through a secure link.

Limitations
-----------
* All components in a profile scroll with the page. No static component (position: sticky) similar to Findanexpert is supported.
* We are working based on client's requirement and supervisor's advice. Other function are not implemented, for example:<br />
	Limited user management support. Our system is focus on portfolio itself.<br />
	System administration needs to be done outside the website because there is no system administration page.

Structure
---------------
`master` branch contains our documents;<br/>
Code for front end is available in `frontend` branch;<br/>
Code for back end is available in `backend` branch.

Deployment
---------------
For deployment of front end, please refer to [README.md](../frontend/README.md) in frontend branch.

Software Project Team 12
---------------
+ Xuefeng Chen	xuefeng@student.unimelb.edu.au	
+ Yiyang XU	yiyangx2@student.unimelb.edu.au
+ Shang Gao	gasg@student.unimelb.edu.au	
+ Chang Liu	liu.c5@student.unimelb.edu.au	
+ Chuanxi Fu	chuanxif@student.unimelb.edu.au	

Acknowledgements
----------------

Java Springboot (backend)<br />
[ReactJS](https://github.com/facebook/react) (frontend)<br />
For other libraries please refer to README.md in corresponding branch.

