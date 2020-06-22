new Vue({
    el: ".receive",
    data() {
        return {
          receivedData: "...",
        }
    },
    created() {
        /** var self = this;
          * js 특성상 이 Vue 객체에 속한 receivedData를 가리키려면, this를 구분해줘야 함.
          * 보통 self를 많이 쓰는데, self 말고 다른 변수명 사용해도 됨. 
          **/
      var self = this;
      EventBus.$on("greeting", function(data){
        self.receivedData = data;
      });
    },
});
