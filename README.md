<div align="center">
	<h1>Super Blog</h1>
  <a href="https://github.com/AuroPick/blog/blob/master/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/AuroPick/blog"></a>
  <a href="https://aykut-blog.herokuapp.com"><img alt="Website" src="https://img.shields.io/website?logo=Heroku&url=http%3A%2F%2Faykut-blog.herokuapp.com"></a>
  </br>
  </br>
	<p><b>Simple MERN Stack Blog App</b></p>
</div>

## Registration and Standard User
![Registration and Standard User](https://user-images.githubusercontent.com/53499802/111206407-5d9e8780-85d9-11eb-8611-3fa99db1eac0.gif)

## Writer User
![Wirter User](https://user-images.githubusercontent.com/53499802/111207084-3f855700-85da-11eb-9e9a-4fd25f1c6911.gif)

## Admin User
![Admin User](https://user-images.githubusercontent.com/53499802/111207403-a276ee00-85da-11eb-8c5e-84c45e71c8b9.gif)

## Features
:heavy_check_mark: User authentication  
:heavy_check_mark: See posts   
:heavy_check_mark: See special posts (Only authenticated user)  
:heavy_check_mark: Create post (Only admins and writers)  
:heavy_check_mark: Edit or delete posts (Only admins)  
:heavy_check_mark: See users (Only admins)  
:large_blue_circle: Real-time update  
:large_blue_circle: Open graph  
:large_blue_circle: Commenting on posts  

## Stack
- MongoDB [:link:](https://www.mongodb.com)  
- Express [:link:](https://expressjs.com)  
- React [:link:](https://reactjs.org)  
- NodeJS [:link:](https://nodejs.org/en/)
- React Router [:link:](https://reactrouter.com)
- Material UI [:link:](https://material-ui.com)
- Mongoose [:link:](https://mongoosejs.com)
- Bcrypt [:link:](https://github.com/kelektiv/node.bcrypt.js)
- Passport [:link:](http://www.passportjs.org)
- jsonwebtoken [:link:](https://github.com/auth0/node-jsonwebtoken)

## Installation

1. Install [NodeJS](https://nodejs.org/en/)

2. [Clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this repo or [download](https://github.com/AuroPick/blog/archive/main.zip) it

3. Use .env.sample files to create .env files

4. Install dependencies (run this in the root of the project)
  ```bash
  cd server && npm i && cd .. && cd client && npm i && cd ..
  ```
5. Start server and client (run this in the root of the project)
  ```bash
  start npm start --prefix server && start npm start --prefix client
  ```
