var dives = 1;
/**These functions implement the pages functionality**/
$( "#calculate" ).click(function() { 
     calculate();
});

$( "#add" ).click(function(){
     dives = dives +1;
     if (dives < 4){
     $("#additionalDives").append('<div id="dive'+dives+'">Dive '+dives+' Depth (Feet): <input id="depth'+dives+'" name = "Dive '+dives+' Depth" type="number" min="10" max="205" value="30"> Surface interval between dives '+(dives - 1)+' and '+dives+' (Minutes): <input id="si'+(dives-1)+'" name = "Surface Interval '+(dives-1)+'" type="number" min="1" max="600" value="30"><p id="comments'+dives+'"></p></div>');
     if(dives == 3){
       alert("WARNING: This application is not well tested after 2 dives. Proceed with caution.");
     }} else {
     alert("This application does not support more then 3 dives");
     }
});

$( "#remove" ).click(function(){
    $("#dive"+dives+"").remove();
    dives = dives -1;
});

function calculate(){
  var group = pressureGroup($("#depth").val(), $("#duration").val());
  if (group.length == 1){
    $("#comments1").html("<p>This dive puts you in pressure group "+group+"</p>");
    if (dives > 1){
      for(var i = 2; i<=dives; i++){
        group = tableTwo(group, $("#si"+(i-1)).val());
        time = tableThree(group, $("#depth"+i).val());
        if(time === parseInt(time, 10)){
          $("#comments"+i).html("This dive puts you in pressure group "+group+". At "+$("#depth"+i).val()+" feet you can stay under for "+time+" minutes.");
        } else {
           $("#comments"+i).html(time);
        }
      }
    }
    //for each dive run the methods and print comments
  } else {
    $("#comments1").html(group);
  }
}


/**These functions implement the dive table**/
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

