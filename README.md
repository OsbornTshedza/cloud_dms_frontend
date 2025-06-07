# 🎓 FutureEd Cloud DMS – Frontend (Phase 2)

This is the static frontend interface for the FutureEd Hub platform — a document management system designed for students and educators. The frontend is deployed on **Amazon S3** with global delivery via **CloudFront**, integrated with **Cognito** for authentication and backed by a serverless Flask API.

It allows users to upload, view, and manage educational documents via a clean, dashboard-like interface. CI/CD is handled by GitHub Actions with Slack alerting on deploy status.

---

## 🖥️ Technologies Used

- HTML, CSS, JavaScript
- AWS S3 (static site hosting)
- Amazon CloudFront (CDN)
- Amazon Cognito (Auth UI)
- GitHub Actions (CI/CD)
- Slack + CloudWatch (deployment alerts)

---

## 📂 Folder Structure

cloud_dms_frontend/

├── index.html # Main frontend entry point

├── css/

│  └── style.css # Styling and layout

├── js/

│   ├── script.js # Handles API calls and DOM logic

│   └── slideshow.js # Homepage slideshow functionality

├── static_image/ # Subject icons and other images

├── .github/workflows/

│  └── deploy.yml # CI/CD pipeline (S3 sync + CloudFront invalidation)

├── .gitignore

├── LICENSE

└── README.md # You are here

---

## ⚙️ Setup Instructions

> This frontend is designed to be deployed to an S3 static website bucket with CloudFront for distribution.
> 

### 1. Local Development

You can open the `index.html` file directly in a browser or serve via any static server:

```bash
cd cloud_dms_frontend
python3 -m http.server

```

Then visit `http://localhost:8000`

> Note: Some functionality (like API requests and redirects) only works properly when served over HTTPS via CloudFront + Cognito.
> 

---

## 🔐 GitHub Secrets Used (CI/CD)

Secrets are configured in the **cloud_dms_frontend** GitHub repository for GitHub Actions to deploy and secure the app.

| Secret Key | Purpose |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_REGION` | AWS region (e.g., `us-east-1`) |
| `S3_BUCKET_NAME` | Frontend S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | Used for cache invalidation |
| `SLACK_WEBHOOK_URL` | Sends deploy notifications to Slack |

---

## 🚀 CI/CD Pipeline (GitHub Actions)

The static frontend is deployed using a GitHub Actions workflow defined in:

.github/workflows/deploy.yml

### 🔁 Flow Summary:

1. Triggered on push to `main`
2. Syncs updated frontend files to S3
3. Invalidates CloudFront distribution cache
4. Notifies Slack with commit info and deploy status

✅ This ensures near real-time updates and visibility for the team without manual S3 uploads or console work.

---

## 🛡️ Authentication Flow (Cognito Integration)

This frontend integrates with **Amazon Cognito** to authenticate users (students/teachers) before accessing key routes.

### 🔄 Flow Overview:

- On page load, a script in `index.html` redirects users to the **Cognito-hosted login UI**.
- After successful login, Cognito redirects back to the CloudFront domain with tokens.
- The app does **not handle login/logout in backend** — all handled via frontend redirects.

> Currently, only email + password login is supported (no MFA or user groups yet).
> 
> 
> Token validation will be enforced via **API Gateway authorizers** in Phase 3.
> 

---

## 🌍 CloudFront & Caching Strategy

### ⚙️ Distribution Setup:

- Frontend is served via **CloudFront**, backed by the S3 static site bucket.
- HTTPS enforced with redirect from HTTP
- Default root object: `index.html`

### 💾 Cache Optimization:

- Custom cache policy: **CachingOptimized** for static sites
- Supports **gzip** and **brotli** compression
- **Invalidation** is triggered after each deploy using GitHub Actions

> Future improvements: add WAF for protection, set fine-grained TTL, explore signed URLs or cookies.
> 

---

## 📈 Observability & Notifications

While the frontend itself doesn’t log errors directly, observability is implemented through:

- ✅ **Slack Alerts** via GitHub Actions deploys
- ✅ **CloudFront access logs** (planned in Phase 3)
- ✅ **Manual cache invalidation hooks** (CI/CD integrated)

> Slack notifications display deploy status, commit info, and GitHub author for traceability and awareness.
> 

---

## ✅ Phase 2 Reflections

- ✅ Successfully migrated frontend from EC2 to **S3 static site hosting**
- ✅ Configured **CloudFront CDN** for global delivery with HTTPS
- ✅ Integrated **Cognito Auth UI** for frontend-only login flow
- ✅ Implemented **GitHub Actions CI/CD** for push-to-deploy workflows
- ✅ Connected **Slack webhook** for deploy alerts and observability

> This phase emphasized automation, access control, and visibility — ensuring a scalable and professional frontend delivery system.
> 

---

## 🔮 What’s Next (Phase 3)

- 🛂 API Gateway JWT Authorizers for frontend API protection
- 🤖 AI-powered frontend search/indexing using SageMaker + Bedrock
- 🧠 UI improvements based on feedback and real user flows
- 📜 Enable CloudFront access logs + WAF for compliance visibility

---

## 🙌 Author

### **Osborn Tshedza**

Cloud / DevOps Engineer In Training

🔗 [Medium Blog](https://medium.com/@osborntshedza)

🔗 [LinkedIn](https://www.linkedin.com/in/osborn-tshedza-nethathe-503679122)

---

## 📜 License

MIT License – see `LICENSE` file.
