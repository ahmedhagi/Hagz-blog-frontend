# Hagz Blogging Front-end Application

https://hagz-blog.vercel.app/

## Description
This is the front-end side of the Hagz Blog website. 

This application allows the user to view posts created by other users on a variety of different topics and tags. Users are able to create, edit, and delete posts by signing up and logging into their account. The application allows other users to comment on posts to engage with the community. Please refer to the usage section for a more detailed explanation of the usages of the application. 

This application is built utilizing the React framework and React Redux and React Hook Form libraries.The application's user interface is styled using Tailwind CSS. 

## Installation

The application can be accessed at https://hagz-blog.vercel.app/.

The application can also be run locally by running this script in the project's directory.

### `npm run dev-start`

Open [https://localhost:3000](https://localhost:3000) to view it in your browser.

## Usage

### Viewing Posts and Comments

https://github.com/user-attachments/assets/3fbb8b0d-7cdb-4039-9d33-d8e3425ad7cc

Posts are viewed by navigating to the home or the other topic tabs available on the sidebar of the application. These pages will then present the posts in card format with a pagination row at the bottom of the page to allow the user to cycle through the list of posts. Posts are accessed by either clicking the photo or title of the postcard, which will take the user to the post page.

On the post page the user is able to read the post in its entirety. If a post contains headings, there will be a table of contents located on the sidebar that allows the user to access the specific headings indicated in the post. On the left side of the page there is additional information about the author and related posts that the user can access. Comments on a post are located on the bottom of the page.

### Signing up and Logging in

https://github.com/user-attachments/assets/0279f0c3-e1a9-4297-ab57-8571a5884c1f

To sign up for an account, click the signup button on the top right of the page to then access the signup page. To create the account, you must fill out the signup form and note that the password must contain 8 characters, one uppercase letter, one lowercase letter, one number, and one special case character. After creating an account, the user will then be automatically logged in.

To log in, click the login button on the top right of the page and then access the login page. To log into the account, you must fill out the login form.

### Creating a Post

https://github.com/user-attachments/assets/ea100384-c79d-4ac6-84f6-ab9c5a388e98

To create a post, the user must be logged in first. Navigate to the user profile page by clicking the username on the sidebar to access the profile page. On the profile page there will be a create post button under the user information. By clicking the button, it will take the user to the create post page. 

To successfully create a post, the user must fill out the create post form. The user must include a title, topic, short description, and content in the text editor area. Please note that editing the header image is not available currently and will be updated in a future version. 

### Editing and Deleting a Post 

https://github.com/user-attachments/assets/bda6ee8d-62d9-452c-8a01-425553951b3d

To edit or delete a post, the user must access the specific post and click on either the "edit post" link or the "delete post" link. The "edit post" link will take you to the create post form with all the previous data populated. Please note that editing the header image is not available currently and will be updated in a future version.

### Adding/Editing/Deleting a Comment

https://github.com/user-attachments/assets/50ce1a61-b237-4424-a21f-a6b5d357b8bb

To add a comment, the user must be logged in first. The user views the specific post they wish to comment on and scrolls down to the comment section. There will be a text editor where the user can then write out their comment and publish it to the post by clicking the comment button. 

Comments can then be edited and deleted by clicking either the "edit" link or the "delete" link on the comment.

## Contributing

Pull requests are welcome. For major changes, please open an issue first. 
To discuss what you would like to change.

## License

Distributed under the Unlicense License. See LICENSE.txt for more information. 
