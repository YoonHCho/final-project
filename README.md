# Travel-Map-Journal
A web application for travel lovers who wants to save the places they've visited:
enter journal entry and upload pictures.

# Why I Built This
I am really bad with directions and Google Maps is my co-pilot whenever I'm in the
driver's seat. I also had a goal of having a world map on a wall, placing a pin
and a picture/postcard to the places that I've visited. Therefore, I thought of
doing it in a digitized way hence coming up with this project.

# Live Demo
[Dokku Deployment](https://travel-map-journal.yoonhc.com/)

# Technologies Used
* UI Framework: **React**
* JavaScript Runtime: **Node.js**
* Server Framework: **Express**
* Database: **PostgreSQL**
* Module Bundler: **Webpack**
* Deployment Platform: **Dokku**
* Languages: **JavaScript (ES6)**, **HTML5**, **CSS3**, **SQL**

# Database Schema
![Database Schema](./server/public/images/schema.png "Database Schema")

# Features
* User can find a place on a map
* User can create a log entry for the place
* User can view saved places on a map
* User can view the log entry information for a place on the map
* User can upload a photograph in their log entry
* User can sign up

# Live Demo
### Search a place
* Once a user inputs a place to search and selects one of the suggestion results,
a marker will appear on the map along with a **SAVE** button on the bottom right.

!!! need to get the demo here !!!

### Save a log
* Click on the **SAVE** button to log an entry: can cancel or confirm to save.

!!! need to get the demo here !!!

### View photos
* Click on one of the saved places, click on **View Photo** to see the photo(s)
uploaded previously. If there is no photo uploaded, modal will show that there
are no photos uploaded.

!!! need to get the demo here !!!

# Feature to be Implemented
* User can sign in
* User can edit a log entry for a place
* User can delete a log entry for a place

# System Requirements
* React (v16.6+)
* Node (v18.2.0+)
* PostgreSQL (v14.3+)
### Other Requirement
* Google API Key

# Getting Started
1. Clone repository.

    ```https://github.com/YoonHCho/final-project.git```

2. Install dependencies in ```package.json``` with npm.

    ```npm install```

3. Create a ```.env``` file from the ```.env.example``` template.

    ```cp .env.example .env```

4. Update the environment variable in the ```.env``` file (replace the the text in brackets( [ ] ) from below example).

    ```DATABASE_URL=postgres://dev:dev@localhost/[nameOfDatabase]?sslmode=disable```

    ```GOOGLE_MAPS_API_KEY=[Google-API-Key-here]```

5. Make Sure that the ```postgresql``` service is running (to check the status replace **start** with **status**, to stop replace **start** with **stop**).

    ```sudo service postgresql start```

6. Create the database (if needed).

    ```createdb nameOfDatabase```

7. Initialize the database (**WARNING!** Make sure you have the right database in the ```DATABASE_URL```).

    ```npm run db:import```

8. Start the application. It should be viewable in your browser at ```http://localhost:3000```.

    ```npm run dev```
