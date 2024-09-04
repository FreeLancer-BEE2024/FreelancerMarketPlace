document.addEventListener('DOMContentLoaded', () => {
    console.log("work.js is successfully loaded and running");
    const workForm = document.getElementById('workForm');
    const worksContainer = document.getElementById('worksContainer');
  
    // Fetch and display all works
    const fetchWorks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/works');
        const works = await response.json();
        worksContainer.innerHTML = ''; // Clear previous content
        works.forEach(work => {
          const workElement = document.createElement('div');
          workElement.innerHTML = `
            <h3>${work.title}</h3>
            <p>${work.description}</p>
            <p>Requirements: ${work.requirements}</p>
            <p>Duration: ${work.duration}</p>
            <p>Budget: $${work.budget}</p>
            <button onclick="deleteWork('${work._id}')">Delete</button>
          `;
          worksContainer.appendChild(workElement);
        });
      } catch (error) {
        console.error('Error fetching works:', error);
      }
    };
  
    // Handle form submission to create a new work
    workForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(workForm);
      const workData = {
        title: formData.get('title'),
        description: formData.get('description'),
        requirements: formData.get('requirements'),
        duration: formData.get('duration'),
        budget: parseFloat(formData.get('budget'))
      };
  
      try {
        const response = await fetch('http://127.0.0.1:3000/api/works', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(workData)
        });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          workForm.reset();
          fetchWorks(); // Refresh the list of works
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('Error creating work:', error);
      }
    });
  
    // Function to delete a work
    window.deleteWork = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/works/${id}`, { method: 'DELETE' });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          fetchWorks(); // Refresh the list of works
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('Error deleting work:', error);
      }
    };
  
    // Fetch and display works on page load
    fetchWorks();
  });