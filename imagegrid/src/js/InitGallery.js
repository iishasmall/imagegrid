

export function startGallery (json,document){
  
let choice = document.getElementById("choice");
let galleryDiv = document.getElementById("thumb");
let submitBtn = document.getElementById("submit-btn");
let errorDiv = document.createElement("div");
let imgArray = [];
let nameArray = [];
let linkArray = [];
let idArray = [];
let downloadArray = [];
let gallerySelection="blue"; // inital gallery choice
let imgAmount = 20; // amount of images
let imgPage = 1; // image page number from unsplash

//let errorContainer = document.getElementById("error-container");

  /* if(json.results.length === 0){
       
        let errorMsg = "Gallery could not be created the server may have reached its allotment of being called 50 times or gallery could not be found."
        errorDiv.innerHTML = errorMsg;
        errorDiv.id = "error-div";
        errorDiv.classList.add("error-div");
        errorContainer.appendChild(errorDiv);
       }else{

         if(errorContainer.contains(errorDiv)){
           errorContainer.removeChild(errorDiv);
         } */
       
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
        imgCopy.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar id enim eu mattis. "
       

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


  
  
   // return   galleryDiv.appendChild(imgDiv);
  
       
   
    
};