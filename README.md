
#  MVP Generator

A modern web application that helps **developers** quickly generate production-ready MVP (Minimum Viable Product) starter kits based on their selected technology stack and requirements.

## Features

- 🧙‍♂️ **Three-step guided setup process**: Choose your desired stack (Next.js, authentication, database, ORM, etc.)
- ⚡ **Popular technology stack options**: Select frameworks, authentication methods, databases, and ORMs
- 🔒 **Built-in authentication templates**: Easy setup for authentication services (e.g., Clerk, Auth0, etc.)
- 🛠️ **Environment setup automation**: Automatically configures your environment files and dependencies
- 📦 **Downloadable project starter kits**: Get a zip file with a preconfigured project based on your selections

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Next.js (with App Router)

## Getting Started

1. **Clone the repository** (if you're running the project locally):
   ```bash
   git clone https://github.com/yourusername/nextjs-project-setup-generator.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

4. **Use the Web Application**:
   - Open the app in your browser.
   - Select the desired technology stack (e.g., Next.js, Tailwind CSS, Clerk, Xata).
   - Click **Download** to get the zip file with your customized project.

## Project Structure

An example The generated project will include the following structure:

```
/app
  /page.tsx           
  /layout.tsx         
  /styles
    globals.css       
  /public
    /images           

/api
  auth.ts             

  /xata
    schema.ts         

/pages
  index.tsx           

/styles
  globals.css        

/tailwind.config.js    
/postcss.config.js    

/package.json         

/.env.local       

```

## Available Templates

The following templates are available based on your selected stack:

- **Frontend Frameworks**:
  - Next.js (App Router)
  - React
  - Vue
  - Angular

- **Backend**:
  - Node.js
  - Python (Django/Flask)
  - Ruby on Rails

- **Database**:
  - MongoDB
  - Xata 
  - Supabase

- **ORM**:
  - Drizzle ORM
  - Prisma

- **Authentication**:
  - Clerk (or other providers like Auth0)
  - Auth.js
  - Firebase
  - Supabase

## Customizing the Stack

After downloading the generated project:
- **Authentication**: The project can be configured with authentication using services like Clerk or others. The necessary API routes and environment variables will be preconfigured.
- **Database**: Depending on the selection, the required configuration files and schemas will be set up automatically.
- **Tailwind CSS**: Preconfigured with Tailwind CSS for utility-first styling. You can modify the `tailwind.config.js` file as needed.

## Contributing

1. **Fork the repository**.
2. **Create your feature branch** (`git checkout -b feature/amazing-feature`).
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`).
4. **Push to the branch** (`git push origin feature/amazing-feature`).
5. **Open a Pull Request**.

---

## License

MIT License – feel free to use this project for personal or commercial purposes.

---

## Contact

For any questions or issues, feel free to open an issue or contact us at [ekpoemmanuelsg@gmail.com](mailto:ekpoemmanuelsg@gmail.com).