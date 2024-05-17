// Define the custom admin page content
function renderCustomAdminPage() {
    const container = document.getElementById('custom-admin-page-root');
    container.innerHTML = `
      <div>
        <h1>Welcome to the Admin Panel</h1>
        <p>This is a custom admin page.</p>
      </div>
    `;
  }
  
  // Call the function to render the custom admin page content
  renderCustomAdminPage();
  