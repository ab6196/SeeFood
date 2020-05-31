# SeeFood – A Food Recognition and Recommendation App

## Abstract / Project Idea Description:

The requirement for an AI food recognition and recommendation app is important in the health, fitness, travel and restaurant industry. It connects the users with restaurants and vice versa. It ensures business for both parties and keeps the economy running. &quot;SeeFood&quot; is an AI-based food recognition and recipe recommendation web application that provides the user with information on the type of food and its corresponding recipe. The image recognition API uses robust machine learning and AI models that are trained using large food image datasets either on the cloud or locally.

This application is great for building diet plans, cooking, and gathering information on different cuisines. It is useful for platforms like Yelp, Grubhub, and Postmates who can tap into this application and automatically integrate and populate their databases with the latest food images. For businesses like Dominos, Pizza Hut, Starbucks, and Burger King, this application can provide insights into what dishes are most popularly photographed by customers.

The user is given the option of uploading an image from the file system or to take a picture in real-time. Once the user uploads the image, the application makes API calls to the ML engine requesting information about the image. The response is processed and mapped to a recipe in the database. When the user requests for the recipe, the corresponding recipe is displayed. If the user requests information on nearby restaurants serving that particular dish, the application makes an API request to the backend and displays the results.

## Goal of the project:

- People who like a dish when they see it but do not know what it&#39;s called or how it is made
- People who want to explore eating or cooking new cuisines but want to know what goes into making the dishes
- Restaurants can gather user images uploaded to analyze and promote their most requested dishes to create better awareness

## Technology Stack:

**Frontend:** HTML, CSS, Bootstrap, React

**Backend:** Node - Express / Flask

**Image Recognition:** Google Cloud Vision ML

## Stack Overview
<img src="/images/architecture-overview.png" height=75% width=75%>

## Project Architecture
<img src="/images/project-architecture.png" height=75% width=75%>

## Run Instructions:

Please run the `npm start` command in the `frontEnd` and `backEnd` directories to run the project.

### `keyFile.json` File

Considering cyber security issues, I have not uploaded our keyFile on GitHub. Please reach out to me if you would like to clone and run the repo locally.
