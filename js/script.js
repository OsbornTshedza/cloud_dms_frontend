document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileInput");
    const subjectInput = document.getElementById("subject");
    const descriptionInput = document.getElementById("description");
    const uploadStatus = document.getElementById("uploadStatus");
    const fileList = document.getElementById("fileList");
    const indexedFileList = document.getElementById("indexedFileList");
    const searchInput = document.getElementById("searchInput");

    // Cognito Config
    const COGNITO_DOMAIN = "https://us-east-1pgtkjvlse.auth.us-east-1.amazoncognito.com";
    const CLIENT_ID = "2sl6a1ask8nci394q48247tbks";
    const REDIRECT_URI = "https://d1momlis22uy3v.cloudfront.net";

    // Add Cognito login/logout handlers
    const loginButton = document.getElementById("login-btn");
    const logoutButton = document.getElementById("logout-btn");

    if (loginButton) {
        loginButton.addEventListener("click", () => {
            const loginUrl = `${COGNITO_DOMAIN}/login?client_id=${CLIENT_ID}&response_type=code&scope=email+openid+phone&redirect_uri=${REDIRECT_URI}`;
            window.location.href = loginUrl;
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            const logoutUrl = `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${REDIRECT_URI}`;
            window.location.href = logoutUrl;
        });
    }

    // API Gateway Base URL
    const API_BASE_URL = "https://nizww8mhtd.execute-api.us-east-1.amazonaws.com/prod";

    let allIndexedDocs = []; // ⬅️ Store for search filter

    // Fetch S3 file list (optional)
    function fetchFiles() {
        fetch(`${API_BASE_URL}/files`)
            .then(response => response.json())
            .then(data => {
                fileList.innerHTML = "";

                if (!data.files || data.files.length === 0) {
                    fileList.innerHTML = "<p>No files found.</p>";
                    return;
                }

                data.files.forEach(file => {
                    const li = document.createElement("li");
                    li.innerHTML = `<a href="${file.url}" target="_blank">${file.name}</a>`;
                    fileList.appendChild(li);
                });
            })
            .catch(error => {
                console.error("Error fetching files:", error);
                fileList.innerHTML = "<p>Error loading files.</p>";
            });
    }

    // Fetch and store indexed documents
    function fetchIndexedDocuments() {
        fetch(`${API_BASE_URL}/indexed-documents`)
            .then(res => res.json())
            .then(data => {
                if (!data.documents || data.documents.length === 0) {
                    indexedFileList.innerHTML = "<p>No indexed documents available.</p>";
                    return;
                }

                allIndexedDocs = data.documents; // Store for search
                renderIndexedDocuments(data.documents);
            })
            .catch(err => {
                console.error("Error fetching indexed documents:", err);
                indexedFileList.innerHTML = "<p>Error loading documents.</p>";
            });
    }

    // Render document cards
    function renderIndexedDocuments(docs) {
        indexedFileList.innerHTML = "";

        docs.forEach(doc => {
            const card = document.createElement("div");
            card.className = "doc-card";
            card.innerHTML = `
                <h4>${doc.filename}</h4>
                <p><strong>Subject:</strong> ${doc.subject}</p>
                <p><strong>Description:</strong> ${doc.description || "—"}</p>
                <p><strong>Uploaded:</strong> ${new Date(doc.upload_date).toLocaleString()}</p>
                <a href="${doc.file_url}" target="_blank">📄 View Document</a>
            `;
            indexedFileList.appendChild(card);
        });
    }

    // Live search listener
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();

        const filtered = allIndexedDocs.filter(doc =>
            doc.filename.toLowerCase().includes(query) ||
            doc.subject.toLowerCase().includes(query) ||
            (doc.description && doc.description.toLowerCase().includes(query))
        );

        renderIndexedDocuments(filtered);
    });

    // Upload form submission
    uploadForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!fileInput.files.length) {
            uploadStatus.innerHTML = "<p style='color: red;'>Please select a file first.</p>";
            return;
        }

        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        formData.append("subject", subjectInput.value);
        formData.append("description", descriptionInput.value);

        fetch(`${API_BASE_URL}/upload`, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    uploadStatus.innerHTML = `<p style='color: red;'>Upload failed: ${data.error}</p>`;
                } else {
                    uploadStatus.innerHTML = `<p style='color: green;'>Upload successful: <a href="${data.file_url}" target="_blank">View</a></p>`;
                    fileInput.value = "";
                    subjectInput.value = "General";
                    descriptionInput.value = "";
                    fetchFiles();
                    fetchIndexedDocuments();
                }
            })
            .catch(error => {
                console.error("Upload error:", error);
                uploadStatus.innerHTML = "<p style='color: red;'>An error occurred while uploading.</p>";
            });
    });

    // Initial page load
    fetchFiles();
    fetchIndexedDocuments();
});
