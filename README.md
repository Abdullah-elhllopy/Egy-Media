# egy-media 
EGY MEDIA is a social media app you can use it to add posts and chat with your friend in light mode or dark mode.
I built it with React js and express js and mongo db also i used Mongoose to deal with mongo db and multer to store images  ,
axios for http requests , redux toolkit for state mangement

how setup this project 
  1 . git clone https://github.com/Abdullah-elhllopy/social_media_api.git
  2 . opent folder you cloned it 
  3 . cd clinet  
  4 . npm i 
  5 . cd ..
  6 . cd server 
  7 . npm i 
  make sure you have link for mongo db cloud on .env file 


the file structure of frontend is : 
  route : contain all routes for pages and it use lazy component from react to import page when use it 
  Screens : conatins all pages in pages which used in routes like login , register and home , chat , profile
  Wedgets : it's sub screen which called on screen  
  Components : any code repeated on app 
  Api : i used axios to make global export API for handling http request by using axios.create
 the file structure of backend is :![Screenshot 2023-06-09 205735](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/412fd98b-fc57-4d4f-8640-70a080b9879a)
![light chat](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/32a25c65-7064-4156-bfc5-acab014078ce)

  Controllers
  Routes 
  Models![Screenshot 2023-06-09 205707](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/8b4a352e-14b6-4d28-83b0-95ae6358d5fe)

  ![Screenshot 2023-06-09 205806](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/0cfd9bb4-9d43-40f4-aa42-acb47af68614)

  
  ![Screenshot 2023-06-09 210702](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/03d9aaef-01e4-4b9e-af9c-627792b725b3)![light mode](https://github.com/Abdullah-elhllopy/egy-media/assets/60758904/c0a0a4fc-bcd1-4816-89a7-861602b1d195)


  
