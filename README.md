
![](https://dl.dropboxusercontent.com/s/f4hg6whc0bhdsiq/emailsomebody.com%3A.jpg?dl=0)
---
# Email Somebody

Email Somebody is a simple service that lets you send emails. Powered by [Mailgun](https://mailgun.com) and [Postmark](https://postmarkapp.com). 

Check it out @ [emailsomebody.com](http://emailsomebody.com).

## Table of Contents 
- [Team Members](#team-members-v-10)
- [Technology Stack, APIs, and Third-party Tools](#technology-stack-apis-and-third-party-tools)
- [Folder and File Structure](#folder-and-file-structure)
- [Development](#development)
  - [Requirements](#requirements)
  - [Installing Dependencies](#installing-dependencies)
  - [Development Servers](#development-servers)
  - [Testing](#testing)
- [Deployment](#deployment)
- [Additional Features and TODOs](#additional-features-and-todos)
- [KQED Notes](#kqed-notes)

## Team Members (v. 1.0)

[![Kevin Nguyen](https://dl.dropboxusercontent.com/s/wyebxbavnc7ihk7/kevinwin.png?dl=0)](https://github.com/kevinwin)

## Technology Stack, APIs, and Third-party Tools
- [React](https://facebook.github.io/react/) for rendering views
- [Node.js](https://nodejs.org/en/) and [Express](http://expressjs.com/)
- [Digital Ocean](https://www.digitalocean.com/) for deployment
- [jQuery](https://jquery.com)
- [Flightplan](https://www.npmjs.com/package/flightplan) for streamlining application deployment

## Folder and File Structure
```
                              +-------------+
                              |emailSomebody|
                              +------+------+
                                     | 
           +-------------------------+-------------------------+
           |                                                   |
           v                                                   v
        +--+---+                                            +--+---+
        |client|                                            |server|
        +--+---+                                            +--+---+
           |                                                   |
           +                                              +----+-----+
           |                                              |          |
           v                                              v          v
    +-+--------+                                       +--+---+    +-+-+
    |components|                                       |static|    |api|
    +-+--------+                                       +--+---+    +-+-+
      |                                                   |          |
      v                                                   v          v
+-----+-----+                                      +------+-----+  +-+---+
|   React   |                                      |    Node    |  | Node|
+-----------+                                      +------------+  +-----+
```
The repo is divided into 2 main folders, `client` and `server`.


`client` is the container for the React view layer and index.html


`server` contains both our static file server and our api


## Development

### Requirements
 - >= Node 4.4.5
 - Developed on Node v. 6.2.0

### Installing Dependencies
 - Run `npm install` from the root directory.
 - Sign up for Mailgun and Postmark accounts.
 - Go to .sample.env, remove dummy values and replace '.sample' to expose environment variables

### Development Servers
 - Run `node server.js` in the api and static folders 

### Testing
 - Run `npm test` in the root folder

## Deployment
See sample.flightplan.js for guidance on how to use Flightplan. Make sure to sub out all the dummy data for your own config values.

Then, run `fly production` to deploy.

NOTE: Any untracked files must be added with `git add <UNTRACKED_FILE>` if you want them to be sent to production

## Additional Features and TODOS
- Setup https on both static and api servers
- Enforce rate limiting to prevent abuse of API
- Use nginx for load balancing, tinier footprint, caching, increased performance
- Form Validation - Prevent submit
- More testing
- Webpack or [concat, minify, purify] build
- PostCSS for modularity and speed over other pre-processors
- Add media queries to make site responsive
- Add service workers for better cache control in event of internet loss
- Email Scheduling / Calendar integration
- React Router for smooth SPA flow
- Redux / Flux architecture for managing state if application grows in complexity
- Linting
- Loading / Progress Bar
- ES6

## KQED Notes
- Description: A full-stack application built to send email.
- UI features:
  - Material Design toasts
  - Fields shift on focus
  - Automatic field focus on page load, auto-clear on successful email submission
- Backend Features:
  - Form processing on api server
  - Internal failsafe with clusters and alternative email service [Postmark]
  - One command deployment using flightplan and upstart [/etc/init]
- Tech Stack Choice:
  - Front-End: [React.JS](https://facebook.github.io/react/) - Used React because it's lightweight, declarative and makes prototyping simple. Tradeoff is that React isn't a framework. It's soley a view layer, not an MVC or MV* framework. When working with data, developers will often use react in conjunction with some way to manage state and make http requests.
  - Back-End: [Node.JS](https://nodejs.org/en/) with [Express.JS](http://expressjs.com/)- Used Node with Express for rapid development of two separate servers running on different ports.  
  A potentially better option could have been nginx for serving up static assets and passing dynamic requests to node.js as the api layer. Nginx can help with caching, providing error pages and rate limiting. Primary advantage of Node/Express backend is simplicity, reduced context switching for developers and built in clustering ability which does a good-enough job and allows for scaling. Note: The API in this case does not respond like a normal RESTful API. Instead it acts as a proxy for Mailgun and Postmark.
- Note on Tests: Much time was spent on experimenting with https in production environments and navigating the fun, strange world of deployment. The test presented in the test folder isn't representative of what should be tested but offers a starting place for testing.
- [Linkedin](https://www.linkedin.com/in/kevinhungnguyen)
- [Resume](https://kevinwin.com/resume)
- Hosted Application: [Email Somebody](http://emailsomebody.com) (deployed on Digital Ocean)



## License
MIT
