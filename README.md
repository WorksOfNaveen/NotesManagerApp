# Notes App

A simple React Native notes app inspired by **Google Keep**. Create, edit, and delete notes on your device. Everything is saved locally — no account or internet required.

On first launch, two **starter notes** introduce the app and highlight full-stack React Native experience (see `src/data/seedNotes.ts`).

## Features

- **Splash screen** — “Welcome to Notes App” for 2.5 seconds on open
- **Google Keep theme** — Cream/yellow light mode and charcoal dark mode with amber accents
- **Home** — Notes in a 2-column grid with rounded cards
- **Editor** — Create or edit notes; **Save** / **Update** in the top-right header
- **Delete** — Swipe left or trash button; **undo snackbar** for 4 seconds before permanent delete
- **Starter notes** — Two sample notes on first launch only (`hasSeeded` flag; not again after you delete all notes)
- **Local storage** — Notes persist after you close the app (AsyncStorage + Zustand)
- **Dark mode** — Follows your system light/dark setting

## User flow (quick)

1. Splash → **My Notes** (grid)
2. Tap **+** or a card → **Editor** → tap **Save** or **Update** (header, top right)
3. **Manage** → **Delete** → swipe or trash → **UNDO** on snackbar if you change your mind

See [APP_FLOW.md](./APP_FLOW.md) for the full journey and [COMPONENTS.md](./COMPONENTS.md) for how each file works.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | React Native 0.85 (CLI, TypeScript) |
| Navigation | React Navigation 7 (native stack) |
| State | Zustand 5 with persist middleware |
| Storage | `@react-native-async-storage/async-storage` |
| Gestures | `react-native-gesture-handler` (swipe to delete) |
| Theme | Google Keep–style palette in `src/theme/colors.ts` |

## Project structure

```
NoteManagerApp/
├── App.tsx                 # Two-phase root: splash, then navigation
├── APP_FLOW.md             # User journey documentation
├── COMPONENTS.md           # Components & architecture guide
├── commands.md             # Handy dev / build commands
├── src/
│   ├── components/         # NoteCard, DeleteNoteRow, HeaderButton, UndoSnackbar
│   ├── constants/          # Splash duration, undo timer, snackbar layout
│   ├── data/               # seedNotes (first-launch samples)
│   ├── hooks/              # useAppTheme
│   ├── navigation/         # AppNavigator
│   ├── screens/            # Splash, Home, Editor, Delete
│   ├── store/              # useNotesStore
│   ├── theme/              # colors (Google Keep palette)
│   ├── types/              # Note, navigation types
│   └── utils/              # noteDisplay (title/preview helpers)
├── android/                # Native Android (applicationId: com.notemanagerapp)
└── ios/
```

## Requirements

- Node.js **>= 22.11.0** (see `package.json` engines)
- React Native environment: [Set up your environment](https://reactnative.dev/docs/set-up-your-environment)
- For iOS: Xcode, CocoaPods
- For Android APK: JDK, Android SDK, `ANDROID_HOME` configured

## Install dependencies

From the project root:

```sh
npm install --ignore-scripts
```

On iOS, install pods after native dependencies change:

```sh
cd ios
bundle exec pod install
cd ..
```

## Run the app

**Start Metro:**

```sh
npm start
```

**Android (new terminal):**

```sh
npm run android
```

**iOS:**

```sh
npm run ios
```

## Build APK (Android)

From the project root:

```sh
cd android
./gradlew assembleRelease
```

Release APK path:

`android/app/build/outputs/apk/release/app-release.apk`

Debug APK (faster, for testing):

```sh
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

> Release builds currently use the debug keystore (fine for demos). For Play Store, create a release keystore and configure `signingConfigs` in `android/app/build.gradle`.

Attach the APK to a [GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) rather than committing it to the repo.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

## How to use the app

1. Wait for the welcome splash, then you land on **My Notes** (cream background in light mode).
2. On first install, two starter notes may appear — edit or delete them like any note.
3. Tap **+** (amber FAB) to add a note, or tap a card to edit it.
4. Tap **Save** or **Update** in the **top-right** of the editor header when finished.
5. Tap **Manage** to open the delete screen.
6. Swipe a note left or tap the trash icon — the note hides immediately and a snackbar offers **UNDO** for 4 seconds.

## Starter notes (first launch)

Loaded once per install when storage has never been seeded (`hasSeeded` is false and `notes` is empty). Deleting every note does not bring them back (`useNotesStore` → `onRehydrateStorage`):

| Title | Purpose |
|-------|---------|
| Why pick me for this role | Experience building secure apps, faster delivery with safe tooling (~30–40%), passion for app dev, choosing solid approaches over shortcuts |
| Good fit if you need… | Full-stack React Native fit: mobile + API, simple architecture, hiring conversation starter |

## Theme

| Mode | Background | Cards | Accent | FAB text |
|------|------------|-------|--------|----------|
| Light | Cream `#FFF8E1` | White | Amber `#FBC02D` | Dark `#212121` |
| Dark | Charcoal `#202124` | `#2D2E30` | Amber `#FBC02D` | Dark `#212121` |

## Documentation

- **[APP_FLOW.md](./APP_FLOW.md)** — Step-by-step user flows and navigation
- **[COMPONENTS.md](./COMPONENTS.md)** — What each component and store does
- **[commands.md](./commands.md)** — Emulator, Metro, Gradle, and Git commands

## Security note (development)

This project uses a Cursor hook that requires `npm install --ignore-scripts` for dependency installs. See `.cursor/rules/frontend-dependency-security.mdc` if you use the AI agent to add packages.

## Troubleshooting

- **Metro / build issues:** See [React Native troubleshooting](https://reactnative.dev/docs/troubleshooting)
- **iOS pods:** Run `bundle exec pod install` in `ios/`
- **Android:** Ensure emulator or device is connected; try `cd android && ./gradlew clean` if builds fail
- **No starter notes:** They only load on first install before `hasSeeded` is set; clear app data or reinstall to see them again

## License

Private project (`package.json`: `"private": true`).
