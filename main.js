img="";
status="";
baby_alert="";
objects=[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide(); 
}
function preload(){
    baby_alert = loadSound("alert.mp3");
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are"+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function modelloaded(){
    console.log("model loaded");
    status=true;
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function start(){
    objectdetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}