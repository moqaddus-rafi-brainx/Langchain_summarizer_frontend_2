# Langchain Summarizer Frontend

A modern React-based frontend application for generating AI-powered summaries from PDF and TXT documents. Built with Vite and React, this application provides a clean and intuitive interface for document summarization.

## 🚀 Features

- **Document Upload**: Support for PDF and TXT file uploads
- **AI-Powered Summarization**: Generate comprehensive summaries using Langchain
- **Feedback System**: Accept or reject generated summaries with feedback
- **Modern UI**: Clean, responsive design with smooth animations
- **File Validation**: Automatic validation of uploaded file types
- **Success Notifications**: Clear feedback messages for user actions
- **Copy & Download**: Easy sharing and saving of generated summaries

## 🛠️ Tech Stack

- **React 19.1.0** - Modern React with hooks
- **Vite 7.0.4** - Fast build tool and development server
- **CSS3** - Custom styling with modern design patterns
- **ESLint** - Code quality and consistency

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd langchain_summarizer_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🎯 Usage

### Uploading Documents
1. Click on the file upload area or drag and drop your file
2. Supported formats: PDF (.pdf) and Text (.txt)
3. File size validation is automatic
4. Click "Generate Summary" to process your document

### Managing Summaries
- **Accept Summary**: Click the green "Accept Summary" button to approve
- **Reject Summary**: Click the red "Reject Summary" button to provide negative feedback
- **Copy Summary**: Use the copy button to copy the summary to clipboard
- **Download Summary**: Download the summary as a text file

### Feedback System
- All user feedback is sent to the backend for model improvement
- Success messages confirm when feedback is submitted
- The form automatically clears after successful feedback submission

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Summarizer.jsx    # Main application component
│   └── Summarizer.css    # Component styles
├── App.jsx               # Root application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🌐 API Integration

The frontend communicates with a backend API for:
- **Document Processing**: `/api/upload/load-document`
- **Feedback Submission**: `/api/upload/save-summary`

### Request Format
- **Document Upload**: FormData with file attachment
- **Feedback**: JSON with `{ threadId, decision }` where decision is "approve" or "reject"

### Response Format
- **Summary Generation**: `{ threadId, summary, question }`
- **Feedback Confirmation**: `{ success: true, result, message }`

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Gradient backgrounds and smooth animations
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Visual feedback during processing
- **Error Handling**: Clear error messages for user guidance

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API URL | `http://localhost:8000` |

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common issues

---

**Built with ❤️ using React and Vite**
