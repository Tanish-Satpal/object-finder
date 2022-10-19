video="";
objectDetector="";
Status="";
alarm="";
objects="";
function preload(){
    video=createCapture(VIDEO);
    video.hide();
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();   
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";     
}

function draw(){
    image(video,0,0,480,380);
    objectDetector.detect(video, gotResult);
    if(Status !=""){
        for (i=0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
    
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}


function modelLoaded(){
    console.log("Model LOADED");
    Status=true;
    
}

function gotResult(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
    
}
