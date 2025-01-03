# JsonSight - JSON Field Editor

JsonSight is a modern web application that allows you to easily edit and manage your JSON data. You can select and remove fields, preview the JSON output, and download the edited data.

![JsonSight Screenshot](https://raw.githubusercontent.com/omerkaracay/json-sight/refs/heads/main/screenshot.png)

## 🚀 Features

- 📁 Upload and read JSON files
- ✨ Drag and drop file support
- 🔍 Field selection and removal
- 📋 Real-time JSON preview
- 💾 Download edited JSON
- 🌍 Multi-language support (EN, TR, DE, FR)

## 🛠️ Technologies

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Lucide Icons](https://lucide.dev/)

## 📦 Installation

1.  Clone the project:\
    git clone <https://github.com/omerkaracay/json-sight.git>\
    cd jsonmind

2.  Install dependencies:\
    npm install

3.  Start the development server:\
    npm run dev

4.  Open in your browser:\
    [http://localhost:3000](http://localhost:3000/)

## 🔧 Configuration

### Language Support

JSON files for each language are located in the `langs` folder:

- 🇬🇧 `en.json`
- 🇹🇷 `tr.json`
- 🇩🇪 `de.json`
- 🇫🇷 `fr.json`

### UI Components

To add shadcn/ui components:\
npx shadcn@latest add [component-name]

## 📝 Usage

1.  Drag and drop your JSON file or use the file picker
2.  Select the fields you want to display
3.  Check the JSON output
4.  Download the edited data

## 🌟 Features and Use Cases

- Field Filtering: Select specific fields in large JSON data while hiding others
- Bulk Field Selection: Quick field management with "Select All" and "Deselect All" buttons
- Real-time Preview: See your changes instantly
- Easy Export: Download the edited data as a JSON file with one click

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (git checkout -b feature/amazing-feature)
3.  Commit your changes (git commit -m 'feat: Add amazing feature')
4.  Push to the branch (git push origin feature/amazing-feature)
5.  Open a Pull Request

## 🐛 Known Issues

- Large JSON files (>80MB) may cause performance issues
- Some browser extensions might interfere with the drag and drop functionality

## 🔜 Upcoming Features

- [ ] Dark mode support
- [ ] JSON validation and formatting
- [ ] Field search functionality
- [ ] Export to different formats
- [ ] Save preferences locally

## 📄 License

You can use this project as you want.

## 👨‍💻 Developer

Ömer Karaçay - [karacay.fi](https://karacay.fi)

## ☕ Support

If you like this project and want to support the developer:

[Buy Me A Coffee](https://www.buymeacoffee.com/karacay)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- And all other open-source libraries used in this project
