$(document).ready(function(){

      var IPaddress;
      $.getJSON("http://jsonip.com?callback=?", function (data) {
        IPaddress = data.ip;
      });

      function show_btns(){
        if(typeof(Storage) !== 'undefined'){
          for (var i = 1; i < 4; i++){
            var btn = IPaddress + '|' + i;
            if (localStorage[btn]){
              if (Number(localStorage[btn]) >= 2){
                $("#" + i).append("changed")
              } else {
                $("#" + i).append("Not changed")
              }
            } else {
              $("#" + i).append("Not changed")
            }
          }
        } else {
          alert('Sorry, your browser does not support web storage...')
        }
      }

      function clickCounter(id) {
        var button = IPaddress + '|' + id;
        if (typeof(Storage) !== "undefined") {
          if(localStorage[button]){
            var bool;
            var record = {
              [button]: 1
            }

            $.ajax({
              type : "POST",
              url : "check_record.php",
              data : {
                  json : JSON.stringify(record)
              },
              success: function(data){
                bool = data;
              }
            });

            if(localStorage[button] == 1 || bool == "true"){
              localStorage[button] = 2
              $("#" + id).empty()
              $("#" + id).append("changed")

              var record_to_update = {
                [button]: 1
              }
              $.ajax({
                type : "POST",
                url : "update_record.php",
                data : {
                    json : JSON.stringify(record_to_update)
                }
              });

            }
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
          }} else {
          alert("Sorry, your browser does not support web storage...");
        }
      }

      setTimeout(() => {
        show_btns()
        console.log(localStorage)
      }, 1000);

      for(let i = 1; i<4; i++){
        $("#" + i).click((e) => {
           clickCounter(i)
        });
     }





      
      

      
        


      

    



  });