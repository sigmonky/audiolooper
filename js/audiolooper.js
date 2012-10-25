console.log($("#seekbar"));
     
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
          }
 
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
               $("input").val( String(audio.currentTime));
               $("input").slider('refresh');
          }

     $(document).on({
         "mousedown touchstart": function () {
             $(this).siblings("input").trigger("start");
         },
         "mouseup touchend": function () {
             $(this).siblings("input").trigger("stop");
         }
     }, ".ui-slider");
     
     $("#seekbar").on("start", function () { 
        alert("User has started sliding my-slider!");
     });
     
     $("#seekbar").on("stop", function (event) {
         var value = event.target.value;
        alert("User has finished sliding my slider, its value is: " + value);
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
              
              if ( audio.currentTime >= track.loopEnd() ) {
                    
                    audio.currentTime = track.loopStart();
                    btnLabel = "Loop Phrase 99:99";
                    $('#loopPhrase').html(btnLabel).button('refresh');
              }
             
            }); 
            
             $(".ui-slider").bind ("vmousedown", function (event){
                   audio.pause();
             });
             
              $(".ui-slider").bind ("vmouseup", function (event){
                   audio.currentTime = $("input").val();
                   audio.play();
             });

     
     $( "#play").live( "click", function( event, data ) {
               audio.play();
     } );
     $( "#pause").live( "click", function( event, data ) {
              audio.pause();
     } );
     $( "#stop").live( "click", function( event, data ) {
              audio.currentTime = 0;
              audio.pause();
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