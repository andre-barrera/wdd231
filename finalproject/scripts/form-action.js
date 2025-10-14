// form-action.js
// Displays submitted data and tracks submission count using localStorage

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const resultDiv = document.getElementById("result");
  const countDisplay = document.getElementById("submission-count");

  // Retrieve submission count from localStorage
  let submissionCount = parseInt(localStorage.getItem("submissionCount")) || 0;

  if ([...params.keys()].length === 0) {
    resultDiv.innerHTML = `
      <p>No submission data found. Try submitting the form.</p>
      <a href="form.html" class="btn">Go Back</a>
    `;
  } else {
    // Increase submission count
    submissionCount++;
    localStorage.setItem("submissionCount", submissionCount);

    // Get form data
    const name = params.get("name") || "N/A";
    const email = params.get("email") || "N/A";
    const message = params.get("message") || "No message provided.";

    // Display results
    resultDiv.innerHTML = `
      <div class="submitted-data">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <a href="form.html" class="btn btn-primary">Submit Another</a>
      </div>
    `;
  }

  // Show submission count
  countDisplay.textContent = `Total Submissions on This Device: ${submissionCount}`;
});
