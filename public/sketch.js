// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let mobilenet;

// A variable to hold the image we want to classify
let img;
let video;
let label = '';
let confidence = '';
let displayed;

let promptData;
let randomPrompt = 1; //random number to pull random prompt
let accepted;
let trigger = false;
let green = false;

fetch("prompts.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    promptData = data.prompts;
    accepted = promptData[randomPrompt].accepted; //1 needs to be prompt object index
    console.log(accepted);
    trigger = true;
  })
//

// function acceptedMatch() {
//   console.log('triggered');
//   // Check if the input word matches any word in the array
// }

function modelReady() {
  console.log("Model ready");
  mobilenet.predict(gotResult);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    let resultLabel = results[0].label;
    label = resultLabel.split(', ')[0];
    confidence = round(results[0].confidence * 100, 2);
    displayed = label + ', ' + confidence
    // console.log(displayed);
    mobilenet.predict(gotResult);

    //check against prompts.json
    if (trigger) {
      for (let i = 0; i < accepted.length; i++) { //length of prompt accepted words
        if (label === accepted[i]) {
          green = true;
          console.log('Label: '+ label + ', Accepted: ' + accepted[i]);
          console.log('MATCH');

        } else {
          console.log('The word does not match any word in the array.');
        }
      }
    }
  }
}

let ratio = 1440 / 1080; 
let l;
let h;

//#Source: Dan Shiffman
function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();

    if (windowWidth / windowHeight > ratio) {
        l = windowWidth;
        h = l /ratio;
        //console.log("a");

    } else {
    h = windowHeight;
        l = h*ratio;
  }
  imageMode(CENTER);

  // capture.elt.setAttribute('playsinline', ''); // add this for iphone compatibility

  mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
  background(0);
  image(video, width / 2, height / 2, l/2, h/2);
  if (green) {
    fill(0,255,0);
    green = false;
  } else {
    fill(255);
  }
  textSize(32);
  textAlign(CENTER, CENTER);
  text(displayed, width / 2, height - 150);
}

//pulling prompt data
// async function fetchPromptData() {
//   try {
//       const response = await fetch('prompts.json'); // Replace with the correct path to your JSON file
//       if (!response.ok) {
//           throw new Error('Failed to fetch JSON data');
//       }
//       const jsonData = await response.json();
//       return jsonData;
//   } catch (error) {
//       console.error(error);
//       return null;
//   }
// }

// async function getRandomPrompt() {
//   const promptData = await fetchPromptData();
//   console.log(promptData);
// }

//gallery page? 
// function preload() {
// }

