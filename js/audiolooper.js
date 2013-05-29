
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
  console.log(audio.currentTime);
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
       $(this).siblings("input").trigger("start");
   },
   "mouseup touchend": function () {
       $(this).siblings("input").trigger("stop");
   }
}, ".ui-slider");
     
$("#seekbar").live("start", function () { 
  alert("User has started sliding my-slider!");
});
     
$("#seekbar").live("stop", function (event) {
   var value = event.target.value;
  console.log("User has finished sliding my slider, its value is: " + value);
});


$("input").live ("slidercreate", function ()
{
  console.log("creating slider");
  /**/
});
     
     
var audio = document.getElementById("audio");
var playBtnBehavior = "play";

audio.addEventListener("ondurationchange",setupSeekbar);
audio.addEventListener('durationchange', setupSeekbar);
audio.addEventListener('timeupdate', updateUI);

$( "#seekbar" ).bind( "change", function(event, ui) {
    console.log("change....");
});

$(document).bind('mobileinit',function(){
  $.extend(  $.mobile , 
  {
    defaultPageTransition: "none"
  });
});     
     
$('.ui-slider-handle').live('mouseup', function(){
    audio.currentTime = $("input").val();
   audio.play();
});

$('.ui-slider-handle').live('mousedown', function(){
   audio.pause();
});

$('.ui-slider-handle').live('touchend', function(){
    alert("touchend");
});

$("#seekbar").live ("change", function (event)
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
  
  /*if ( audio.currentTime >= track.loopEnd() ) {
        
        audio.currentTime = track.loopStart();
        btnLabel = "Loop Phrase 99:99";
        $('#loopPhrase').html(btnLabel).button('refresh');
  }*/
 
}); 
         
$( "#play").live( "click", function( event, data ) {
         audio.play();
         $("#pause").show();
         $("#stop").show();
         $(this).hide();
} );

$( "#pause").live( "click", function( event, data ) {
        audio.pause();
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