

var paused = 0;
$("#stop").hide();
$("#pause").hide();
var track =  {
      name:"x",
      url:"x",
      currentSegment:0,
      segments:[
        {id:"1:1",start:2.3,end:15.2,notation:[0,4,7],scoreImg:"img.jpg",description:"aaaaaaaa"},
        {id:"1:2",start:15.3,end:27.5,notation:[0,4,7],scoreImg:"img.jpg",description:"bbbbbbbb"}
      ],
      loopStart:function() {
        return this.segments[this.currentSegment].start;
      },
      loopEnd:function(){
        return this.segments[this.currentSegment].end;
      }
    };
 
function setupSeekbar() {
  seekbar.min = audio.startTime;
  seekbar.max = audio.startTime + audio.duration;
}
          
function seekAudio() {
  audio.currentTime = seekbar.value;
}
          
function updateUI() {
  //console.log(audio.currentTime);
  var lastBuffered = audio.buffered.end(audio.buffered.length-1);
  seekbar.min = audio.startTime;
  seekbar.max = lastBuffered;
    $("#seekbar").val( String(audio.currentTime));
    $("#seekbar").slider('refresh');
    $("#range-1a").val( String(audio.currentTime));
    $("#range-1a").slider('refresh');
}

$(document).on({
   "mousedown touchstart": function () {
    console.log("start");
    audio.pause();
   },
   "mouseup touchend": function () {
       console.log("stop");
       //$(this).siblings("input").trigger("stop");
       console.log($(this));
       console.log("before " + audio.currentTime);
       audio.currentTime = $("#range-1a").val();
       console.log("after " + audio.currentTime);
       audio.play();
   }
}, ".ui-rangeslider");
     

var audio = document.getElementById("audio");
var playBtnBehavior = "play";

audio.addEventListener("ondurationchange",setupSeekbar);
audio.addEventListener('durationchange', setupSeekbar);
audio.addEventListener('timeupdate', updateUI);


$("#range-1a").live("change", function (event)
{
   var minutes = Math.floor($(this).val()/60);
   if (minutes < 10 ) {
        minutes = "0" + minutes.toString();
   }
   var seconds = $(this).val()%60;
   if ( seconds < 10 ) {
        seconds = "0" + seconds.toString();
   }
  $("#clock").text(minutes+":" +seconds);
  
 
}); 

$("#range-1b").live("change", function (event)
{
  console.log("end moved to " + $("#range-1b").val());
}); 
         
$( "#play").live( "click", function( event, data ) {
         audio.play();
         $("#pause").show();
         $("#stop").show();
         $(this).hide();
} );

$( "#pause").live( "click", function( event, data ) {
        audio.pause();
        pause = 1;
        $("#play").show();
        $(this).hide();
} );
$( "#stop").live( "click", function( event, data ) {
        audio.currentTime = 0;
        audio.pause();
        $(this).hide();
        $("#pause").hide();
        $("#play").show();
} );

$( "#loopPhrase").live( "click", function( event, data ) {
       //loopEnd = audio.currentTime;
       btnLabel = "Phrase Looped"
        $('#loopPhrase').html(btnLabel).button('refresh');
        $('#playstatus').html("looping phrase 1:1");
} );
 
$("#loopStart").live("click",function(event,data) {
      var roundedTime = Math.round(audio.currentTime*Math.pow(10,1))/Math.pow(10,1);
      var btnLabel  =  String(roundedTime);
     $('#loopStart span span').html(btnLabel);
});