function tableTwo(pressureGroup, surfaceInterval){
/**WARNING: This function is a prototype. It should not be used for actual dives.
This function does the calculations for dive table 2. It takes a pressure group and a surface interval and returns the resulting pressure group the diver is now in.**/

var groupSurfaceTimes = [['A', 180], ['B',228, 47], ['C', 230, 69, 21],['D', 239, 78, 30, 8], ['E', 248, 87, 38, 16, 7], ['F', 255, 94, 46, 24, 15, 7], ['G', 262, 101, 53, 31, 22, 13, 6], ['H', 268, 107, 59, 37, 28, 20, 12, 5], ['I', 274, 113, 65, 43, 34, 26, 18, 11, 5], ['J', 280, 119, 71, 49, 40, 31, 24, 17, 11, 5], ['K', 285, 124, 76, 54, 45, 37, 29, 22, 16, 10, 4], ['L', 290, 129, 81, 59, 50, 42, 34, 27, 21, 15, 9, 4], ['M',295, 134, 85, 64, 55, 46, 39, 32, 25, 19, 14, 9, 4], ['N', 299, 138, 90, 68, 59, 51, 43, 36, 30, 24, 18, 13, 8, 3], ['O', 304, 143, 94, 72, 63, 55, 47, 41, 34, 28, 23, 17, 12, 8, 3],['P', 308, 147, 98, 76, 67, 59, 51, 45, 38, 32, 27, 21, 16, 12, 7, 3], ['Q', 311, 150, 102, 80, 71, 63, 55, 48, 42, 36, 30, 25, 20, 16, 11, 7, 3], ['R', 315, 154, 106, 84, 75, 67, 59, 52, 46, 40, 34, 29, 24, 19, 15, 11, 7, 3],['S', 319, 158, 109, 87, 78, 70, 63, 56, 49, 43, 38, 32, 27, 23, 18, 14, 10, 6, 3], ['T', 322, 161, 113, 91, 82, 73, 66, 59, 53, 47, 41, 36, 31, 26, 22, 17, 13, 10, 6, 2], ['U', 325, 164, 116, 94, 85, 77, 69, 62, 56, 50, 44, 39, 34, 29, 25, 21, 17, 13, 9, 6, 2], ['V', 328, 167, 119, 97, 88, 80, 72, 65, 59, 53, 47, 42, 37, 33, 28, 24, 20, 16, 12, 9, 5, 2], ['W', 331, 170, 122, 100, 91, 83, 75, 68, 62, 56, 50, 45, 40, 36, 31, 27, 23, 19, 15, 12, 8, 5, 2], ['X', 334, 173, 125, 103, 94, 86, 78, 71, 65, 59, 53, 48, 43, 39, 34, 30, 26, 22, 18, 15, 11, 8, 5, 2], ['Y', 337, 176, 128, 106, 97, 89, 81, 74, 68, 62, 56, 51, 46, 41, 37, 33, 29, 25, 21, 18, 14, 11, 8, 5, 2], ['Z', 340, 179, 131, 109, 100, 91, 84, 77, 71, 65, 59, 54, 49, 44, 40, 35, 31, 28, 24, 20, 17, 14, 11, 8, 5, 2]];

var pressureGroups = ['A', 'B', 'C', 'D', 'E', 'F', 'G' , 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

for (var i = 0; i < groupSurfaceTimes.length; i++) {
    if(pressureGroup==groupSurfaceTimes[i][0]){
        for(var j = 1; j < groupSurfaceTimes[i].length; j++){
            if(surfaceInterval>=groupSurfaceTimes[i][j]){
		if (j == 1){
		    return "None"
                }               
		return pressureGroups[j-2];
            }   
        }
	return pressureGroups[j-2]; 
    } 
}
return "That pressure group is not valid"
}

function tableThree (pressureGroup, depth){
/**WARNING: This is a prototype and should not be used with actual dives**/

/**This function takes a pressure group and the depth of the dive and returns the maximum possible time that the diver can stay at this depth**/
var adjustedTimes = [[35, ['A', 195], ['B', 186], ['C', 180], ['D', 176], ['E', 173], ['F', 169], ['G', 165], ['H', 161], ['I', 157], ['J', 153], ['K', 148], ['L', 143], ['M', 138], ['N', 132], ['O', 126], ['P', 120], ['Q', 113], ['R', 105], ['S', 97], ['T',88],['U', 78], ['V', 66], ['W', 53], ['X', 37], ['Y', 17]], [40, ['A', 131], ['B', 124], ['C', 118], ['D', 115], ['E', 113], ['F', 109], ['G', 106], ['H', 103], ['I', 100], ['J', 96], ['K', 92], ['L', 89], ['M', 85], ['N', 80], ['O', 76], ['P', 71], ['Q', 66], ['R', 61], ['S', 55], ['T',49],['U', 43], ['V', 36], ['W', 29], ['X', 20], ['Y', 11]],[50, ['A', 73], ['B', 67], ['C', 63], ['D', 61], ['E', 59], ['F', 56], ['G', 54], ['H', 52], ['I', 49], ['J', 47], ['K', 44], ['L', 42], ['M', 39], ['N', 36], ['O', 33], ['P', 30], ['Q', 27], ['R', 23], ['S', 20], ['T',17],['U', 13], ['V', 9], ['W', 5]],[60, ['A', 49], ['B', 44], ['C', 41], ['D', 39], ['E', 38], ['F', 36], ['G', 34], ['H', 32], ['I', 30], ['J', 28], ['K', 26], ['L', 24], ['M', 22], ['N', 20], ['O', 18], ['P', 16], ['Q', 13], ['R', 11], ['S', 8], ['T',5],['U', 3], ['V', 1]],[70, ['A', 35], ['B', 31], ['C', 28], ['D', 27], ['E', 25], ['F', 24], ['G', 22], ['H', 21], ['I', 19], ['J', 18], ['K', 16], ['L', 14], ['M', 13], ['N', 11], ['O', 9], ['P', 7], ['Q', 6], ['R', 4], ['S', 2]],[80, ['A', 26], ['B', 22], ['C', 20], ['D', 19], ['E', 17], ['F', 16], ['G', 15], ['H', 13], ['I', 12], ['J', 11], ['K', 9], ['L', 8], ['M', 7], ['N', 5], ['O', 4], ['P', 2]],[90, ['A', 21], ['B', 18], ['C', 16], ['D', 15], ['E', 14], ['F', 13], ['G', 12], ['H', 10], ['I', 9], ['J', 8], ['K', 7], ['L', 6], ['M', 4], ['N', 3], ['O', 2]],[100, ['A', 17], ['B', 14], ['C', 12], ['D', 11], ['E', 10], ['F', 9], ['G', 8], ['H', 7], ['I', 6], ['J', 5], ['K', 4], ['L', 3], ['M', 2]],[110, ['A', 13], ['B', 10], ['C', 9], ['D', 8], ['E', 7], ['F', 6], ['G', 5], ['H', 4], ['I', 3], ['J', 2], ['K', 2]],[120, ['A', 10], ['B', 8], ['C', 7], ['D', 6], ['E', 5], ['F', 4], ['G', 3], ['H', 2]],[130, ['A', 7], ['B', 5], ['C', 4], ['D', 3]]];

//Iterate to appropriate depth, then find appropriate pressure group and return its corresponding time.
for (var i = 0; i < adjustedTimes.length; i++) {
    if(depth<=adjustedTimes[i][0]){
        for(var j = 1; j < adjustedTimes[i].length; j++){
            if(pressureGroup==adjustedTimes[i][j][0]){
		return adjustedTimes[i][j][1];
            }   
        }
	return "WARNING: You cannot dive at "+depth+" feet with that surface interval.";
    }
}
return "WARNING: You cannot dive at "+depth+" feet with that surface interval.";
}
