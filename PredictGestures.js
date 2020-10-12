const knnClassifier = ml5.KNNClassifier();
var testingSampleIndex = 0;

var controllerOptions = {};

var frameIndex = 0;
var frameflip = 0;
var trainingCompleted = false;



var predictedClassLabels = nj.zeros(3);

Leap.loop(controllerOptions, function(frame)
{
    clear();
    if(!trainingCompleted){
        Train();
    }

    HandleFrame(frame);
    Test(); 
});

function Train(){
    console.log("training :");
    //console.log("size :" + train0.shape[3]);
    TrainHelper(train0,0);
    TrainHelper(train1,1);
    TrainHelper(train3,3);
    TrainHelper(train4,4);

    trainingCompleted = true;
}

function Test(){
    console.log("testing :");
    //console.log(test.pick(null,null,null,testingSampleIndex,null).reshape(120).tolist());
    var currentFeatures = test.pick(null,null,null,testingSampleIndex,null).reshape(120);
    var predictedLabel = knnClassifier.classify(currentFeatures.tolist(),GotResults);  
    currentLabel = currentFeatures.get(currentFeatures.shape -1);
   
}

function GotResults(err, result){
    console.log(testingSampleIndex + ": " + result.label);
    predictedClassLabels.set(testingSampleIndex,result.label);
    
    testingSampleIndex++;
    if(testingSampleIndex >= test.shape[3]){
       testingSampleIndex = 0;
    }
}

function TrainHelper(train,n){
    for(var i =0; i < train.shape[3]; i++){
        //console.log(train.pick(null,null,null,i,null).reshape(120).toString());
        features = train.pick(null,null,null,i,null).reshape(120).tolist(); 
        knnClassifier.addExample(features,n);
    }
}

function HandleFrame(frame){
    if(frame.hands.length >= 1){
     var hand = frame.hands[0];
     var interactionBox = frame.interactionBox;
     HandleHand(hand, interactionBox);    
     }
 }
 function HandleHand(hand, interactionBox){
     //Distal phalanges tips
     //Intermediate phalanges middle
     //Proximal phalanges cloest to palm
     //Metacapals in palm
     var fingers = hand.fingers;
     for (var i=3; i >= 0; i--){
         fingers.forEach( finger => {
             HandleFinger(finger, i, interactionBox);
         });
     }
 }
 function HandleFinger(finger, boneType, interactionBox){
     
    var bones = finger.bones;
    bones.forEach( bone => {
        if(bone.type == boneType){
            HandleBone(bone, (5 - bone.type), finger.id % 10, interactionBox);
        }
    }); 
 
 }
 
 function HandleBone(bone, strokeW, fingerIndex, interactionBox){
    var framesOfData = nj.zeros([5,4,6,numSamples]);

    var normalizedPrevJoint = interactionBox.normalizePoint(bone.prevJoint, true);
    //framesOfData.set(fingerIndex,bone.type,0,currentSample,normalizedPrevJoint[0]);
    //framesOfData.set(fingerIndex,bone.type,1,currentSample,normalizedPrevJoint[1]);
    //framesOfData.set(fingerIndex,bone.type,2,currentSample,normalizedPrevJoint[2]);

    px = bone.prevJoint[0];  
    py = bone.prevJoint[1];  
    pz = bone.prevJoint[2]; 

    [px,py] = TransformCoordinates(normalizedPrevJoint);

    var normalizedNextJoint = interactionBox.normalizePoint(bone.nextJoint, true); 
    //framesOfData.set(fingerIndex,bone.type,3,currentSample,normalizedNextJoint[0]);
    //framesOfData.set(fingerIndex,bone.type,4,currentSample,normalizedNextJoint[1]);
    //framesOfData.set(fingerIndex,bone.type,5,currentSample,normalizedNextJoint[2]);

    nx = bone.nextJoint[0];  
    ny = bone.nextJoint[1];  
    nz = bone.nextJoint[2]; 
    
    [nx,ny] = TransformCoordinates(normalizedNextJoint);
    
    //color grey
    stroke(strokeW * 35);
    
    //line width
    strokeWeight(strokeW * 10);
    line(nx,-ny + innerHeight,px, -py + innerHeight);
 
     
 }

 function TransformCoordinates (normalizedPosition){
    // Convert the normalized coordinates to span the canvas
    x = window.innerWidth * normalizedPosition[0];
    y = window.innerHeight * (normalizedPosition[1]);

    return[x,y];
}