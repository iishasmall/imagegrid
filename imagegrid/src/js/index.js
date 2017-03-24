import Unsplash, { toJson } from "unsplash-js";
import Log from "./Log";
import RandomNum from "./RandomNum";


/*  FIY - Note about Unsplash api FAQ the free version of this api only allows 50 calls per hour  */
let unsplash = new Unsplash({
  applicationId: "7de502692386dd87e239f582371126e5f163efc32b120541b14244d38d4ea833",
  secret: "204e539a19249fdbe580fc101a54371d7fb8d4a8181880642f21da851360bedd",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

let choice = document.getElementById("choice");
let galleryDiv = document.getElementById("thumb");
let submitBtn = document.getElementById("submit-btn");
let errorDiv = document.createElement("div");
let errorContainer = document.getElementById("error-container");
let imgArray = [];
let nameArray = [];
let linkArray = [];
let idArray = [];
let downloadArray = [];
let gallerySelection="blue"; // inital gallery choice
let imgAmount = 20; // amount of images
let imgPage = 1; // image page number from unsplash



submitBtn.addEventListener('click', evt =>{
let randNum = new RandomNum(1,5);

let randomNum = Math.round(randNum.getNum());

   if (galleryDiv.hasChildNodes()){

        nameArray = [];
        linkArray = [];
        downloadArray = [];
        imgPage = randomNum; 
       
         while (galleryDiv.firstChild) {
          galleryDiv.removeChild(galleryDiv.firstChild);
          
         }
        
    
        
   }

    gallerySelection = choice.value.toString();
   initGallery(gallerySelection);
});



let initGallery = (gallery) => {


unsplash.search.photos(gallery, imgPage, imgAmount)
  .then(toJson)
  .then(json => {
      
      const newlog = new Log(json.results);
      
      
       if(json.results.length === 0){
       
       
        let errorMsg = "errorMsgHere";
        errorDiv.innerHTML = errorMsg;
        errorDiv.id = "error-div";
        errorDiv.classList.add("error-div");
         errorContainer.appendChild(errorDiv);
       }else{

         if(errorContainer.contains(errorDiv)){
            errorContainer.removeChild(errorDiv);
         }
       
           for (let i=0;i< json.results.length; i ++){

     
       let thumb = json.results[i].urls.small; // thumbnail image
       let lgImg = json.results[i].urls.regular; //lg image
       let userName = json.results[i].user.username; // user name
       let linkUrl = json.results[i].user.links.html; // link to unsplash homepage
       let imgId = json.results[i].id; // image id
       let downloadImg = json.results[i].links.download; // download images link
   

       imgArray.push(lgImg);
       nameArray.push(userName);
       linkArray.push(linkUrl);
       downloadArray.push(downloadImg);
       
       // creating the text information for the thumbnail
        let textDiv = document.createElement("div");
        let photoHeader = document.createElement("h1");
        let photoUrl = document.createElement("p");
        let photoLink = document.createElement("a");
        let downloadHref = document.createElement("a");
        let downloadLink = document.createElement("div");
        let imgCopy = document.createElement("p");

        // setting up url link back to unsplash user page
        photoLink.setAttribute('href',linkArray[i]);
        photoLink.setAttribute('target','_blank');
        photoLink.innerHTML= linkArray[i];

        photoLink.id = "url-"+i.toString();
        photoLink.appendChild(photoUrl);
        photoHeader.innerHTML = "photo by - "+ nameArray[i];

       
        downloadLink.classList.add('download-img');
        imgCopy.classList.add('img-copy');
        imgCopy.innerHTML = " photo description text";
       

        textDiv.classList.add('thumbDescription');
        
        downloadLink.appendChild(photoHeader)
         downloadLink.appendChild(imgCopy);
        textDiv.appendChild(downloadLink);
        textDiv.appendChild(photoLink);


       // creating the thumbnail
       let thumbHeight = "300px";
       let thumbWidth = "300px";
       let img = document.createElement("img");
       let imgDiv = document.createElement("div");
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
     
  
     
      
   }

    

       }
   
    
    
  
    });

}

initGallery(gallerySelection);
