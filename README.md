# Ollie The Spot

## Description

The project is about creating a platform for skate lovers like you! so you can discover, save, review & create new skate spots around you. Your city will become the greatest skatepark!
 

## Backlog

List of other features outside of the MVPs scope

User profile:

- see my favorites spots
- see my reviews
- upload profile image from your device
- list of my favorite spots 
- list of people in the spot
- see other peoples profile

Geo Location:

- add geolocation when creating a new spot 
- show spots in a map
- find my location

Homepage

- show a map of spots locations
- search bar of locations

Spots:

- tags
- show in details the location of the spot in a map
- show reviews
- upload image

## ROUTES:
|Route|HTTP Verb | Description|
|---|---|---|
|/|GET|renders the homepage|
|/auth|GET|redirects to /spots if user logged in <br> renders the signup / login form (with flash msg)|
|/auth/signup|POST|redirects to / if user logged in <br> body:  <br>- username  <br>- email <br>-  password <br> redirects to / if user logged in <br>renders the login form (with flash msg)|
|/auth/login|POST|redirects to / if user logged in <br>body: <br>- username <br>- password|
|/auth/logout|POST|body: (empty)|
|/spots|GET|renders the spots list|
|/spots/:id|GET|renders the spot detail page|
|/spots/create|POST| body: <br>- name <br>- location <br>- description <br>- submit <br>- renders a message on /spots with flash (success creating) <br>- redirects to /spots|
|/profile|GET|renders user profile by id <br> renders profile edit button <br> redirects to /user/:id/edit if edit|
|/profile/edit|GET|renders form with details to edit|
|/profile|POST|updates user details <br> redirect /user/:id|

## Models

User model
 
```
username: String
password: String
email: String
image: string(url)
bio: String

```

Spots model

```

owner: ObjectId<User>
name: String
description: String
image: String(url)
location: String

``` 
## Views
font: montserrat
colors:#dd2f44, #505258, #efe9e7
## Links

### Trello

[Link to the trello board](https://trello.com/b/LboMjM8l/project-module-2)

[Link to the Github repo](https://github.com/meta103/OllieTheSpot)
