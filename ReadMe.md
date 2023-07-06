# ARK_Chat Backend

This is the README file for the back-end codebase of ARK_Chat, a social media web app. It provides an overview of the project, lists the tools and technologies used, and outlines the features implemented in the application.

## Tools Used

The following tools and technologies were used in the development of the ARK_Chat backend:

1. Node.js: A JavaScript runtime environment used as the backend language.
2. MongoDB: A NoSQL database used to store application data.
3. Redis: An in-memory cache utilized for caching data.
4. Message Queue: A Redis-based message queue used for message handling.
5. Terraform: An infrastructure as code tool used for infrastructure management.
6. CircleCI: A CI/CD platform employed for continuous integration and deployment.
7. Git: A version control system used for source code management.
8. GitHub: A code hosting platform where the project is hosted.
9. AWS: A cloud computing platform utilized for hosting the application.

## App Features

The ARK_Chat backend implements the following features:

1. Authentication:

   - Signup/Registration: Allows users to create new accounts.
   - SignIn/Login: Enables users to authenticate and log into their accounts.
   - Signout/Logout: Allows users to sign out and terminate their session.
   - Password Reset: Provides functionality for resetting a user's password.
   - Current User Check: Allows checking the details of the currently logged-in user.

2. Chat/Messaging:

   - Private Chat: Enables users to engage in private one-on-one conversations.
   - Send Images in Chat: Allows users to share images within chat messages.
   - Add Message Reactions: Provides the ability to react to chat messages.
   - Retrieve Messages: Allows fetching and displaying chat message history.
   - Mark Messages as Read: Enables users to mark chat messages as read.
   - Delete Messages: Provides the option to delete chat messages.

3. User:

   - Get Single User: Allows retrieving the details of a single user.
   - Get Multiple Users With Pagination: Allows fetching multiple users with pagination support.
   - Select Random Users: Provides functionality to select random users.
   - Edit Profile: Allows users to edit their profile information.

4. Posts:

   - Create Posts: Enables users to create new posts.
   - Get Posts: Allows fetching posts from the database.
   - Update Posts: Provides functionality to update existing posts.
   - Edit Posts: Allows users to edit their own posts.

5. Comments:

   - Add Comment to Post: Allows users to add comments to posts.
   - Get Single Comment: Retrieves the details of a single comment.
   - Get Multiple Comments: Fetches multiple comments related to a post.

6. Reactions:

   - Add Post Reaction: Allows users to add reactions to posts.
   - Get Post Reaction: Retrieves the reactions associated with a post.
   - Remove Reaction From Post: Enables users to remove their reaction from a post.

7. Images:

   - Add Image to Post: Allows users to add images to their posts.
   - Upload Profile Images: Enables users to upload profile images.
   - Upload Background Images: Allows users to upload background images.
   - Retrieve Images: Provides functionality to retrieve uploaded images.
   - Delete Profile or Background Image: Allows users to delete their profile or background images.

8. Followers:

   - Follow User: Allows users to follow other users.
   - Unfollow User: Enables users to unfollow users they previously followed.
   - Block User: Allows users to block other users.
   - Unblock User: Enables users to unblock users they previously blocked.

9. Notification:
   - Notification Settings: Allows users to configure notification settings.
   - Retrieve and Display Notifications:

Enables users to retrieve and display notifications.

- Delete and Update Notifications: Provides functionality to delete and update notifications.

## Installation and Setup

To set up the ARK_Chat backend locally, please follow these steps:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/ramkumar-ark/ark_chat-backend.git
   ```

2. Install the project dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Configure the environment variables:

   - Create a `.env` file in the root directory of the project.
   - Define the required environment variables in the `.env` file, such as DATABASE_URL for database connection details, SERVER_PORT_NO for port at which server has to run, CLIENT_URL for url of the client, NODE_ENV for type of environment, REDIS_HOST for Redis configuration, AWS credentials, etc.

4. Start the development server:

   ```bash
   npm run dev
   ```

   This will start the backend server on your local machine.

5. Create the production build:

   ```bash
   npm run build
   ```

   This will generate the javascript code base under the folder 'dist'.

## Contribution

Contributions to the ARK_Chat backend are welcome! If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Test your changes thoroughly.
5. Commit and push your changes to your forked repository.
6. Open a pull request, describing your changes and the motivation behind them.

## License

The ARK_Chat backend is released under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any inquiries or questions regarding the ARK_Chat backend, please contact:

Ram Kumar
developer.ram.k@gmail.com

Feel free to reach out with any feedback or suggestions. We appreciate your interest in the project!
