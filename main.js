img = "";
status1 = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("model loaded!");
    status1 = true;
}

function getResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        objects = results;
        console.log(results);

    }
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status1 != false) {
        object_detector.detect(video, getResults);
        for (i = 0; i < objects.length; i++) {
            r = random(255);
            g = random(255);
            b=random(255);
            textSize(20);
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("number_objects").innerHTML = "Number of Objects Detected: " + objects.length;
        }
        document.getElementById("status").innerHTML = "Status: Objects Detected!";
    }
}