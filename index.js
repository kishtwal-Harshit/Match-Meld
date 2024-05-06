//import OpenAI from "openai";

//require("dotenv").config();

/*const openAIClient = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
})

//chat completion
const chatCompletion = await openAIClient.chat.com.completions.create({
    model : "gpt-3.5-turbo",
    messages : [
        {
            role : "system",
            content : "You are Helpful Assistent."
        },
        {
            role : "user",
            content : "What is meaning of life?"
        },
        {
            content : "The meaning of life is 42.",
            role : "assistant"
        },
        {
            role : "user",
            content : "What is really the meaning of life?"
        }
    ]
})*/
// Function to scroll to the bottom of the page

function scrollToBottom() {
    const height = document.body.scrollHeight;
    window.scrollTo({
        top: height,
        behavior: 'smooth'
    });
}
let application = '';
// Function to handle file input change
function handleFileInputChange(event) {
    console.log('File input change event triggered!');
    const fileInput = event.target;
    const file = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;
    if (!file) {
        console.error('No file selected!');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        console.log('Reader onload triggered!');
        const data = event.target.result;
        // Load the PDF document
        pdfjsLib.getDocument({ data }).promise.then(function(pdf) {
            let fullText = ''; // Initialize a variable to store the full text
            let promises = []; // Array to hold promises for each page text
            // Iterate through each page of the PDF document
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                // Create a promise for the text content of the page
                let promise = pdf.getPage(pageNum).then(function(page) {
                    return page.getTextContent().then(function(textContent) {
                        // Extract text from textContent object
                        const textItems = textContent.items;
                        const text = textItems.map(item => item.str).join(' ');
                        fullText += `Page ${pageNum}: ${text}\n\n`; 
                    });
                });
                promises.push(promise); 
            }
            Promise.all(promises).then(function() {
                application = fullText;
                console.log(fullText);
                run().catch(error => {
                    console.error('Error:', error);
                  });
            });
        }).catch(function(error) {
            console.error('Error loading PDF:', error);
        });
    };
    reader.readAsArrayBuffer(file); 
}

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener("change", handleFileInputChange);

const aboutButton = document.querySelector('#navTag1');
aboutButton.addEventListener('click', scrollToBottom);


