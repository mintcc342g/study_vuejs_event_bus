// 이벤트 받는 곳
EventBus.$on("greeting", function(data){
  console.log("니가 보낸 greeting 이벤트의 데이터가 이 값이냐? ", data);
});
