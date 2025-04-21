# Zuma AI

## Application Features

- 📝 **Clear, structured summaries** with key points and insights.
- 🎨 **Beautiful, interactive summary viewer** with progress tracking.
- 🔒 **Secure file handling** and processing.
- 🔐 **Protected routes** and API endpoints.
- 💰 **Flexible pricing plans** (Basic and Pro).
- 🪝 **Webhook implementation** for Stripe events.
- 📊 **User dashboard** for managing summaries.
- 📱 **Responsive design** for mobile and desktop.
- 🔄 **Real-time updates** and path revalidation.
- 🚀 **Production-ready deployment**.
- 🔔 **Toast notifications** for upload status, processing updates, and error handling.
- 📈 **Performance optimizations**.
- 🔍 **SEO-friendly summary generation**.
- 🗂️ **Markdown Export** that can be converted into a blog post.

---

## Core Technologies

- 🚀 **Next.js 15 App Router**: Server-side rendering, routing, and API endpoints with Server Components and Server Actions.
- ⚛️ **React 19**: For building interactive user interfaces with reusable components.
- 🔑 **Clerk**: Secure authentication with Passkeys, GitHub, and Google Sign-in.
- 🤖 **GPT-4 powered summarization**: Contextual understanding and emoji-enhanced output.
- 🧠 **Langchain**: For PDF parsing, text extraction, and document chunking.
- 🎨 **ShadCN UI**: Accessible, customizable React components.
- 💾 **NeonDB (PostgreSQL)**: Serverless database storage for summaries and user data.
- 📤 **UploadThing**: Secure PDF uploads (up to 32MB) and file management.
- 💳 **Stripe**: Subscription management, cancellations, and secure payment processing.
- 🔔 **Toast notifications**: For user feedback.
- 📜 **TypeScript**: Static typing and enhanced development experience.
- 💅 **TailwindCSS 4**: Utility-first, responsive styling (with guidance to upgrade to Tailwind v4).
- 🚀 **Deployment on Vercel**: For fast and scalable hosting.

---

## How to Run the Application

1. **Clone the repository**:

   ```bash
   git clone https://github.com/CaffeinatedEngineer/zuma.git
   cd zuma-ai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the required environment variables (e.g., `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, etc.).

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:

   [http://localhost:3000](http://localhost:3000)

---

## Deployment

The application is production-ready and can be deployed on Vercel. Follow the Vercel Deployment Guide to deploy your application.

---

## License

This project is licensed under the MIT License.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add feature-name"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

---

## Contact

For any questions or feedback, feel free to reach out:

- **Email**: shashankshiv.jha@gmail.com
- **GitHub**: [CaffeinatedEngineer](https://github.com/CaffeinatedEngineer)
