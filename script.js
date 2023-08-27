const videoElement = document.getElementById('camera-feed');
const captureButton = document.getElementById('capture-btn');
const saveButton = document.getElementById('save-btn');
const canvasElement = document.getElementById('photo-canvas');

// Check if the device is a mobile device
const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Get user media and set up video stream
navigator.mediaDevices
    .getUserMedia({ video: { facingMode: isMobileDevice ? 'environment' : 'user' } })
    .then(function (stream) {
        videoElement.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Error accessing the camera:', error);
    });

// Capture a photo from the video stream
captureButton.addEventListener('click', function () {
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    canvasElement.getContext('2d').drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    canvasElement.style.display = 'block';
});

// Save the captured photo to local storage
// ... other code ...

// Save the captured photo to the backend
saveButton.addEventListener('click', async function () {
    if (canvasElement.style.display === 'block') {
        const imageDataURL = canvasElement.toDataURL('image/png');

        try {
            const response = await fetch('/uploadImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imageUrl: imageDataURL })
            });

            if (response.ok) {
                alert('Photo saved successfully!');
                canvasElement.style.display = 'none';
            } else {
                alert('Failed to save photo.');
            }
        } catch (error) {
            console.error('Error saving image:', error);
            alert('An error occurred while saving the photo.');
        }
    } else {
        alert('No photo to save. Capture a photo first.');
    }
});

