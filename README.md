# Task Management Application

A modern task management application built with Next.js, MongoDB, and Server Actions. Manage your tasks with a beautiful and intuitive interface.

![Dashboard](https://github.com/lazylad99/Task-Manager_NextJS/blob/main/assets/Screenshot.png)


## Features

- ✨ Create, read, update, and delete tasks
- 📅 Set due dates for tasks
- ✅ Mark tasks as complete/incomplete
- 🎯 Track task status and progress
- 💾 Data persistence with MongoDB
- 🚀 Server-side rendering with Next.js
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: Next.js 14+
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: (Coming soon)
- **Deployment**: Vercel
- **Icons**: Lucide Icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.17 or later
- npm or yarn package manager
- MongoDB account (for database)

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/task-management.git
cd task-management
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Variables**

Create a `.env.local` file in the root directory and add the following:
```env
MONGODB_URI=your_mongodb_connection_string
```

To get your MongoDB connection string:
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Click "Connect" and choose "Connect your application"
4. Copy the connection string and replace `<password>` with your database password

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Deployment

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).

1. Create a Vercel account if you haven't already
2. Install the Vercel CLI:
```bash
npm i -g vercel
```

3. Run the following command in your project directory:
```bash
vercel
```

4. Add your environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" tab
   - Add `MONGODB_URI` with your MongoDB connection string

### Alternative Deployment Options

You can also deploy to other platforms that support Next.js:

1. **Build the application**
```bash
npm run build
```

2. **Start the production server**
```bash
npm start
```

## Project Structure

```
task-management/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── page.tsx        # Main page
│   ├── layout.tsx      # Root layout
│   ├── loading.tsx     # Loading UI
│   └── error.tsx       # Error UI
├── components/         # React components
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   └── TaskItem.tsx
├── lib/               # Utility functions
│   ├── mongodb.ts     # Database connection
│   └── actions.ts     # Server actions
├── models/            # Database models
│   └── Task.ts
└── types/             # TypeScript types
    └── index.ts
```

## Available Scripts

- `npm run dev` - Runs the development server
- `npm run build` - Builds the application for production
- `npm start` - Starts the production server
- `npm run lint` - Runs ESLint for code quality
- `npm run type-check` - Runs TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for the deployment platform
- MongoDB for the database service

## Support

For support, email alokdeep9925@gmail.comh or open an issue in the GitHub repository.
