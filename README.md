# CantantDemo

A simple yet powerful React Native app for tracking your personal finances. Cantant helps you monitor your cash flow by recording income and expenses with a clean, user-friendly interface.

## Features

- 💰 Track income and expenses
- 📊 View current balance at a glance
- 📝 Add detailed transaction descriptions
- 📱 Clean and intuitive user interface
- 🔄 Real-time balance updates
- 📅 Transaction history with dates
- 💾 Local SQLite storage for data persistence

## Technology Stack

- React Native
- SQLite (react-native-sqlite-storage)
- Recoil (State Management)
- React Navigation
- React Native Vector Icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v12 or later)
- npm or yarn
- React Native development environment
  - For iOS: Xcode (Mac only)
  - For Android: Android Studio and Android SDK

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cantant.git
cd cantant
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (Mac only):
```bash
cd ios
pod install
cd ..
```

4. Start the application:
```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android
```

## Project Structure

```
cantant/
├── src/
│   ├── components/      # Reusable components
│   ├── screens/         # Screen components
│   ├── database/        # SQLite database setup and queries
│   └── state/          # Recoil state management
├── ios/                 # iOS native code
└── android/            # Android native code
```

## Key Features Explained

### Transaction Management
- Add new transactions with type (income/expense)
- Input validation for amount and description
- Automatic date tracking
- Real-time balance updates

### Data Persistence
- Local SQLite database
- Automatic database initialization
- Efficient query operations

### User Interface
- Bottom tab navigation
- Transaction list with visual type indicators
- Loading states and error handling
- Form validation with user feedback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React Native community
- React Navigation team
- Recoil team
- SQLite contributors

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://https://github.com/DaraGboyega/CantantDemo](https://https://github.com/DaraGboyega/CantantDemo)

---

Made with ❤️ using React Native
