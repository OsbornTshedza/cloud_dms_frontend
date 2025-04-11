# 🌐 Cloud DMS – Frontend

This is the **frontend dashboard** for the Cloud-based Document Management System (DMS), designed to interact with a Flask backend hosted on AWS EC2 and connected to S3 + RDS.

---

## 🖥️ Overview

The frontend is a **static HTML/CSS/JS-based dashboard**, served on an EC2 instance using Python’s simple HTTP server.

It enables:
- 📂 Document upload to S3
- 🗞️ Metadata tagging (subject + description)
- 📄 Indexed file listing from MySQL (RDS)
- 🔍 Live search and filtering of documents
- 💬 Motto, subjects grid, and responsive layout

---

## 📁 Folder Structure

```
cloud-dms-frontend/
└── index.html               # Main UI
├── css/ 
│   └── style.css            # Dashboard styling
├── js/ 
│   ├── script.js          # File upload + metadata
│   └── slideshow.js       # Homepage slideshow
├── static_image/            # Icons, subject images, banners
└── .gitignore              # Ignored runtime + logs
```

---

## ⚙️ Running Locally or on EC2

You can serve the frontend using Python’s built-in HTTP server:

```bash
# Serve from root folder (where index.html is)
python3 -m http.server 8000
```

For background serving (on EC2):

```bash
nohup python3 -m http.server 8000 &
```

---

## 🚀 Deployment Notes

This frontend is served as static content on an EC2 instance. In a production-ready setup, you may:

- ✅ Move static hosting to **Amazon S3 + CloudFront**
- ✅ Secure with **HTTPS via Nginx**
- ✅ Integrate with a **CI/CD pipeline** for auto-deploys

---

## 💡 Next Steps (Phases 2 & 3)

- 🔁 Dynamic routing & componentizatin (React or JS frameworks)
- 🗂️ Static hosting via Amazon S3 + CloudFront + Route 53
- 🤖 Advanced search using NLP/ML
- 🧑‍🏫 Role-based dashboards for teachers & learners
- 🚀 CI/CD deployment for static frontend (GitHub Actions + S3)

---

## 👤 Author

**Osborn Tshedza**  
Cloud, DevOps & MLOps Student Engineer  
🔗 [LinkedIn](https://www.linkedin.com/in/YOUR-LINK) | [Blog](https://yourblog.com)

---


