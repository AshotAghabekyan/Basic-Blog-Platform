
/////////////Node.js Backend Developer Task: Basic Blog Platform////////////////


///////////////////////////HOW TO USE THE APP/////////////////////////////////////

ATTENTION, use your own url instead of "http://localhost:3000/"



///ENVIRONMENT SETTINGS///
MongoDB Guide 
---- In the .env file, write the URL of your MongoDB local server ----
    (example --> MongoURI="mongodb://localhost:27017/blog_platform")

---- Your database should have the following collections "blogs", "users" ----


PORT 
---- In the .env file, write the port that the server will listen to ----
    (example PORT=3000)

JWT SECRET 
---- In the .env file, write the secret key for signing the jwt token ----
    (example JWT_SECRET="SECRET_KEY")



///Authorization///

1. Registration --> To register in the system, you need to send a POST request to http://localhost:3000/auth/registration.
                    The request body must contain an object
                    of the {fullname, email, password, confrimPassword} type.


2. Login --> To log in to the system, you need to send a POST request to http://localhost:3000/auth/login.
                The request body must contain an object of the {email, password} type.


3. Logout --> to log out, you just need to send a DELETE request
                 to the server at http://localhost:3000/auth/logout.




///Account Managment///

1. Get User Info --> In order for the user to see his account, you need to make a GET request to http://localhost:3000/auth/account.
                         The user object will be returned


2. Update User Info -->  To change the account data, you need to send a PUT request to http://localhost:3000/auth/account.
                             The request body must contain an object with the data that needs
                            to be changed. example {fullname : "Changed fullname"};



3. Delete User Account -->  To delete your account, you need to send a DELETE request to http://localhost:3000/auth/account.
                             The request body must contain an object containing the password of this user ({password : UserPassword}).
                             In this way, the user's deletion is confirmed





///Blogs Managment///

1. See All Blogs --> To see all the blogs, you just need to make a GET request to the main path http://localhost:3000/. (or http://localhost:3000/blogs)
                    An array of blogs will be returned.


2. Create Blog -->  To create a new blog, you need to make a POST request to http://localhost:3000/blogs/create_blog.
                     In the request body, you need to pass an object with blog data. Or rather {title, MainContent}.


3. Delete Blog -->  To delete a specific blog, you need to give the ID of the specific blog to be deleted in the query string.
                        example --- DELETE request to http://localhost:3000/blogs/blog/:blogId


4. Edit Blog -->  To make changes to an existing blog, you need to make a PUT request to http://localhost:3000/blogs/blog/:blogId.
                    In the query string, give the id of a specific blog.
                    In the request body, you must pass an object that contains the data to be changed.
                    (example {title : NewTitle}).


5. Add Comment --> To add a comment to a specific blog, you need to make a POST request to http://localhost:3000/blogs/:blogId/comments.
                First, you need to specify the ID of a specific blog in the query string,
                and then you need to specify the object in which the comment to the property will be.
                (example {comment : SomeComment})


6. Delete Comment --> To delete a specific comment on a specific blog, you need to make a DELETE request to http://localhost:3000/blogs/:blogId/comments.
                    In the query string, give the id of a specific blog.
                    An object with a comment Id property that identifies a specific comment must be passed in the request body.
                    (example {commentId : SomeCommentId})