[![logo.png](https://i.postimg.cc/9MdLCsNY/logo.png)](https://postimg.cc/34wXZfhk)
# To U Mobile Application

The need for cross-border trade has been on the rise, especially with the ease of globalization and technological advancements. However, some products are still not available for direct delivery to certain countries. Amazon, for example, restricts some products from being delivered to Lebanon, making it challenging for clients who want to access these products. To address this issue, we propose the development of a system, composed of a mobile app and a web app, that connects Travelers visiting the US with Clients in Lebanon, allowing them to purchase and deliver products that are not available for direct delivery. This part is concerned with the Mobile Application of this system.


## Authors

- [@eliehanna2](https://www.github.com/eliehanna2)


## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | ![#3274cb](https://via.placeholder.com/10/3274cb?text=+) #3274cb |



## Demo

Insert gif or link to demo


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack

**Client:** React Native

**Server:** Node


## Used By

This system is used by:

- **Traveler**:
The Traveler's task is to bring orders with them from USA to Lebanon. These orders will be assigned to them according to their submitted Flight Ticket.
- **Client**:
The Client requests the amazon product by pasting the link in the application. This order will be assigned to a Traveler.


## Features

- Cross platform


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```


Start the expo server

```bash
  npx expo start
```


## Documentation

[Documentation](https://linktodocumentation)


## Lessons Learned
**What did you learn while building this project? What challenges did you face and how did you overcome them?**

As I developed my project using React Native, I encountered various challenges and gained valuable experience that helped me improve my skills. One of the most significant lessons I learned was the importance of careful planning and testing. I realized that investing time in creating a detailed project plan and testing each component of the app thoroughly could save a lot of time and effort in the long run.

Another challenge I faced while building the project using React Native was implementing a secure way to save the user's login token to enable the user to stay logged in even after closing the app. To overcome this challenge, I used AsyncStorage, which is a simple, persistent, and secure key-value store for storing small amounts of data. I stored the user's token in AsyncStorage and set up an authentication check that verifies the token's validity upon opening the app.

I also implemented a secure logout function that clears the stored token from AsyncStorage and redirects the user to the login screen. This ensured that the user's information remained secure and protected from unauthorized access.

In addition, I made sure to implement proper error handling to handle scenarios where the token was invalid or expired, so the user could be notified and taken to the login screen to reauthenticate.

Moreover, I faced performance issues while developing the app, particularly when rendering large lists and images. To overcome this, I used tools like FlatList and FastImage to optimize the app's performance and ensure a smooth user experience.

Overall, building this project using React Native was a valuable learning experience that taught me the importance of careful planning, testing, and using the right tools and techniques to overcome challenges.
