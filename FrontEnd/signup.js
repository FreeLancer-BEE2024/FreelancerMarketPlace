// // signup.js
// document.addEventListener("DOMContentLoaded", () => {
//   const signupForm = document.querySelector(".signup-form form");

//   signupForm.addEventListener("submit", async (event) => {
//       event.preventDefault();

//       const formData = new FormData(signupForm);
//       const data = {
//           firstName: formData.get("first-name"),
//           lastName: formData.get("last-name"),
//           email: formData.get("email"),
//           password: formData.get("password"),
//       };

//       try {
//           const response = await fetch("http://localhost:3000/api/signup", {

//               method: "POST",
//               headers: {
//                   "Content-Type": "application/json",
//               },
//               body: JSON.stringify(data),
//           });
//           console.log(response);
//           console.log("jiii");

//           const result = await response.json();

//           if (response.ok) {
//               alert(result.message);
//               window.location.href = "index.html";
//           } else {
//               alert(`Error: ${result.message}`);
//           }
//       } catch (error) {
//           console.error("Error during signup:", error);
//           alert("An error occurred during signup. Please try again.");
//       }
//   });
// });




// signup.js
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector(".signup-form form");
  
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        const formData = new FormData(signupForm);
        const data = {
            firstName: formData.get("first-name"),
            lastName: formData.get("last-name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };
  
        try {
            const response = await fetch("http://localhost:3000/api/signup", {
  
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
          //   console.log(response);
          //   console.log("jiii");
          const result = await response.json();
  
            if (response.ok) {
                alert(result.message);
                window.location.href = "login.html";
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup. Please try again.");
        }
    });
  });