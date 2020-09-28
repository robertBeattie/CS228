oneFrameOfData = nj.array([[[ 1081.18272,  231.47041,     282.99, 1081.18272,  231.47041,     282.99],
    [ 1081.18272,  231.47041,     282.99, 1000.27238,  312.27209,    249.144],
    [ 1000.27238,  312.27209,    249.144,  948.05088,  366.93661,    225.486],
    [  948.05088,  366.93661,    225.486,  914.23987,  404.08161,    208.907]],
   [[ 1116.55142,  308.32719,    288.863,  1054.6656,  494.56037,    243.173],
    [  1054.6656,  494.56037,    243.173, 1007.83027,  617.11949,    221.274],
    [ 1007.83027,  617.11949,    221.274,  979.86309,  677.67123,    206.975],
    [  979.86309,  677.67123,    206.975,  959.39961,  714.93681,    195.832]],
   [[ 1156.43942,  318.08179,    286.603, 1129.35014,  495.46047,    241.365],
    [ 1129.35014,  495.46047,    241.365, 1116.30605,  632.13253,     213.23],
    [ 1116.30605,  632.13253,     213.23, 1103.29997,  698.23125,     193.66],
    [ 1103.29997,  698.23125,     193.66, 1092.01805,  732.77072,     179.44]],
   [[ 1196.35738,  315.98875,    283.553, 1203.67219,  471.96329,    241.817],
    [ 1203.67219,  471.96329,    241.817, 1215.84576,  591.72308,    214.031],
    [ 1215.84576,  591.72308,    214.031, 1216.14374,  650.08703,    193.677],
    [ 1216.14374,  650.08703,    193.677, 1212.31066,  679.29484,    178.677]],
   [[ 1232.43341,  288.58112,    278.162, 1267.53216,  433.57797,     240.71],
    [ 1267.53216,  433.57797,     240.71, 1313.15021,  512.28231,     218.37],
    [ 1313.15021,  512.28231,     218.37, 1330.09037,  544.84932,     203.49],
    [ 1330.09037,  544.84932,     203.49, 1338.36518,  564.35852,    189.126]]]);

anotherFrameOfData = nj.array([[[  919.92038,  219.07152,     243.61,  919.92038,  219.07152,     243.61],
    [  919.92038,  219.07152,     243.61,  879.73171,  298.00841,    201.272],
    [  879.73171,  298.00841,    201.272,  925.04352,  290.15736,    171.246],
    [  925.04352,  290.15736,    171.246,  952.22895,  288.57681,    150.229]],
   [[  973.63884,  294.03767,     246.05,  884.16307,  502.71289,    201.659],
    [  884.16307,  502.71289,    201.659,  813.46752,  626.90424,    179.584],
    [  813.46752,  626.90424,    179.584,  768.03955,  684.07955,    165.144],
    [  768.03955,  684.07955,    165.144,  733.37242,  716.43984,    153.998]],
   [[ 1013.01427,  296.91452,     240.52,  958.22883,  489.70245,    193.997],
    [  958.22883,  489.70245,    193.997,   954.9706,  624.82843,    160.807],
    [   954.9706,  624.82843,    160.807,  942.06536,  689.80741,    138.731],
    [  942.06536,  689.80741,    138.731,  927.74853,  723.49416,    123.172]],
   [[  1049.8249,   287.2116,    234.307, 1031.08109,    450.908,    188.969],
    [ 1031.08109,    450.908,    188.969,  929.34824,  352.84089,    165.039],
    [  929.34824,  352.84089,    165.039,  874.56307,  259.06753,    161.634],
    [  874.56307,  259.06753,    161.634,  843.38496,  191.54761,    162.972]],
   [[ 1076.41882,   251.3586,    226.267, 1089.36346,    398.259,    183.313],
    [ 1089.36346,    398.259,    183.313,    996.145,  341.03201,    164.417],
    [    996.145,  341.03201,    164.417,  946.42222,  284.66205,    162.275],
    [  946.42222,  284.66205,    162.275,  907.49606,  229.91571,    163.857]]]);

var frameIndex = 0;
var frameflip = 0;

function draw(){
    clear();
    if(frameIndex >= 100){
        frameIndex = 0;
        if(frameflip == 0){
            frameflip = 1;
        }else{
            frameflip = 0;
        }
    } 
    for(var i =0; i < oneFrameOfData.shape[0]; i++){
        for(var j =0; j < oneFrameOfData.shape[1]; j++){
            if(frameflip % 2 == 1){
                var StartX = oneFrameOfData.get(i,j,0);
                var StartY = oneFrameOfData.get(i,j,1);
                var StartZ = oneFrameOfData.get(i,j,2);
                
                var EndX = oneFrameOfData.get(i,j,3);
                var EndY = oneFrameOfData.get(i,j,4);
                var EndZ = oneFrameOfData.get(i,j,5);
    
                line(StartX, StartY, EndX, EndY);
            }else{
                var StartX = anotherFrameOfData.get(i,j,0);
            var StartY = anotherFrameOfData.get(i,j,1);
            var StartZ = anotherFrameOfData.get(i,j,2);
            
            var EndX = anotherFrameOfData.get(i,j,3);
            var EndY = anotherFrameOfData.get(i,j,4);
            var EndZ = anotherFrameOfData.get(i,j,5);

            line(StartX, StartY, EndX, EndY);
            }            
        }
    }
    frameIndex++;
}
