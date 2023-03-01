// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/



function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string

  if(mCurrentIndex >= mImages.length){
    mCurrentIndex = 0;
  }

  if(mCurrentIndex < 0){
    mCurrentIndex = mImages.length-1;
  }

  document.getElementById('photo').src = mImages[mCurrentIndex].img;
	console.log('swap photo');
  var loc = document.getElementsByClassName('location');
  loc[0].innerHTML = "Location: " + mImages[mCurrentIndex].location;
  var des = document.getElementsByClassName('descirption');
  des[0].innerHTML = "Description: " + mImages[mCurrentIndex].description;
  var date = document.getElementsByClassName('date');
  date[0].innerHTML = "Date: " + mImages[mCurrentIndex].date;

  mLastFrameTime = 0;
  mCurrentIndex++;
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = "images.json";

//Function to get info from the json folder 
function getJson () {
  mRequest.onreadystatechange = function() {
    console.log("on ready state change");
    if(this.readyState == 4 && this.status == 200){
      mJson = JSON.parse(mRequest.responseText);
      iterateJson(mJson);
    }
  }
  mRequest.open("GET", mUrl, true);
  mRequest.send();
}

function iterateJson () {
  for(i = 0; i < mJson.images.length; i++){
    mImages[i] = new GalleryImage();
    mImages[i].local = mJson.images[i].imgLocation;
    mImages[i].description = mJson.images[i].description;
    mImages[i].date = mJson.images[i].date;
    mImages[i].img = mJson.images[i].imgPath;
  }
}
//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	getJson();
	// This initially hides the photos' metadata information
	// $('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage() {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
  var local;
	//2. description of photo
  var description;
	//3. the date when the photo was taken
  var date;
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
  var img;
}

//stopped at step 2.5