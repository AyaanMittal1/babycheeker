status1=false;
objects=[];
cofedence=0;
function preload(){
    myaudio=loadSound("alarm1.mp3");
}
function setup(){
    canvas=createCanvas(500,400)
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video, 0,0,500,400);
    if(status1 == true){
        cocoSSD.detect(video,got_results);
        stroke(random(1,255),random(1,255),random(1,255));
        for(i=0; i<objects.length; i++){
            cofedence=(objects[i].confidence*100).toFixed(2);
            fill(random(1,255),random(1,255),random(1,255));
            text(objects[i].label+" "+cofedence+"%",objects[i].x+10,objects[i].y+10);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == "person"){
                myaudio.stop();
                document.getElementById("answer").innerHTML="Baby is detected";
            }
            else{
                document.getElementById("answer").innerHTML="Baby is not detected";
                myaudio.play();
            }
        }
        if(objects.length == 0){
            document.getElementById("answer").innerHTML="Baby is not detected";
            myaudio.play();
        }
    }
}
function got_results(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
    document.getElementById("status").innerHTML="Status: Loaded";
}
function start(){
    cocoSSD=ml5.objectDetector("cocossd",model_ready);
    document.getElementById("status").innerHTML="Status: Loading";
}
function model_ready(){
    console.log("model has loaded");
    status1=true;
}
