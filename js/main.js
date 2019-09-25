$(document).ready(function(){


  var number_of_clicks = 4; /**  PUT HERE THE NUMBER OF CLICKS  **/

      

  function popuplogin(url)
  {
      var w = 800;
      var h = 600;
      var title = 'Social popup';
      var left = (screen.width / 2) - (w / 2);
      var top = (screen.height / 2) - (h / 2);
      window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  }         
					
	


  function show_btns(){
      
        $.getJSON("data.json", function (data) {
          var status = {
            1: 0,
            2: 0,
            3: 0,
            4: 0//ADD THIS LINE FOR NEW LINK
          }
          for (var i = 1; i <= 4; i++){// INCREMENT THE NUMBER
            var btn = IPaddress + '|' + i;

            $.each(data, function (index, value) {
              $.each(value, function (inx, val) {
                  if(btn == inx){
                    status[i] = 1;
                    if(val == number_of_clicks){
                      $("#" + i).empty()
                      if(i == 1){
                        $("#" + i).append("New Link")
                        $("#" + i).attr("href", "http://www.google.com/")
                      }
                      if(i == 2){
                        $("#" + i).append("New Link")
                        $("#" + i).attr("href", "http://www.google.com/")
                      }
                      if(i == 3){
                        $("#" + i).append("New Link")
                        $("#" + i).attr("href", "http://www.google.com/")
                      }
                      /*  ********      ADD THIS IF STATEMENT     this link is after the 2 times click     ******* **/
                      if(i == 4){
                        $("#" + i).append("New Link")
                        $("#" + i).attr("href", "http://www.google.com/")
                      }
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
            var result = JSON.parse(data)
            if(result.bool == 1 && result.times == (number_of_clicks-1)){       
              localStorage[button] = (Number(result.times)+1)
              $("#" + id).empty()
              if(id == 1){
                $("#" + id).append("New Link")
                $("#" + id).attr("href", "http://www.google.com/")
              }
              if(id == 2){
                $("#" + id).append("New Link")
                $("#" + id).attr("href", "http://www.google.com/")
              }
              if(id == 3){
                $("#" + id).append("New Link")
                $("#" + id).attr("href", "http://www.google.com/")
              }
              /*  ********      ADD THIS IF STATEMENT  ALSO  this link is after the 2 times click      ******* */
              if(id == 4){
                $("#" + id).append("New Link")
                $("#" + id).attr("href", "http://www.google.fr/")
              }

              $.ajax({
                type : "POST",
                url : "increment_click.php",
                data : {
                    json : JSON.stringify(button)
                }
              });

            } else if (result.bool == 0){
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
          }else if(result.times < number_of_clicks){     
            localStorage[button] = (Number(result.times)+1)
            $.ajax({
              type : "POST",
              url : "increment_click.php",
              data : {
                  json : JSON.stringify(button)
              }
            });

          }
          
          if(result.times == number_of_clicks){
            popuplogin(href)
          }else{
            window.open(href, '_blank')
          }
          
          }
        });

        
     }else {
    alert("Sorry, your browser does not support web storage...");
  }

}




var IPaddress;
$.getJSON("https://api.ipify.org/?format=json", function (data) {
  IPaddress = data.ip;
  show_btns()

});

  for(let i = 1; i<+ 4; i++){//INCREMENT THIS NUMBER
    $("#" + i).click((e) => {
      var href = e.target.href;
      e.preventDefault()
      clickCounter(i, href)
    });
 }





  
  

  
    


  





});