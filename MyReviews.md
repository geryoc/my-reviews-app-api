# MyReviews

## General Description and Goal

**MyReviews** is an app to capture and reflect personal experiences through reviews.

It helps you remember what you've experienced with different things, what you liked or disliked, and organize your opinions in a way that’s meaningful and useful to you.

Whether it’s a movie, a book, a restaurant, a place, a hotel, a product, or a life moment — MyReviews is a tool to give value to your past experiences and guide your future decisions.

Over time, it becomes a record of your preferences, your discoveries, and your experiences.

## Core Initial Features

- Reviews Timeline (Timeline Cards) Infinite scroll (View more)
- Search, filters, sort by
- Create a Review
- Edit and Delete a Review
- Manage my Tags (CRUD Tags)

## Backlog Features

- Create and manage tier lists
- User Categories - allow user to CRUD own categories
- Social newtwork features (feed, share, tag user, etc)

## Domain Entities

### Review

- **`reviewId`**: The name/title of what is being reviewed
- **`title`**: The name/title of what is being reviewed
- **`categoryId`**: The category this review belongs to (e.g., Movie, Book, Food)
- **`date`**: The date the experience happened (not when the review was written)
- **`description`**: A free-text field for detailed thoughts, impressions, and context
- **`rating`**: A numeric rating (default scale 0–10, configurable in future)
- **`pros`**: Bullet list of what the user liked about the item
- **`cons`**: Bullet list of what the user disliked or would improve
- **`tags`**: List of user-defined keywords for filtering and search
- **`location`**: Location of the experience (name, address, or place)
- **`link`**: Optional URL to external site/resource
- **`isFavorite`**: Boolean flag to mark the review as a personal favorite
- **`imageUrls`**: List of image URLs or uploaded media linked to the review
- **`createdAt`** _(system)_: Timestamp of when the review was created
- **`updatedAt`** _(system)_: Timestamp of the last update/edit

### Category

- **`id`**: Unique identifier for the category
- **`name`**: Display name of the category (e.g., "Movies", "Books")
- **`description`**: Optional short description of what this category is for
- **`order`**: number to sort categories
- **`emoji`**: Emoji icon representing the category
- **`image`**: image to show in lists filters etc

### User

- **`id`**: Unique identifier for the category
- **`name`**: Display name of the category (e.g., "Movies", "Books")
- **`description`**: Optional short description of what this category is for
- **`order`**: number to sort categories
- **`emoji`**: Emoji icon representing the category
- **`image`**: image to show in lists filters etc

### Category List (Initial Examples)

| Emoji | Name                           | Description                                |
| ----- | ------------------------------ | ------------------------------------------ |
| 🗂️    | Generic                        | Generic Review. Don’t fit other categories |
| 🍽️    | Restaurants                    | Dining out reviews                         |
| 🏨    | Hotels                         | Hotel stays, service, value                |
| 🍲    | Food Recipes                   | Recipes you’ve tried or created            |
| ☕    | Coffee Shops                   | Cafés, specialty coffee                    |
| 🎬    | Movies                         | Films in theaters or streaming             |
| 📺    | TV Shows / Series              | Episodic content                           |
| 📚    | Books                          | Fiction, non-fiction, ebooks               |
| 🎵    | Music / Albums / Songs         | Tracks, albums, concerts                   |
| 🛍️    | Products                       | Gadgets, purchases, tech, etc.             |
| 🧳    | Places / Travel                | Destinations, trips, attractions           |
| 🎭    | Live Shows                     | Events, Plays, musicals, comedy shows      |
| 🎮    | Games                          | Console, PC, mobile, tabletop              |
| 💼    | Services                       | Subscriptions, consultants, etc.           |
| 📝    | Personal Experiences / Moments | Reflective or life events, journals, etc   |

## Tech Details

### Frameworks and Tools

- Backend: Nest JS + TypeORM
- Database: PostgreSQL
- Web App: React

### DB Schema flow

- Local Postgre DB using docker compose
- For local DB use auto sync entities changes
- Use seeders for System DB data (like categories)
- Use DEV data seeders if needed (run on demand by script)

## <br><br><br><br><br><br><br><br><br>

## Future Brand Name Ideas

“MyReviews” is a descriptive and functional name suited for the early stages of the project.

In future versions, when the app evolves into a social platform, we may consider a more commercial and brandable name such as:

- **MyRevu**
- **MyRevU**
- **MyRevia**
- **MyRev**
- **Revia**
- **Revu**
- **FeelRank**
- **Reviewly**
- **Tierly**

These alternatives maintain the concept of personal reviews and tiering while being more modern, unique, and globally scalable as a brand.
