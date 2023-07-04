

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
<!--   <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0; -->
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
<!--   <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/{{YOUR_GITHUB_USERNAME}}" target="_blank">Author</a> -->
</p>

<br>

## :dart: About ##
The Options Chain tool is a web application designed to display and analyze options data for various financial instruments. It provides users with a comprehensive view of option contracts available for a specific underlying asset, allowing them to make informed decisions based on the data presented.

Key Features:

Symbol and Expiry Selection: Users can choose the underlying symbol and expiration date from a dropdown menu. The available options are populated dynamically based on the provided data.

Sorting and Filtering: Users can sort the options table based on different columns such as strike price, LTP, OI, etc. This allows for easy identification of options with specific characteristics. Additionally, filtering options may be provided to narrow down the data based on user preferences.

Real-time Updates: The tool utilizes real-time data updates to provide the latest information on option contracts. This ensures that users have access to the most current data for analysis and decision-making.



## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone [https://github.com/TensaCo](https://github.com/TensaCoder/Options-Chain.git)

# Access
$ cd Options-Chain

# Go into Frontend folder
cd frontend
npm i
npm run start

# Go into Backend folder
cd backend
npm i
node temp.js

# run the feed-player-1.0.jar
java -Ddebug=true -Dspeed="2" -classpath feed-play-1.0.jar hackathon.player.Main dataset.csv 9011



# The frontend server will initialize in the <http://localhost:3000/app/options>
```

