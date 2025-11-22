# 🎯 HOW TO RUN POP ACADEMY

## ✅ Quick Start (3 Easy Methods)

### Method 1: Double-Click HTML File (EASIEST - RECOMMENDED)
1. Navigate to: `PopAcademyDesktop` folder
2. Double-click `launcher.html` OR `index.html`
3. Your default browser will open with Pop Academy
4. Login and start exploring!

**This method works perfectly for all features!**

---

### Method 2: Open in Web Browser Directly
1. Open your favorite web browser (Chrome, Edge, Firefox, etc.)
2. Press `Ctrl + O` (Cmd + O on Mac)
3. Navigate to and select: `PopAcademyDesktop/launcher.html`
4. Click "Launch App" button
5. Done!

---

### Method 3: Use Electron Desktop App
```bash
# Method A: Using npm (if PowerShell allows)
npm start

# Method B: Using batch file
start.bat

# Method C: Direct electron command
node_modules\.bin\electron.cmd .
```

**Note:** If you get PowerShell execution policy errors, use Method 1 or 2 instead!

---

## 🎓 First Time Login

### As Student:
1. Click "Student" tab
2. Enter your name (e.g., "John Doe")
3. (Optional) Enter a student ID
4. Click "Start Learning"
5. Browse courses and start learning!

### As Admin:
1. Click "Admin" tab
2. Enter password: `2004`
3. Click "Login as Admin"
4. You can now add/edit/delete content!

---

## ✅ Content Verification

Want to verify all 6 courses, 12 videos, 60 lesson plans are loaded?

### Visual Check:
1. Login as Admin (password: 2004)
2. Go to "Courses"
3. You should see 6 courses
4. Click each course to see all content

### Console Check:
1. Open the app
2. Press `F12` or `Ctrl+Shift+I` (Developer Tools)
3. Go to "Console" tab
4. Copy and paste content from `verify-content.js`
5. Press Enter
6. You'll see a detailed breakdown!

---

## 📦 What's Pre-Loaded

✅ **6 Courses:**
- Right Brain Development 🦁
- Handwriting Mastery ✍️
- Phonics & Reading 📖
- Visual Math 🧮
- Memory Training 🧠
- Art & Creativity 🎨

✅ **12 Videos** (2 per course)
✅ **3 PDFs** (Right Brain Guide, Handwriting Sheets, Phonics Workbook)
✅ **60 Lesson Plans** (10 per course, all with PDF data)
✅ **27+ Brain Training Games**

---

## 🎮 Try These Games

Once logged in:
1. Click any course (e.g., "Right Brain Development")
2. Click "Games" tab
3. Click "PLAY" on any game:
   - Speed Reaction
   - Memory Training
   - Pattern Match
   - Visual Memory
   - Math Speed
   - And many more!

---

## 🛠️ Troubleshooting

### "Nothing happens when I click start.bat"
→ Use Method 1 (double-click launcher.html or index.html)

### "Content not showing"
→ Clear browser cache and reload
→ Check localStorage in DevTools (F12 → Application → Local Storage)

### "Can't login"
→ For admin, password is exactly: `2004`
→ For student, just enter any name

### "Videos not playing"
→ These are YouTube embed examples
→ Admin can replace with real video URLs

---

## 📁 Important Files

- `launcher.html` - Beautiful landing page (OPEN THIS FIRST!)
- `index.html` - Main application
- `README.md` - Complete documentation
- `CONTENT_SUMMARY.md` - All template content details
- `verify-content.js` - Content verification script
- `start.bat` - Windows launcher (if npm doesn't work)

---

## 🎯 Recommended Workflow

1. **Open** `launcher.html` in browser
2. **Login** as Student first to explore
3. **Click** on courses to see videos, PDFs, games
4. **Play** some brain training games
5. **Check** your profile for progress
6. **Login** as Admin to customize content

---

## 💡 Pro Tips

- **Use Chrome/Edge** for best compatibility
- **Keep DevTools open** (F12) to see any errors
- **Export database** (admin feature) to backup your progress
- **All data persists** - your progress is saved in browser
- **Works offline** - no internet needed after first load

---

## 🚀 Next Steps

1. ✅ Open launcher.html in browser
2. ✅ Login and explore all 6 courses
3. ✅ Try some brain training games
4. ✅ View your progress in Profile
5. ✅ Login as admin to customize

---

**Need Help?**
- Check `README.md` for full documentation
- See `CONTENT_SUMMARY.md` for content details
- Runnerify-content.js` in browser console

---

## 🎉 You're All Set!

Everything is **pre-loaded and ready to go**!

Just open `launcher.html` and start exploring! 🦁

---

**Password Reminder:**
- Admin: `2004`
- Student: No password needed, just enter your name
