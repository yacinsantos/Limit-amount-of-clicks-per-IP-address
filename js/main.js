$(document).ready(function(){

      

  function show_btns(){
      
        $.getJSON("data.json", function (data) {
          var status = {
            1: 0,
            2: 0,
            3: 0
          }
          for (var i = 1; i < 4; i++){
            var btn = IPaddress + '|' + i;

            $.each(data, function (index, value) {
              $.each(value, function (inx, val) {
                console.log(btn)
                  if(btn == inx){
                    status[i] = 1;
                    if(val == 2){
                      $("#" + i).empty()
                      $("#" + i).append("New Link")
                      $("#" + i).attr("href", "http://www.google.com/")
                    }
              }
          });
          })
          
        }
  })
}

  function clickCounter(id, href) {
    var button = IPaddress + '|' + id;
    if (typeof(Storage) !== "undefined") {
        
        $.ajax({
          type : "POST",
          url : "check_record.php",
          data : {
              json : JSON.stringify(button)
          },
          success: function(data){
            if(data == 1){
              localStorage[button] = 2
              $("#" + id).empty()
              $("#" + id).append("New Link")
              $("#" + id).attr("href", "http://www.google.com/")

              $.ajax({
                type : "POST",
                url : "update_record.php",
                data : {
                    json : JSON.stringify(button)
                },success: function(data){
                  console.log(data)
                }
              });

            } else {
            localStorage[button] = 1
            var data = {
              [button]: 1
            }
            $.ajax({
              type : "POST",
              url : "json.php",
              data : {
                  json : JSON.stringify(data)
              }
            });
          }
          }
        });

        
     }else {
    alert("Sorry, your browser does not support web storage...");
  }

  window.location = href;
}




var IPaddress;
$.getJSON("https://api.ipify.org/?format=json", function (data) {
  IPaddress = data.ip;
  show_btns()

});

  for(let i = 1; i<4; i++){
    $("#" + i).click((e) => {
      var href = e.target.href;
      e.preventDefault()
      clickCounter(i, href)
    });
 }





  
  

  
    


  





});