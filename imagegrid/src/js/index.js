import Unsplash, { toJson } from "unsplash-js";


/*  FIY - Note about Unsplash api FAQ the free version of this api only allows 50 calls per hour  */
let unsplash = new Unsplash({
  applicationId: "7de502692386dd87e239f582371126e5f163efc32b120541b14244d38d4ea833",
  secret: "204e539a19249fdbe580fc101a54371d7fb8d4a8181880642f21da851360bedd",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

var choice = document.getElementById("choice");
var galleryDiv = document.getElementById("thumb");
var submitBtn = document.getElementById("submit-btn");
var imgArray = [];
var nameArray = [];
var linkArray = [];
var idArray = [];
var gallerySelection="flowers"; // inital gallery choice
var imgAmount = 20; // amount of images
var imgPage = 1; // image page number from unsplash


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}



submitBtn.addEventListener("click",function(){

var randomNum = Math.round(getRandomArbitrary(1, 5));
   if (galleryDiv.hasChildNodes()){

        nameArray = [];
        linkArray = [];
        imgPage = randomNum;
        console.log( imgPage+" - this is the page number");
         while (galleryDiv.firstChild) {
          galleryDiv.removeChild(galleryDiv.firstChild);
          
         }
        
        
        
   }

    gallerySelection = choice.value.toString();
   initGallery(gallerySelection);
});



function initGallery(gallery){

 setTimeout(function(){
         galleryDiv.innerHTML = "Gallery could not be created the server may have reached its allotment of being called 50 times or gallery could not be found."
      },60000);

unsplash.search.photos(gallery, imgPage, imgAmount)
  .then(toJson)
  .then(json => {
      
     
       if(json.results.length === 0){
        
         galleryDiv.innerHTML = "Gallery could not be created the server may have reached its allotment of being called 50 times or gallery could not be found."
       }else{

           for (var i=0;i< json.results.length; i ++){

     
       var thumb = json.results[i].urls.small; // thumbnail image
       var lgImg = json.results[i].urls.regular; //lg image
       var userName = json.results[i].user.username; // user name
       var linkUrl = json.results[i].user.links.html; // link to unsplash homepage
       var imgId = json.results[i].id; // image id

       imgArray.push(lgImg);
       nameArray.push(userName);
       linkArray.push(linkUrl);

       // creating the text information for the thumbnail
        var textDiv = document.createElement("div");
        var photoHeader = document.createElement("h1");
        var photoUrl = document.createElement("p");
        var photoLink = document.createElement("a");

        // setting up url link back to unsplash user page
        photoLink.setAttribute('href',linkArray[i]);
        photoLink.setAttribute('target','_blank');
        photoLink.innerHTML= linkArray[i];

        photoLink.id = "url-"+i.toString();
        photoLink.appendChild(photoUrl);
        photoHeader.innerHTML = "photo by - "+ nameArray[i];
    
        textDiv.classList.add('thumbDescription');
        textDiv.appendChild(photoHeader);
        textDiv.appendChild(photoLink);

       // creating the thumbnail
       var thumbHeight = "300px";
       var thumbWidth = "300px";
       var img = document.createElement("img");
       var imgDiv = document.createElement("div");
       img.setAttribute("src",thumb); 
       img.style.objectFit = "cover";
       img.setAttribute("width","300");
       img.setAttribute("height","300");
       img.style.padding = "10px";

       imgDiv.style.width = thumbWidth;
       imgDiv.style.height = thumbHeight;
       imgDiv.id = i;
       imgDiv.style.display = "inline-block";
       imgDiv.style.overflow = "hidden";
       imgDiv.appendChild(img);
       imgDiv.appendChild(textDiv);
  
       galleryDiv.appendChild(imgDiv);

      // console.log(linkArray[i]);

     
      
   }


       }
   
    
   
  
    });

}

initGallery(gallerySelection);
