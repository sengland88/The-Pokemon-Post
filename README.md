<h2>Project Name</h2>
<hr>
The Pokemon Post

<h2>Concept</h2>
<hr>
A node.js web application that leverages axios, cherrio, express, express-handlebars to web scrape the lastest Pokemon news and then store it in a MongoDB database.

<h2>Project Overview</h2>
<hr>
Utilizing node.js, as well as express.js, this web scrapper application collects information from PokemonHub.com and displays it to users, giving them the ability to save articles, read the full article (on the PokemonHub site), and create and save notes for articles.

<h2>Languages and Libraries Used</h2>
<hr>

- HTML
- CSS
- Bootstrap
- JavaScript
- JQuery
- Node.js
- Express.js
- Express-Handlebars
- MongoDB
- Mongoose
- Cherrio
- Axios

<h2>Process</h2>

Using node.js and express.js, I created a server, which is connected to MongoDB via mongoose. When the user hits the home route, a page, which is created via express-handlebars, is displayed and explains what the application is. When the user clicks on the "fetch" button, an axios call is made to pokemonhub.com, and then using Cherrio, the application scrapes article titles, summaries (which I call blurbs) and URL.

All the scrapped content is then processed into MongoDB via mongoose. Two collections are created, one to store article content, such as title, blurb, URL, in addition to a second collection that is used to store the user's comments, (if they choose to add any). 

Once the page (document) is ready, the data is processed via a function, which dynamically created HTML elements and appends them to the page. These dynamically-created elements allows for the user to save the article to the database, create a note (to store their thought) or read the full article on Pokemonhub.com.

When the user chooses to save an article, a boolean statement is switched from FALSE to TRUE.

When a user chooses to create a note, a dyamincally created modal is displayed that serves the user with the title, the summary and URL, as well as a space to add their thoughts. When the user clicks "submit" the user's input is collected and stored in the Notes collection.

<h2>URL</h2>
http://bit.ly/2vcLpup
