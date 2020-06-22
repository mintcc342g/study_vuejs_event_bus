$(document).ready(function(){
  // 이벤트 보내는 곳
  $("#hello-btn").click(function(){
    var data = $(this).attr("greeting-data");
    EventBus.$emit("greeting", data);
  });
});