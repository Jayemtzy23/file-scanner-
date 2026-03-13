# 📱 Paano Gamiton sa Cellphone

## Una nga Lakang: I-setup

### Opsyon 1: Gamiton Online (Pinaka-Sayon)
1. I-upload ang tanan nga files (index.html, app.js, styles.css) sa web hosting
   - Pwede gamiton: GitHub Pages, Netlify, o Vercel (libre)
2. Ablihi ang link sa imong phone browser
3. Ready na!

### Opsyon 2: Local Testing (Para sa Development)
1. I-install ang Python sa imong computer
2. Ablihi ang Command Prompt/Terminal
3. Adto sa folder diin naa ang files:
   ```
   cd path/to/your/folder
   ```
4. Run ang command:
   ```
   python -m http.server 8000
   ```
5. Sa imong phone, konektahi sa same WiFi
6. Ablihi ang browser ug type: `http://[IP-ADDRESS]:8000`
   - Para makit-an ang IP: sa computer, type `ipconfig` (Windows) o `ifconfig` (Mac/Linux)

---

## Paggamit sa System

### 1️⃣ I-scan ang Document

**Gamit ang Camera:**
1. Ablihi ang website sa phone browser
2. I-tap ang **"📷 Open Camera"** button
3. Tugoti ang browser nga makagamit sa camera (Allow)
4. I-point ang camera sa document
5. I-tap ang **"📸 Capture"** button
6. Uliton para sa sunod nga page
7. I-tap ang **"✕ Close"** kung human na

**Gamit ang Gallery/Files:**
1. I-tap ang **"📁 Upload Files"** button
2. Pilia ang mga pictures gikan sa gallery
3. Pwede multiple pictures at once

### 2️⃣ I-organize ang Document

1. I-type ang **Document Title** (example: "Birth Certificate - Juan Dela Cruz")
2. Pilia ang **Category**:
   - Legal Documents
   - Financial Records
   - Personnel Files
   - Correspondence
   - Reports
   - Other
3. I-type ang **Reference Number** (optional)

### 3️⃣ I-generate ang PDF

1. I-tap ang **"Generate PDF"** button
2. Hulaton gamay (mag-process)
3. Success! Makita na nimo sa list sa ubos

### 4️⃣ I-manage ang Documents

**Para i-download:**
- I-tap ang **"Download"** button
- Ma-save sa Downloads folder sa phone

**Para i-search:**
- I-type sa search box ang title o reference number

**Para i-filter:**
- Pilia ang category sa dropdown

**Para i-delete:**
- I-tap ang **"Delete"** button
- Confirm

---

## ⚠️ Important Notes

### Camera Permissions
- First time mo-gamit, mo-ask ang browser ug permission
- I-tap ang **"Allow"** para makagamit sa camera
- Kung dili mo-gana:
  1. Adto sa Settings > Apps > Browser
  2. I-enable ang Camera permission

### Storage
- Ang documents ma-save sa browser storage
- Dili mawala bisan i-close ang browser
- Pero kung i-clear ang browser data, mawala
- Para permanent storage, i-download ang PDFs

### Best Practices
- Gamiton ang likod nga camera (mas clear)
- Siguroha nga bright ang lugar
- I-flat ang papel sa table
- I-capture straight, dili slanted
- Check preview before generating PDF

### Compatibility
- ✅ Chrome (Android/iOS)
- ✅ Safari (iOS)
- ✅ Firefox (Android)
- ✅ Edge (Android)

### Troubleshooting

**Dili mo-gana ang camera:**
- Check permissions sa browser settings
- Try i-refresh ang page
- Gamiton ang "Upload Files" instead

**Dili ma-generate ang PDF:**
- Check kung naa bay internet (para sa jsPDF library)
- Try i-refresh ang page
- Check kung naa pay storage sa phone

**Hinay kaayo:**
- Gamay lang ang pictures per document
- Compress ang images before upload
- Clear browser cache

---

## 💡 Tips para sa Government Use

1. **Organize by Category** - Gamiton ang categories para dali pangitaon
2. **Use Reference Numbers** - I-include ang document numbers
3. **Regular Backups** - I-download ang PDFs regularly
4. **Clear Naming** - Gamiton clear ug descriptive titles
5. **Quality Check** - Check ang PDF before i-save officially

---

## 🔒 Security Reminder

- Ang system nag-store locally sa phone
- Dili ni mo-upload sa internet automatically
- Para sa sensitive documents, i-download dayon ug i-store sa secure location
- Para sa production use, i-add ang authentication ug server-side storage