import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyA4xnNiOz63jNzUYv5h1PMyIFPe5eNZr9k';

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function run() {
  
  const nameOfApplicant = `give name of the applicant in ${application}`;
  const result0 = await model.generateContent(nameOfApplicant);
  const response0 = await result0.response;
  const text0 = response0.text();

  const prompt = `5 suggestions to improve this application : ${application}`;
  //const prompt = `skills of the candidate mentioned in : ${application}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const submit = document.querySelector(".submit");
  submit.addEventListener("click",()=>{
    
    displaySuggestions(text,text0);
    
})
}
/*function displaySuggestions(text,text0) {
    const suggestionsDivHeading = document.createElement("h2");
    suggestionsDivHeading.classList.add("suggestions");
    suggestionsDivHeading.innerHTML = `WELCOME ${text0}`;
    const suggestionsDiv = document.createElement("div");
    suggestionsDiv.classList.add("suggestions");
    suggestionsDiv.innerHTML = text.replace(/\n/g, "<br>"); 
    document.querySelector(".rightSection").appendChild(suggestionsDivHeading);
    //document.querySelector(".rightSection").appendChild(suggestionsDiv);

        const text1 = suggestionsDiv.textContent;
        suggestionsDiv.textContent = '';
    
        for (let i = 0; i < text1.length; i++) {
            setTimeout(function() {
                suggestionsDiv.textContent += text[i];
                document.querySelector(".rightSection").appendChild(suggestionsDiv);
            }, 5*i);
        }
    
}*/
/*function displaySuggestions(text, text0) {
    const suggestionsDivHeading = document.createElement("h2");
    suggestionsDivHeading.classList.add("suggestions");
    suggestionsDivHeading.innerHTML = `WELCOME ${text0}`;
    document.querySelector(".rightSection").appendChild(suggestionsDivHeading);

    const paragraphs = text.split("\n\n"); // Split text into paragraphs

    const suggestionsDiv = document.createElement("div");
    suggestionsDiv.classList.add("suggestions");
    document.querySelector(".rightSection").appendChild(suggestionsDiv);
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    if(mediaQuery.matches){
        suggestionsDivHeading.style.fontSize = "15px"; // Adjust the font size as needed
        suggestionsDiv.style.fontSize = "12px";
        suggestionsDiv.style.maxHeight = "80vh"; // Set maximum height
        suggestionsDiv.style.overflowY = "auto";
    }
    let currentIndex = 0;

    function appendNextParagraph() {
        if (currentIndex < paragraphs.length) {
            const paragraph = paragraphs[currentIndex];
            const paragraphDiv = document.createElement("div");
            paragraphDiv.innerHTML = paragraph.replace(/\n/g, "<br>");
            suggestionsDiv.appendChild(paragraphDiv);

            const text1 = paragraphDiv.textContent;
            paragraphDiv.textContent = '';

            for (let i = 0; i < text1.length; i++) {
                setTimeout(function () {
                    paragraphDiv.textContent += text1[i];
                }, 5 * i);
            }

            currentIndex++;
            setTimeout(appendNextParagraph, text1.length * 5 + 500); // Wait for the current paragraph to finish before appending the next one
        }
    }

    appendNextParagraph();
}*/
/*function displaySuggestions(text, text0) {
    const suggestionsDivHeading = document.createElement("h2");
    suggestionsDivHeading.classList.add("suggestions");
    suggestionsDivHeading.innerHTML = `WELCOME ${text0}`;
    document.querySelector(".rightSection").appendChild(suggestionsDivHeading);

    const paragraphs = text.split("\n\n"); // Split text into paragraphs

    const suggestionsDiv = document.createElement("div");
    suggestionsDiv.classList.add("suggestions");
    document.querySelector(".rightSection").appendChild(suggestionsDiv);
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    if(mediaQuery.matches){
        suggestionsDivHeading.style.fontSize = "15px"; // Adjust the font size as needed
        suggestionsDiv.style.fontSize = "12px";
        suggestionsDiv.style.maxHeight = "80vh"; // Set maximum height
        suggestionsDiv.style.overflowY = "auto";
    }
    let currentIndex = 0;

    function appendNextParagraph() {
        if (currentIndex < paragraphs.length) {
            const paragraph = paragraphs[currentIndex];
            const paragraphDiv = document.createElement("div");
            paragraphDiv.innerHTML = paragraph.replace(/\n/g, "<br>");
            suggestionsDiv.appendChild(paragraphDiv);

            const text1 = paragraphDiv.textContent;
            paragraphDiv.textContent = '';

            for (let i = 0; i < text1.length; i++) {
                setTimeout(function () {
                    paragraphDiv.textContent += text1[i];
                }, 5 * i);
            }

            currentIndex++;
            setTimeout(function() {
                suggestionsDiv.appendChild(document.createElement("br")); // Insert a line break after each paragraph
                appendNextParagraph();
            }, text1.length * 5 + 500); // Wait for the current paragraph to finish before appending the next one
        }
    }

    appendNextParagraph();
}*/
function displaySuggestions(text, text0) {
    const suggestionsDivHeading = document.createElement("h2");
    suggestionsDivHeading.classList.add("suggestions");
    suggestionsDivHeading.innerHTML = `WELCOME ${text0}`;
    document.querySelector(".rightSection").appendChild(suggestionsDivHeading);

    const suggestionsDiv = document.createElement("div");
    suggestionsDiv.classList.add("suggestions");
    document.querySelector(".rightSection").appendChild(suggestionsDiv);

    // Apply CSS styles for text alignment
    suggestionsDiv.style.textAlign = "justify";
    suggestionsDiv.style.textJustify = "inter-word"; // Ensures that words are spaced evenly

    const paragraphs = text.split("\n\n"); // Split text into paragraphs

    const mediaQuery = window.matchMedia("(max-width: 600px)");

    if (mediaQuery.matches) {
        suggestionsDivHeading.style.fontSize = "15px"; // Adjust the font size as needed
        suggestionsDiv.style.fontSize = "12px";
        suggestionsDiv.style.maxHeight = "80vh"; // Set maximum height
        suggestionsDiv.style.overflowY = "auto";
    }

    let currentIndex = 0;

    function appendNextParagraph() {
        if (currentIndex < paragraphs.length) {
            const paragraph = paragraphs[currentIndex];
            const paragraphDiv = document.createElement("div");
            paragraphDiv.innerHTML = paragraph.replace(/\n/g, "<br>");
            suggestionsDiv.appendChild(paragraphDiv);

            const text1 = paragraphDiv.textContent;
            paragraphDiv.textContent = '';

            for (let i = 0; i < text1.length; i++) {
                setTimeout(function () {
                    paragraphDiv.textContent += text1[i];
                }, 5 * i);
            }

            currentIndex++;
            setTimeout(function () {
                suggestionsDiv.appendChild(document.createElement("br")); // Insert a line break after each paragraph
                appendNextParagraph();
            }, text1.length * 5 + 500); // Wait for the current paragraph to finish before appending the next one
        }
    }

    appendNextParagraph();
}



