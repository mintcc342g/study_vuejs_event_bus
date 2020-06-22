# study_vuejs_event_bus
```
1. 이벤트 버스란?
  1.1. 정의
  1.2. 원리
2. 예제
  2.1. 이벤트 버스 객체만 이용한 통신
  2.2. 이벤트 버스로 받은 데이터를 템플릿에 반영
  2.3. 별개의 파일로 만들어보기
```


## 1. 이벤트 버스란?
### 1.1. 정의
* vue.js 내에서 부모 컴포넌트 -> 자식 컴포넌트 이외의 상황에서 데이터를 전달할 때 사용하는 방법
    * 자식 > 부모, 형제 > 형제, 사촌 > 부모… 등. 부모 > 자식 경우를 제외한 모든 경우에서 사용 가능
* 여기서의 컴포넌트는 모든 템플릿, 템플릿 내의 html 태그 영역, .js 파일 등등을 전부 포함하는 개념인 것 같음.
    * 예를 들어, 하나의 html 파일 내의 서로 다른 위치의 <div></div> 영역 간의 통신도 가능
    * 서로 다른 html 파일 간의 통신, 서로 다른 html 파일 내의 서로 다른 영역 간의 통신, 서로 다른 .js 파일 간의 통신 등등.. Vue.js를 사용하는 곳 어디에서든 전부 가능하다는 뜻임.
* 즉, 어떻게 보면 Vue.js에서 Vue 객체 간에 데이터를 주고 받을 때 사용하는 방법이라고도 말할 수 있는 것 같음.
                  
### 1.2. 원리
* 데이터를 주고 받는 매개체로서 비어있는 Vue 객체를 사용함.
* 데이터를 보내는 쪽은 그 비어있는 객체에 {“키” : 값} 의 형태로 데이터를 전송함.
* 데이터를 받는 쪽은 그 객체의 “키”를 리슨하고 있다가, 그 “키”의 값에 변화가 일어나면 해당 값을 받아옴.
* 여기서 “키”가 바로 이벤트 이름, 값이 보내는 데이터에 해당함.
* 이런 원리 때문에 다양한 컴포넌트 간에 데이터를 주고 받는 것이 가능한 것 같음.
* 필요한 것
    * 이벤트 버스를 위한 빈 Vue 객체
    * 이벤트 이름(키)과 데이터(값)
    * 이벤트를 보내는 트리거
    * 이벤트를 받는 곳의 리스너
                                    
## 2. 예제
### 2.1. 이벤트 버스 객체만 이용한 통신

* 파일 위치: study_vuejs_event_bus/study1/study1.html
    * 2.2의 예제까지 포함되어 있음.
```
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script><!-- # 제이쿼리 쓰니까 불러줌. -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script><!-- # CDN 방식으로 vue.js를 가져옴. vue.js를 굳이 설치하지 않아도 vue.js를 사용할 수 있게 해줌. -->

<script>
// 이벤트 버스를 위한 빈 Vue 객체 생성하고 인스턴스에 넣어주자. 인스턴스 변수명은 EventBus든 GoToHell이든 아무거로나 해도 됨.
const EventBus = new Vue();

$(document).ready(function(){

  // 이벤트 보내는 곳
  $("#hello-btn").click(function(){
    var data = $(this).attr("greeting-data");
    EventBus.$emit("greeting", data);  // 위에서 생성해준 이벤트 버스 인스턴스 이름 뒤에 $emit(“이벤트명”, 값); 을 써줌.
  });

  // 이벤트 받는 곳
  EventBus.$on("greeting", function(data){   // 받을 땐, 이벤트 버스 인스턴스 이름 뒤에 $on(“이벤트명”, function(값){ 하고 싶은 로직 }); 을 써줌.
    console.log("니가 보낸 greeting 이벤트의 데이터가 이 값이냐? ", data);
  });

}); // ----- end of document ready

</script>
</head>
<body>

<!-- # 얘를 누르면 데이터를 보냄! -->
<button id="hello-btn" greeting-data="Hello!">안녕?</button>

</body>
</html>
```
                  
### 2.2. 이벤트 버스로 받은 데이터를 템플릿에 반영

* 상기의 코드를 수정하여 이벤트 듣는 곳을 늘림.
    * 이벤트는 아무나 들을 수 있음.
    * 이벤트 리스너는 개수에 제한이 없음.
