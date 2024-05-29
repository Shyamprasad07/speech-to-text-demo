// script.js

document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const clearBtn = document.getElementById('clear-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const textField = document.getElementById('text-field');

    // Check if the browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
        alert("Sorry, your browser doesn't support speech recognition.");
    } else {
        // Initialize the Web Speech API
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        // Start speech recognition
        startBtn.addEventListener('click', () => {
            recognition.start();
        });

        // Stop speech recognition
        stopBtn.addEventListener('click', () => {
            recognition.stop();
        });

        // Clear the text field
        clearBtn.addEventListener('click', () => {
            textField.value = '';
        });

        // Process the results
        recognition.onresult = function (event) {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = 0; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            textField.value = finalTranscript + interimTranscript;
        };

        // Handle errors
        recognition.onerror = function (event) {
            console.error(event.error);
        };

        // Stop recognition when done
        recognition.onend = function () {
            console.log('Speech recognition service disconnected');
        };
    }

    // Download the content of the text field as a PDF
    downloadPdfBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const text = textField.value;
        doc.text(text, 10, 10);
        doc.save('speech_to_text.pdf');
    });
});
