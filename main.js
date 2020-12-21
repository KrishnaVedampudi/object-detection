status = "";
objects=[];

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
   
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);    

}
function modelLoaded()
{
    console.log('Model Loaded!');    
    document.getElementsByName('body').style.opacity = "1.0";
    objectDetector.detect(video, gotResults);
    document.getElementById('status').innerHTML = "Status : Detecting objects";
    status = true;     
    document.getElementById("loader").style.display = "none";   
}
function gotResults(error, results)
{
   if(error)
   {
       console.log(error);
   }else{
       console.log(results);
       objects = results;              
   }
}
function draw()
{
    image(video, 0, 0, 380, 380);    
    if(status != "")
    {
      for(i=0; i <= objects.length; i++)
       {        
        r = random(255);
        g = random(255);
        b = random(255);
        textSize(18);
        document.getElementById("status").innerHTML = "Status : Objects Detetcted";
        document.getElementById("noo").innerHTML = "Number Of Objects Detected : "+ objects.length;
        fill(r, g, b);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y+15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       } 
    }        
}