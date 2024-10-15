# TI JOBS BOT

**TI JOBS BOT** is an automated tool built with NestJS that scrapes LinkedIn for information on job offers in the IT and software development sectors in Colombia. It uses a Telegram bot to send these offers to a channel, facilitating quick access to tech job opportunities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Scraping](#scraping)
- [Database](#database)
- [File Handling](#file-handling)
- [Telegram Service](#telegram-service)
- [Maintenance](#maintenance)
- [Contributing](#contributing)

## Features

- **LinkedIn Scraping**: Automatically extracts IT and software development jobs from LinkedIn.
- **Automated Notifications**: Uses a Telegram bot to send alerts to a channel with the latest job offers.
- **Data Storage**: Utilizes QuickDB to store already sent jobs, avoiding duplicates and keeping a log of fetched jobs.
- **Periodic Updates**: Performs scraping every 10 minutes and sends updated job posts every half hour.
- **Flexible Integration**: Easy to configure and modify based on your needs.

## Technologies Used

- **NestJS**: Backend framework used for the project.
- **Cheerio**: Tool used for LinkedIn scraping.
- **QuickDB**: Local database used to manage jobs and avoid duplicates in the Telegram bot.
- **Telegram Bot API**: To send job offers to a specific Telegram channel.
- **TypeScript**: For writing typed, robust, and maintainable code.

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your_user/ti-jobs-bot.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd ti-jobs-bot
   ```

3. **Install dependencies**

   Make sure you have `pnpm` installed for package management. If you don't have it, you can install it by following the instructions on their [official website](https://pnpm.io/installation).

   ```bash
   pnpm install
   ```

4. **Add pnpm-lock.yaml to the repository**

   Commit the `pnpm-lock.yaml` file to ensure dependency consistency across environments.

5. **Create a `.env` file**

   Create a `.env` file in the project root and configure the necessary environment variables. An example of variables would be:

   ```env
   BOT_TOKEN=your_telegram_bot_token
   CHANNEL_ID=your_telegram_chat_id
   ```

6. **Build the project**

   ```bash
   pnpm run build
   ```

7. **Start the application**

   ```bash
   pnpm run start:prod
   ```

## Configuration

- **Environment Variables**:

  - `BOT_TOKEN`: The Telegram bot token used to send messages.
  - `CHANNEL_ID`: The ID of the channel or chat where job offers will be sent.

- **Scraping Configuration**: Scraping is set up to gather job offers in the IT and software development sectors. You can modify scraping parameters in the config file if you need to expand or change the search criteria.

## Usage

Once you’ve configured the environment variables, the application will scrape LinkedIn every hour and send job offers to the Telegram channel.

The Telegram bot sends a message with the following structure:

- **Job Title**: 💼 Job Title
- **Company**: 🏢 Company
- **Location**: 📍 Location
- **Posted Date**: 📅 Date
- **Job Link**: 🔗 URL
- **Company Profile**: 🌐 Profile

Each message includes job details, along with direct links to the job offer and the company profile.

## Scraping

Scraping is done using Playwright or Cheerio. The following data is extracted:

- Job Title
- Company
- Location
- Posted Date
- Job URL
- Company Profile URL
- Salary (if available)

### Extracting Job ID

The ID of each job is extracted directly from the URL before the `position` query parameter, ensuring each job has a unique identifier.

## Database

**QuickDB** is used to store one types of information:

1. **Jobs**: Stores job offers fetched via scraping.

Services are implemented to extend a base class that initializes QuickDB for each corresponding table.

## File Handling

Company images and other related files are handled through an endpoint in the backend. If an image is empty or unavailable, a default image located in the `assets` folder is used.

## Telegram Service

The Telegram bot communicates using the `typescript-telegram-bot-api` library and is responsible for sending formatted job offers to a specific Telegram channel.

Telegram messages are enriched with emojis and bold text for better readability.

## Maintenance

### Scraping Updates

It is recommended to update scraping periodically to adapt to any changes in LinkedIn's DOM. LinkedIn’s HTML structure may vary, affecting the ability to correctly extract job offer data.

## Contributing

Contributions are welcome! If you want to improve the project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Added new feature'`).
4. Push your branch (`git push origin feature/new-feature`).
5. Open a Pull Request.