* study_vuejs_event_bus/study1/study1.html
```
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script><!-- # 제이쿼리 쓰니까 불러줌. -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script><!-- # CDN 방식으로 vue.js를 가져옴. vue.js를 굳이 설치하지 않아도 vue.js를 사용할 수 있게 해줌. -->


<script>
// 이벤트 버스를 위한 빈 Vue 객체 생성하고 인스턴스에 넣어주자. 인스턴스 변수명은 EventBus든 GoToHell이든 아무거로나 해도 됨.
const EventBus = new Vue();


$(document).ready(function(){


  // 이벤트 보내는 곳
  $("#hello-btn").click(function(){
    var data = $(this).attr("greeting-data");
    EventBus.$emit("greeting", data);  // 위에서 생성해준 이벤트 버스 인스턴스 이름 뒤에 $emit(“이벤트명”, 값); 을 써줌.
  });

  // 이벤트 받는 곳 -> Old..
  EventBus.$on("greeting", function(data){
    console.log("니가 보낸 greeting 이벤트의 데이터가 이 값이냐? ", data);
  });


  // 이벤트 받는 곳 -> New!
  new Vue({
    el: ".receive",
    data() {
      return {
        receivedData: "...”,  // 이벤트 버스로 받은 데이터를 이 Vue 객체의 이 변수에 넣어줄거임. 초기값은 ... 으로 줬음.
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
}); // ----- end of document ready

</script>
</head>
<body>

<!-- # 얘를 누르면 데이터를 보냄! -->
<button id="hello-btn" greeting-data="Hello!">안녕?</button>

<br/><br/><br/>

<!-- # 받은 데이터를 나타내는 쪽. 버튼 누르면, 보낸 데이터가 “{{receivedData}}” 자리에 나타날 것! -->
<p class="receive">Foreigner: "{{receivedData}}"</p>

</body>
</html>
```
                  
### 2.3. 별개의 파일로 만들어보기

* 이걸 살짝 응용하면, 어느 파일에서든 어느 위치에서든 이벤트를 보내는 것이 가능해짐.
* 위의 내용을 .js 파일로 각각 나눠서 해본다고 치자.
* study_vuejs_event_bus/study2/
    * 2.4. 예제까지 포함
```
project_root
  ├── eventBus.js
  ├── listener1.js
  ├── listener2.js
  ├── sender.js
  └── study2.html
```

* eventBus.js
```
// 이벤트 버스를 위한 빈 Vue 객체 생성. 이름은 EventBus든 GoToHell이든 뭐든 아무거로나 해도 됨.
const EventBus = new Vue();
```

* listener1.js
```
// 이벤트 받는 곳. 얘는 굳이 document.ready 안 해줘도 됨.
EventBus.$on("greeting", function(data){
  console.log("니가 보낸 greeting 이벤트의 데이터가 이 값이냐? ", data);
});
```

* listener2.js
```
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
```

* sender.js
```
$(document).ready(function(){
  // 이벤트 보내는 곳
  $("#hello-btn").click(function(){
    var data = $(this).attr("greeting-data");
    EventBus.$emit("greeting", data);
  });
});
```

* study2.html
> **중요!!!!**   
> * 리스너 Vue 객체가 선언된 listener2.js 파일을 불러올 때에는 **defer** 라는 옵션을 줬음.   
> * html 태그들이 만들어지기도 전에 Vue 객체가 렌더링이 되어서 그런지, defer 옵션을 주지 않으면, Vue 객체가 장착이 안 되는 것 같음. (자세한 이유는 모름.)   
> * defer 옵션을 주기 싫다면, 리스너 Vue 객체가 선언된 listener2.js를 p 태그 밑으로 내려주면 됨. (주석 써있는 위치로 내리면 됨. defer는 빼고 ㅇㅇ)   
```
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script><!-- # CDN 방식으로 vue.js를 가져옴. -->
<script type="text/javascript" src="eventBus.js"></script><!-- # 이벤트 버스 객체 선언한 파일 -->
<script type="text/javascript" src="sender.js"></script><!-- # 이벤트 보내는 곳 작성한 파일 -->
<script type="text/javascript" src="listener1.js"></script><!-- # 이벤트 받는 곳 파일1 -->
<script type="text/javascript" defer src="listener2.js"></script><!-- # 이벤트 받는 곳 파일2. defer 주의!! -->
</head>
<body>
  <!-- # 얘를 누르면 데이터를 보냄! -->
  <button id="hello-btn" greeting-data="Hello!">안녕?</button>

  <br/><br/><br/>

  <!-- # 받은 데이터를 나타내는 쪽 -->
  <p class="receive">Foreigner: "{{receivedData}}"</p>
  <!-- # defer를 뻬고 싶다면, listener2.js 파일을 불러오는 위치를 이곳으로 내리자! -->
</body>
</html>
```

* 파일 구조를 바꿔도 당연히 잘 작동됨.
```
project_root
  ├── study1
  │   └── study1.html
  └── study2
      ├── sender.js
      ├── study2.html
      ├── study2_1
      │   └── listener1.js
      └── study2_2
          ├── eventBus.js
          └── study2_3
              └── listener2.js
```

* 파일 구조를 위처럼 바꿨으면, study2.html에서 script 불러오는 것을 밑에 처럼 바꿔줘야 함.
```
<script type="text/javascript" src="study2_2/eventBus.js"></script><!-- # 이벤트 버스 객체 선언한 파일 -->
<script type="text/javascript" src="sender.js"></script><!-- # 이벤트 보내는 곳 작성한 파일 -->
<script type="text/javascript" src="study2_1/listener1.js"></script><!-- # 이벤트 받는 곳 파일1 -->
<script type="text/javascript" defer src="study2_2/study2_3/listener2.js"></script><!-- # 이벤트 받는 곳 파일2 -->
```
