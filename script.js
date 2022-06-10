Webcam.set({
    width:300,
    height: 230,
    image_format: 'png',
    png_quality:90
});
webcam = document.getElementById("camera")
Webcam.attach(camera)

function take_snapshot()
{
    
    Webcam.snap(function(data_uri){
    document.getElementById("snapshot").innerHTML='<img id="img1" src="'+data_uri+'"/>'
    });
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/p40lHGj4o/model.json',modelLoaded)
function modelLoaded()
{
    console.log("THE MODEL HAS BEEN LOADED")
}
function predict_gesture()
{
    image1 = document.getElementById("img1")
    classifier.classify(img1,gotResults)
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = "the first prediction is " + prediction1
    speak_data2 = "the second prediction is " + prediction2
    var utter_this = new SpeechSynthesisUtterance(speak_data1 + speak_data2)
    synth.speak(utter_this)
}
function gotResults(error,result)
{
    if(error)
    {
        console.error(error)
    }
    else
    {
        console.log(result)
        document.getElementById("pred1").innerHTML = result[0].label
        document.getElementById("pred2").innerHTML = result[1].label
        prediction1 = result[0].label
        prediction2 = result[1].label
        speak();
        if(result[0].label == "best")
        {
        document.getElementById("pred1_gesture_emoji").innerHTML = "👍"
        }
        if(result[0].label == "amazing")
        {
        document.getElementById("pred1_gesture_emoji").innerHTML = "👌"
        }
        if(result[0].label == "victory")
        {
        document.getElementById("pred1_gesture_emoji").innerHTML = "✌️"
        }
        if(result[1].label == "victory")
        {
        document.getElementById("pred2_gesture_emoji").innerHTML = "✌️"
        }
        if(result[1].label == "amazing")
        {
        document.getElementById("pred2_gesture_emoji").innerHTML = "👌"
        }
        if(result[1].label == "best")
        {
        document.getElementById("pred2_gesture_emoji").innerHTML = "👍"
        }
        
    }
}