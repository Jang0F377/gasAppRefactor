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
  I also used Firebase Firestore as a backend to store data. 
  
  
# Hurdles Overcome
  * Understanding how to represent and manage state for the timer as well as the number of teams and their individual scores.
  * Learning how flex works in React-Native and using it to position or justify components.
  * Implementing the coundown circle timer.
  

