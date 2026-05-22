# Create and upload APK to GitHub

Step-by-step guide for **NoteManagerApp**: push source code, build an Android APK, publish it on GitHub Releases, and ship updates when you change the app.

**Repo:** https://github.com/WorksOfNaveen/NotesManagerApp

---

## Before you start

| Requirement | Notes |
|---------------|--------|
| Git | Installed and signed in to GitHub |
| Node.js | >= 22.11.0 (see `package.json`) |
| Android SDK | JDK + `ANDROID_HOME` — [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) |
| Project deps | `npm install --ignore-scripts` from project root |

Optional: [GitHub CLI](https://cli.github.com/) (`gh`) for easier releases. If `gh` is not installed, use the **GitHub website** steps below.

---

## Part 1 — Push code to GitHub (first time)

### 1.1 Create the repo on GitHub

1. Go to https://github.com/new
2. Name it (e.g. `NotesManagerApp`)
3. Do **not** add a README if you already have one locally
4. Create the repository

### 1.2 Push from your machine

Open a terminal in the project root:

```bash
cd "e:/App development/NoteManagerApp"

git status
```

**Only commit source files** — not `node_modules/`, `android/.gradle`, `android/app/build/`, or `.cxx/`. Those are already in `.gitignore`.

```bash
git add .
git status   # review the list

git commit -m "Initial commit: Notes App"

git remote add origin https://github.com/YOUR_USER/NotesManagerApp.git
git branch -M main
git push -u origin main
```

If `origin` already exists:

```bash
git push origin main
```

---

## Part 2 — Build the APK

### 2.1 Release APK (for sharing / GitHub)

```bash
cd "e:/App development/NoteManagerApp/android"

./gradlew assembleRelease
```

If the build fails:

```bash
./gradlew clean
./gradlew assembleRelease
```

### 2.2 Where the APK is

| Build | Path |
|-------|------|
| **Release** (use this for GitHub) | `android/app/build/outputs/apk/release/app-release.apk` |
| Debug (quick local test) | `android/app/build/outputs/apk/debug/app-debug.apk` |

> Release builds in this project use the **debug keystore** (OK for demos and recruiters). For Play Store, configure a real release keystore in `android/app/build.gradle`.

### 2.3 Do not commit the APK to `main`

APK files are large and change often. Put them on **GitHub Releases**, not in the git tree.

---

## Part 3 — Upload APK to GitHub Releases

Use a **new tag for each APK** (e.g. `v1.0.0`, `v1.0.1`, `v1.0.2`). You cannot replace an asset on the same tag without deleting it first.

### Option A — GitHub website (no CLI)

1. Open your repo → **Releases** → **Create a new release**
2. **Choose a tag:** e.g. `v1.0.0` → **Create new tag**
3. **Release title:** e.g. `v1.0.0 - Notes App`
4. **Description:** what changed (short bullets)
5. Under **Attach binaries**, drag:
   - `android/app/build/outputs/apk/release/app-release.apk`
   - Rename on upload if you like: `NoteManagerApp-v1.0.0.apk`
6. Click **Publish release**

Download link will look like:

`https://github.com/YOUR_USER/NotesManagerApp/releases/download/v1.0.0/NoteManagerApp-v1.0.0.apk`

### Option B — GitHub CLI (`gh`)

Install and login: `gh auth login`

```bash
cd "e:/App development/NoteManagerApp"

gh release create v1.0.0 \
  "android/app/build/outputs/apk/release/app-release.apk" \
  --title "v1.0.0 - Notes App" \
  --notes "First installable Android build."
```

---

## Part 4 — When you make changes (ship an update)

Use this checklist every time you change code (UI, `seedNotes.ts`, icons, etc.).

### 4.1 Workflow checklist

```
[ ] 1. Edit code and test (emulator or device)
[ ] 2. Commit and push to main
[ ] 3. Bump release tag (v1.0.0 → v1.0.1 → v1.0.2 …)
[ ] 4. Build a new release APK
[ ] 5. Create a new GitHub Release with the new APK
[ ] 6. (Optional) Install on emulator and verify
```

### 4.2 Step 1 — Commit and push

```bash
cd "e:/App development/NoteManagerApp"

git status
git add .
git commit -m "Describe what changed, e.g. Update starter note copy"
git push origin main
```

### 4.3 Step 2 — Pick the next version tag

| Last release | Next tag |
|--------------|----------|
| v1.0.0 | v1.0.1 |
| v1.0.1 | v1.0.2 |
| v1.0.2 | v1.0.3 |

Patch (`v1.0.x`) = small fixes, copy, icons bundled in JS/native assets.  
Minor (`v1.1.0`) = new features.  
Major (`v2.0.0`) = breaking changes.

### 4.4 Step 3 — Rebuild the APK

Always rebuild **after** your code changes so the APK includes the latest bundle:

```bash
cd "e:/App development/NoteManagerApp/android"
./gradlew assembleRelease
```

### 4.5 Step 4 — New GitHub Release

**Website:** Releases → **Draft a new release** → new tag `v1.0.3` → attach fresh `app-release.apk`.

**CLI:**

```bash
gh release create v1.0.3 \
  "android/app/build/outputs/apk/release/app-release.apk" \
  --title "v1.0.3 - Short title" \
  --notes "- Updated seed notes\n- Fixed app icon"
```

### 4.6 What changes need a new APK?

| Change type | New APK needed? | Push code only? |
|-------------|-----------------|-----------------|
| `src/**/*.ts`, `src/**/*.tsx`, `App.tsx` | **Yes** | Yes |
| `src/data/seedNotes.ts` | **Yes** | Yes |
| Android icons (`res/mipmap-*`) | **Yes** | Yes |
| iOS icons only | No for Android APK | Yes |
| `README.md`, docs only | No | Yes |

JavaScript/TypeScript is bundled **into** the APK at build time. Pushing code alone does not update what users download from Releases until you build and upload a new APK.

### 4.7 Starter notes (`seedNotes.ts`)

Starter notes load **once**, when AsyncStorage is empty (first install).

To see updated seed text on a device that already ran the app:

- **Settings → Apps → NoteManagerApp → Clear storage**, or  
- Uninstall and reinstall the new APK

---

## Part 5 — Install APK on emulator (test)

### 5.1 Start emulator

```bash
emulator -list-avds
emulator -avd Pixel_9_Pro_API_35
```

### 5.2 Install

```bash
adb devices

adb install -r "e:/App development/NoteManagerApp/android/app/build/outputs/apk/release/app-release.apk"
```

`-r` = replace existing install.

### 5.3 Fresh install (see new seed notes)

```bash
adb shell pm clear com.notemanagerapp
adb shell monkey -p com.notemanagerapp -c android.intent.category.LAUNCHER 1
```

### 5.4 Download from GitHub Releases to emulator

1. Open the release page in a browser on the emulator, or  
2. Download `NoteManagerApp-v1.0.x.apk` on your PC and:

```bash
adb install -r path/to/NoteManagerApp-v1.0.2.apk
```

---

## Part 6 — Quick reference (copy-paste)

**Full ship (code + APK) after changes:**

```bash
cd "e:/App development/NoteManagerApp"

git add .
git commit -m "Your change summary"
git push origin main

cd android
./gradlew assembleRelease
cd ..

# Then create release v1.0.x on GitHub (website or gh)
```

**Release history for this project:**

| Tag | What shipped |
|-----|----------------|
| v1.0.0 | First APK |
| v1.0.1 | Custom app icon |
| v1.0.2 | Updated starter note copy |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `gradlew` fails | `cd android && ./gradlew clean && ./gradlew assembleRelease` |
| `adb: no devices` | Start emulator or plug in phone with USB debugging |
| Old icon on phone | Uninstall app, install new APK |
| Old seed notes text | `adb shell pm clear com.notemanagerapp` then reopen app |
| Push rejected | `git pull origin main` then push again |
| Release tag already exists | Use next version (e.g. v1.0.3), not the same tag |

---

## Related docs

- [commands.md](./commands.md) — Short command cheat sheet  
- [README.md](./README.md) — App features and structure
