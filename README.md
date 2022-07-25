# Miles-till-Empty Accuracy Tracker
  React Native application I built because I drive a lot, mainly between Vegas and Southern California, and having taken different cars over the years,
  its always interested me how even though the miles I'm driving dont change (its the same distance regardless of car driving to where I stay), 
  the gauges that read Miles-till-Empty can be radically different, also how some cars Miles-till-Empty reading can change in between turning off 
  the engine and starting it again. I understand that there are other factors that come into play when driving such as car load, headwind/tailwind, mph, etc.
  This is was to quench my curiosity of "how accurate is my car's gauge, do I typically get more miles than it estimates? Less, how much less?
  
# Flow of the App
  The app will ask you to login or register. Upon registering, it will take you to your home page where it will tell you to add new fills to see
  them populate on the screen. You can begin by pressing either the image or the plus in the top right to start, upon which a modal explaining that 
  this app is purely personal use not scientific or meant to give you any vital info about your car and will ultimately ask you to enter your
  starting odometer. The modal will hide, showing the inital "fill" screen where you can add the type of gas and what you Miles-to-empty reading
  shows once you've filled up your tank. Your good to go. Come back when you fill up again and enter the ending odometer and what your 
  Mile-to-empty reading shows and finish the "fill." Your first fill is finished! It should show in the home screen now (you may have to swipe down 
  to refresh).

# Technologies used:
 * React-Native
 * Redux Toolkit
 * React-navigation
 * Tailwind React Native Classnames (twrnc)
 * Firebase - Auth & Firestore
 * React Native Modal
 * React Native Elements
  
 
# What did I learn
  This was a personal project as mentioned above, to quench my curiosity about the accuracy of my cars Miles-till-Empty reading. This was
  the first time I used firebase in a JavaScript app, other experience was with Kotlin. I used Firebase for Auth on the Login/Register screens.
  I also used Firebase Firestore as a backend to store data so I learned about Firestore, docs, & collections and how to write to and query them.
  It was fun to bring this project to life, it is still a work in progress, working on adding better UX tracking loading states and also finishing
  the Account Details Screen. 
  
  
# Hurdles Overcome
  * Implemented KeyboardAvoidingView as well as adding an empty View with a height of 125 px to add some extra padding at the bottom for better UX
  * Learning how flex works in React-Native and using it to position or justify components and children.
  * Sending & querying data from Firestore, understanding that when referencing a doc there should be an even number of path segments & 
  when referencing a collection there will be odd.
  
## Video was too large to post here so here are pictures of each screen going through the process of a "Fill"

<p align="center" width="100%">
    <img width="32%" src="https://user-images.githubusercontent.com/51846919/180885754-90b6052a-903c-405d-8b72-a2463a751c39.PNG">
    <img width="32%" src="https://user-images.githubusercontent.com/51846919/180886211-78c54b57-24b5-444e-a2e6-44f32b106773.PNG">
    <img width="32%" src="https://user-images.githubusercontent.com/51846919/180886243-ece5623f-156b-4996-9389-0eea99eb6b04.PNG">
</p>

<p align="center" width="100%">
    <img width="32%" src="https://user-images.githubusercontent.com/51846919/180886314-42d7dfbf-9ca4-49e6-9e33-214cfe54fba7.PNG">
    <img width="32%" src="https://user-images.githubusercontent.com/51846919/180886322-1e9994cc-8a06-4e01-a320-c01240f5703c.PNG">
    <img width="32%" src="https://user-images.githubusercontent.com/51846919/180886398-d7a90009-5b26-41d3-813f-87359b0f5483.PNG">
</p>

<p align="center" width="100%">
    <img width="49%" src="https://user-images.githubusercontent.com/51846919/180886491-b2e7d202-49ec-4026-8265-3e71f31b89cf.PNG">
    <img width="49%" src="https://user-images.githubusercontent.com/51846919/180886496-722a32b8-23a7-4886-a9f3-0d45e900662a.PNG">
</p>
