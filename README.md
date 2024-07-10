# Colin-s-Tech-Blog

My full stack tech blog from scratch using the Handlebars engine for dynamic processing, and I'm using the MVC system for proper separation of concerns.

The link to the deployed site on Render is here:

https://colin-s-tech-blog.onrender.com/

Here we have a website, that upon loading, shows posts that have been made (if any) by any user.

Here is a screenshot of the homepage:

![Homepage screenshot](https://github.com/Splash1972/Colin-s-Tech-Blog/assets/161398773/c6403a38-c275-434d-880b-7b44e63396e3)

At this point, you can't interact with the site, but when you click "login", you are redirected to a login page, where you have the option to either enter your credentials, (which if the user doesn't exist you get an error) or you can register as a user.

The passwords are encrypted using bcrypt, and the usernames and passwords are stored on a database, that I used Sequelize to do this with.  Here is a screenshot of my database during production:

![DB pic](https://github.com/Splash1972/Colin-s-Tech-Blog/assets/161398773/d40ced60-3262-4172-a72c-f80b1cdbdebc)

Once logged in, a button to take you to the dashboard appears. From here, you can now make your own blogs which are then dynamically rendered on the page.  This page only shows you what posts you have made, and will be there if you logout and return.  When you go to the homepage, you'll see your posts along with everyone else's.

The technologies used in this site are: Express, Handlebars, Sequelize, and Bcrypt.

The link to my github repository is here:

https://github.com/Splash1972

