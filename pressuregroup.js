function pressureGroup(depth, time){
/*
WARNING: This function is a PROTOTYPE and cannot be used for planning actual dives. 

pressureGroup takes a depth and time as arguments and returns the pressure group that a dive 
with those parameters will be in. If there is no pressure group then the function will print 
out an appropriate error message.
*/
    
//These are all of the depths and times in the PADI dive chart. Indices [[x][0]] is the depth and the rest is the time intervals
var depthTimes = [[35, 10, 19, 25, 29, 32, 36, 40, 44, 48, 52, 57, 62, 67, 73, 79, 85, 92, 100, 108, 117, 127, 139, 152, 168, 188, 205], [40, 9, 16, 22, 25, 27, 31, 34, 37, 40, 44, 48, 51, 55, 60, 64, 69, 74, 79, 85, 91, 97, 104, 111, 120, 129, 140], [50, 7, 13, 17, 19, 21, 24, 26, 28, 31, 33, 36, 39, 41, 44, 47, 50, 53, 57, 60, 63, 67, 71, 75, 80], [60, 6, 11, 14, 16, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 42, 44, 47, 49, 52, 54, 55], [70, 5, 9, 12, 13, 15, 16, 18, 19, 21, 22, 24, 26, 27, 29, 31, 33, 35, 36, 38, 40], [80, 4, 8, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 29, 30], [90, 4, 7, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25], [100, 3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], [110, 3, 6, 7, 8, 9, 10, 11, 12, 13, 13, 14, 15, 16], [120, 3, 5, 6, 7, 8, 9, 10, 11, 11, 12, 13], [130, 3, 5, 6, 7, 7, 8, 9, 10], [140, 4, 4, 5, 6, 7, 8]];

//These are the pressure groups
var pressureGroups = ['A', 'B', 'C', 'D', 'E', 'F', 'G' , 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//This code checks the depth and time arguments against the depths and times in the depthTimes array to see if there is a match. If there is it returns the pressure group. If there is not, it prints out a warning.    
for (var i = 0; i < depthTimes.length; i++) {
    if(depth<=depthTimes[i][0]){
        for(var j = 1; j < depthTimes[i].length; j++){
            if(time<=depthTimes[i][j]){
               return pressureGroups[j];
            }    
        }
        return "WARNING: "+time + " minutes is to long to spend at "+ depth+" feet"; 
    } 
}
    return "WARNING: "+depth +" feet is too deep to be diving on just air";
}
