# egy-media 
EGY MEDIA is a social media app you can use it to add posts and chat with your friend in light mode or dark mode.
I built it with React js and express js and mongo db also i used Mongoose to deal with mongo db and multer to store images  ,
axios for http requests , redux toolkit for state mangement
## Installation

Setup is super easy. Clone the repository - 

```shell script
git clone https://github.com/Abdullah-elhllopy/social_media_api.git
opent folder you cloned it
cd clinet
cd ..
npm i
cd server
npm i
```
Create an ``.env`` file at the root of your project with the following.  
```dotenv
MONGO_URL=YOUR_MONGO_URL
PORT=5000[YOUR_DESIRED_PORT]
NODE_ENV=YOUR_APP_ENVIRONMENT[production/development]
JWT_SECRET=YOUR_JWT_SECRET_STRING
```

## Features

1. **Real time chat with two friends**

1. **Auth with JWT & Db Store**

1. **Async/Await support**

1. **User Module**

1. **Post** (Sample CRUD)

1. **Media Upload**

1. **using redux toolkit for global state mangement**


## Next Features

1. **Real time notifications **

1. **Add comments module**

1. **add react query for app**

1. **sharing files on chat**

1. **make chating group and add friends on this group** 

1. **adding mentions on commentd**


## Directory Structure of the Backend
```
├─ .env
├─ .gitignore
├─ index.js
├─ package.json
├─ public
├─ controllers
  │  ├─ AuthController.js
  │  ├─ MediaController.js
  │  └─ PostController.js
├─ models
  │  ├─ Post.js
  │  ├─ Chat.js
  │  ├─ ChatMessage.js
  │  └─ User.js
├─ routes
  │  ├─ auth.js
  │  ├─ media.js
  │  └─ post.js
  │  └─ user.js
└─ middleware
     ├─ auth.js
```

## Directory Structure of the Frontend
```
├─ .index.js
├─ .app.js
├─ router.js
├─ package.json
├─ theme.js
├─ index,css
├─ public
└─ src
  ├─ components
  │  ├─ FlexBetween.js
  │  ├─ Friend.js
  │  └─ Layout.js
  │  └─ Message.js
  │  └─ TextInput.js
  │  └─ UserImage.js
  │  └─ UsersList.js
  │  └─ WidgetWrapper.js
  ├─ screens
  │  ├─ chat
  │  ├─ home
  │  ├─ login
  │  └─ profile
  │  └─ register
  ├─ servers
  │  ├─ API.js
  └─ state
     ├─ index.js
  └─ widgets
     ├─ AdvertWidget.js
     ├─ ChatList.js
     ├─ FriendListWidget.js
     └─ Messages.js
     └─ MyPostWidget.js
     └─ PostsWidget.js
     └─ PostWidget.js
     └─ UserWidget.js
```

 ![Screenshot 2023-06-09 205735](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/412fd98b-fc57-4d4f-8640-70a080b9879a)
![light chat](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/32a25c65-7064-4156-bfc5-acab014078ce)

 ![Screenshot 2023-06-09 205707](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/8b4a352e-14b6-4d28-83b0-95ae6358d5fe)

  ![Screenshot 2023-06-09 205806](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/0cfd9bb4-9d43-40f4-aa42-acb47af68614)

  
  ![Screenshot 2023-06-09 210702](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/03d9aaef-01e4-4b9e-af9c-627792b725b3)![light mode](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/c0a0a4fc-bcd1-4816-89a7-861602b1d195)


  
