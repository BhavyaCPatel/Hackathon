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
saveButton.addEventListener('click', function () {
    if (canvasElement.style.display === 'block') {
        const imageDataURL = canvasElement.toDataURL('image/png');
        localStorage.setItem('capturedPhoto', imageDataURL);
        alert('Photo saved to local storage.');
        canvasElement.style.display = 'none';
    } else {
        alert('No photo to save. Capture a photo first.');
    }
});
