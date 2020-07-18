# Aurora GEM Tool
![Logo](https://github.com/JerettLatimer/Aurora/blob/master/DemoImages/GEM.png)

## Description
The GEM tool is a proof-of-concept web application that utilizes a custom ASP.NET Web API for database querying, MongoDB for geodata storage, and Microsoft Azure Clouse App Services to host the application. It's main function is to allow users to subscribe to recieve notificaitons based on changes that occur in the geodata produced by Cisco Grid Routers or CGRs. Users assign themselves to **Subscription Group** then create a **Task**, detailing the fields they wish to monitor. When the monitored field's data changes, an email notification is set out instantly to the subscribed group of users.

GEM was developed as a Senior Capstone project by a team of four using a Scrum development framework.

**My major contributions include the following:** 
* Web API Development and Integration (C#)
* Front End Development (HTML/CSS/JavaScript/JQuery)
* Back End Development (C#)
* SRS Documentation

### Link to Live Site:

https://aurora-microservices-gem.azurewebsites.net/

#### Example Run:

* Home Page:
>![HomeImage](https://github.com/JerettLatimer/Aurora/blob/master/DemoImages/HomePage.png)

* User navigates to the Task page. Here they create a Task, selecting the Subscription Group to be notified and the fields to be monitored for changes.
>![TaskImage](https://github.com/JerettLatimer/Aurora/blob/master/DemoImages/Task.png)

* User then navigates to the Subscirption Page. Here they select a Subscription Group to be a part of and enter their name and email address.
>![SubImage](https://github.com/JerettLatimer/Aurora/blob/master/DemoImages/Subscription.png)

* The user is now registered for notifications. Once a change occurs in the status field, all users in the subscribed groups will recieve an email notification.

**Email Notificaiton:**
>![Email Image](https://github.com/JerettLatimer/Aurora/blob/master/DemoImages/Email.png)

**Live Map:**
>![Email Image](https://github.com/JerettLatimer/Aurora/blob/master/DemoImages/LiveMap.png)
