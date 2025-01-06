let lastScrollTop = 0; // Store the last scroll position
const header = document.querySelector('header'); // Select the header element

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)'; // Hide the header
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)'; // Show the header
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  let currentIndex = 0;

  // Function to show the image in the lightbox
  function showImage(index) {
      currentIndex = index;
      lightboxImg.src = galleryItems[currentIndex].src; // Set the clicked image as the lightbox image
      lightbox.style.display = 'flex'; // Show lightbox
  }

  // Open lightbox when image is clicked
  galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
          showImage(index); // Show the clicked image
      });
  });

  // Close lightbox
  closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none'; // Hide lightbox
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
          lightbox.style.display = 'none';
      }
  });

  // Function to move to the next image
  function nextImage() {
      currentIndex = (currentIndex + 1) % galleryItems.length; // Loop to the first image after the last one
      showImage(currentIndex);
  }

  // Function to move to the previous image
  function prevImage() {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; // Loop to the last image if on the first one
      showImage(currentIndex);
  }

  // Event listeners for left and right buttons
  nextBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent lightbox from closing when clicking the button
      nextImage();
  });
  
  prevBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent lightbox from closing when clicking the button
      prevImage();
  });

  // Keyboard navigation (optional)
  document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
          if (e.key === 'ArrowRight') {
              nextImage();
          } else if (e.key === 'ArrowLeft') {
              prevImage();
          }
      }
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting the default way

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // Here you can handle the form submission (e.g., via AJAX or API call)
            alert('Form submitted successfully!');
            form.reset(); // Reset the form fields
        } else {
            alert('Please fill out all required fields.');
        }
    });
});
//Chatbot
document.addEventListener("DOMContentLoaded", () => {
    const chatbotButton = document.getElementById("chatIcon");
    const chatbotPopup = document.getElementById("chatbotPopup");
    const closeButton = document.getElementById("closeButton");
    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");
    const chatMessage = document.getElementById("chatMessage");
    const imageUpload = document.getElementById("imageUpload");

    // Toggle Chatbot Popup
    chatbotButton.addEventListener("click", () => {
        const isChatVisible = chatbotPopup.style.display === "flex";
        chatbotPopup.style.display = isChatVisible ? "none" : "flex";
        chatbotButton.style.display = isChatVisible ? "block" : "none";
        if (!isChatVisible) {
            resetChat();
            displayMessage("Hello! What kind of cake are you looking for? For example, we have chocolate, vanilla, and fruit cakes.", "botMessage");
        }
    });

    closeButton.addEventListener("click", () => {
        chatbotPopup.style.display = "none";
        chatbotButton.style.display = "block";
        resetChat();
    });

    // Send Message
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            displayMessage(message, "userMessage");
            userInput.value = "";
            handleConversation(message);
        }
    }

    function resetChat() {
        userInput.value = "";
        chatMessage.innerHTML = "";
    }

    function displayMessage(message, type) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        messageElement.classList.add("chatMessage", type);
        chatMessage.appendChild(messageElement);
        chatMessage.scrollTop = chatMessage.scrollHeight;
    }

    // Placeholder for bot responses
    function handleConversation(message) {
        const response = "That's great! Let me assist you further.";
        displayMessage(response, "botMessage");
    }

    // Handle Image Upload
    imageUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                displayImage(e.target.result);
                imageUpload.value = "";
            };
            reader.readAsDataURL(file);
        }
    });

    function displayImage(imageSrc) {
        const imgMessage = document.createElement("div");
        imgMessage.classList.add("chatMessage", "userMessage");
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.style.maxWidth = "100%";
        imgMessage.appendChild(imgElement);
        chatMessage.appendChild(imgMessage);
        chatMessage.scrollTop = chatMessage.scrollHeight;
    }

    // Existing handleConversation function remains unchanged
    function handleConversation(message) {
        let response;
        const lowerMessage = message.toLowerCase(); // Normalize user input

        // State tracking for context awareness
        const preferences = {
            cakeType: null,
            sweetnessLevel: null,
            dietaryOptions: null,
            size: null,
        };

        // Analyze the user's message and update preferences
        function analyzeMessage() {
            // Check for cake type
            if (lowerMessage.includes("chocolate cake")) {
                preferences.cakeType = "chocolate";
                return "Yum! A chocolate cake is a great choice! 🎂 Would you like to customize it with any specific fillings or decorations?";
            } else if (lowerMessage.includes("vanilla cake")) {
                preferences.cakeType = "vanilla";
                return "Vanilla cake is classic and delicious! 🍰 Do you have a preferred frosting or decoration in mind?";
            } else if (lowerMessage.includes("fruit cake")) {
                preferences.cakeType = "fruit";
                return "Fruit cakes are refreshing! 🍓 What fruits would you like to include?";
            }

            // Check for sweetness level
            if (lowerMessage.includes("sweet") || lowerMessage.includes("sugar")) {
                preferences.sweetnessLevel = true; // Set a generic flag for sweetness
                return "How sweet do you want your cake to be? (e.g., mild, regular, extra sweet)";
            }

            // Check for dietary options
            if (lowerMessage.includes("gluten-free") || lowerMessage.includes("vegan")) {
                preferences.dietaryOptions = lowerMessage.includes("gluten-free") ? "gluten-free" : "vegan";
                return `Got it! We can prepare a ${preferences.dietaryOptions} cake. Do you have a preferred cake type?`;
            }

            // Check for size preferences
            if (lowerMessage.includes("small") || lowerMessage.includes("medium") || lowerMessage.includes("large")) {
                preferences.size = lowerMessage.includes("small") ? "small" : lowerMessage.includes("medium") ? "medium" : "large";
                return `Thank you for specifying the size! Would you like to add any specific decorations?`;
            }

            // If the message doesn't match known patterns, ask for more info
            return "I'm not sure how to help with that. Could you please specify the type of cake you're interested in?";
        }

        // Call the analyzeMessage function to determine the response
        response = analyzeMessage();

        // Display the response to the user
        displayMessage(response, "botMessage");

        // Log preferences to the console for debugging
        console.log(preferences);
    }
});