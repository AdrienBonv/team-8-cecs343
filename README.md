<h1 align="center">
    TEAM 8 - Rating Polling app
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Prisma&color=2D3748&logo=Prisma&logoColor=FFFFFF&label=">
  <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white">
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">
</p>

## Development Setup

### Prerequisites

You are required to have Node.Js installed if you'd like to run the app locally.
This configuration is in `config/config.js`. Please create your own `.env` file.
You can fin an example of `.env` file in `.env.example`.

### Usage

#### API

```bash
# First install all the project dependencies
$> npm install

# Run the api
$> npm run start

Express app started on port 8000
```

#### Prisma

Create supabase account before [Supabase](https://supabase.com/partners/integrations/prisma)
(Run after the `npm install`)

```bash
# in .env put your supabase adress like in .env.example

# push the database
$> npx prisma db push

```

### App

```bash
# First install all the project dependencies
$> npm install

# Run the app
$> npm run dev
```
