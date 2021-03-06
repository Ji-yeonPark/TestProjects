# vue-cli-example

**Vue-cli + Vuetify**

> **Vue-cli**<br/>
> 개발환경을 빠르게 셋팅할 수 있도록 도와주는 툴

### # 프로젝트 생성
> $ vue create 프로젝트명<br/>
> ![스크린샷 2019-05-29 오후 10 06 03](https://user-images.githubusercontent.com/40231980/58566974-773bd700-826c-11e9-9a71-c0407ce824cb.png)

### # 개발자 모드로 실행
> $ npm run serve <br/> 

### # 일반 모드로 실행
> $ npm run build <br/> 

### # vuetify 설치/설정
> $ vue add vuetify <br/>
> ![스크린샷 2019-05-29 오후 10 23 02](https://user-images.githubusercontent.com/40231980/58567143-caae2500-826c-11e9-9c49-13fddc8292dc.png)

* src/assets : 이미지, css 등 갖는 폴더

### # 템플릿
* `<template>`안에는 **한 개**의 태그만 존재 가능하다. <br/>
그래서 대체로 `<div>`태그를 이용해서 template안을 하나로 묶어준다.
```html
<template>
  <div>
    <h1>제목</h1>
    <p>...내용...</p>
  </div>
</template>
```

### # 전역 컴포넌트 선언해서 사용 하는 방법

ex) 
1) 전역 컴포넌트로 사용할 vue생성<br/>
```html
<!-- src/Header.vue -->
<template>
  <h1>헤더파일</h1>
</template>
<script>
  export default {
  }
</script>
```
2) 메인 JS(src/main.js 또는 src/index.js)에 컴포넌트 선언
```javascript
import HeaderComponents from './Header'

// Vue.component('자식에서 사용할 이름', 사용할 컴포넌트명)
Vue.component('Header', HeaderComponets)
```
3) 아래 방식으로 컴포넌트 추가해서 어디서든 사용 가능하게 된다.
```javascript
<template>
  <!--<컴포넌트이름><컴포넌트이름> -->
  <Header></Header>
  <Header></Header>
</template>
```

### # Props

**부모**컴포넌트에서 **자식**컴포넌트로 **데이터** 넘김

* 부모
  - 데이터명 : 자식 컴포넌트에서 사용할 변수 명
  - 전달 값 : 자식으로 전달 할 값
```javascript
<자식컴포넌트명 
  :데이터명="전달값" 
  :데이터명2="전달값"
  ...계속 추가 가능...
>
</자식컴포넌트명>
```
* 자식
  - props로 값을 받아옴
```html
<template>
  <h2>{{ 데이터명2 }}</h2>
</template>
<script>
  export default {
    // 방식 1
    props: ['데이터명', '데이터명2'],

    // 방식 2
    props: {
      데이터명: {
        type: 데이터타입(String, Object, Boolean...),
        required: true, // true일 경우 전달된 값이 없을 경우 오류 발생
        default: "기본값"  // 부모로 부터 전달된 값이 없을 경우 표시될 값
      }
    }

  }
</script>
```

하지만, 자식에서 직접 props값을 수정할 경우, <br/>
다시말해, 자식이 직접 부모로 부터 전달 받은 값을 수정할 경우, **부모 값이 수정되면 자식 값도 수정된다**는 오류가 발생한다.<br/>

이를 해결할 수 있는 방법은 두 가지 있다.<br/>

1) 부모로 부터 넘어온 값을 **새로운 객체**에 할당해서, 생성된 객체를 사용.<br/>
ex) user객체를 생성 한 후 생성된 객체에 부모로 부터 넘어온 값을 할당했다.
![스크린샷 2019-05-29 오후 11 30 17](https://user-images.githubusercontent.com/40231980/58568787-d18a6700-826f-11e9-94ff-8e5c10396248.png)
<br/>

2) 자식 컴포넌트가 변경될 떼 부모 컴포넌트로 **신호** 전달. **$emit**사용
* 자식<br/>
> this.$emit('신호이름', 전달값)
```javascript
<!-- 예제 -->
<script>
export default {
  props: ["name", "address", "phone", "hasDog"],
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user.name = this.name;
    this.user.address = this.address;
    this.user.phone = this.phone;
    this.user.hasDog = this.hasDog;
  },
  methods: {
    changeUser() {
      this.$emit('child', this.user)  // $emit
    }
  }
};
</script>
```
* 부모
> <자식컴포넌트 @신호명="신호가 오면 실행할 함수"></자식컴포넌트>
```html
<!-- 예제 -->
<UserEdit
  :name="name"
  :address="address"
  :phone="phone"
  :hasDog="hasDog"
  @child="parents"
>
</UserEdit>
```

### # Event Bus

**형제 컴포넌트 간의 값 전달**방식

* 사용 방법
1) main.js 에서 eventBus선언<br/>
ex)
```javascript
// 방식 1
export const eventBus = new Vue()

// 방식 2. 객체안에 method를 이용하면 eventBus를 매번 선언하지 않아도 된다
export const eventBus = new Vue({  
  methods: {
    userWasEdited(date) {
      this.$emit('userWasEdited', date)
    }
  }
})
```

2) `형제1`에서 `eventBus` 불러와서 `methods`에서 사용.<br/>

> 방식 1: eventBus.$emit('신호명', 전달값)<br/>
> 방식 2: eventBus.함수명(전달값)<br/>

ex)
```javascript
import { eventBus } from "../main";
export default {
  ...
  methods: {
    changeUser() {
      ...
      // 방식 1로 선언한 경우
      eventBus.$emit("userWasEdited", new Date())
      // 방식 2로 선언한 경우
      eventBus.userWasEdited(new Date());
    }
  }
};
```

3) `형제2`에서도 `eventBus` 선언 후 값을 전달받기 위해 `data` 생성.<br/>
그리고 나서 `created()`에서 `eventBus`에서 `$on`으로 신호를 받는다.<br/>

> eventBus.$on('신호명', callback)

ex)
```javascript
import { eventBus } from "../main";

export default {
  data () {
    return {
      editedDate : null
    }
  },
  created() {
    eventBus.$on('userWasEdited', (date) => {
      this.editedDate = date
    })
  },
  ...
}

```






### # Mixin

**공통 함수(methods)를 하나로** 묶은 것. mixin<br/>
* 사용 예시

```javascript
// src/mixins/mixin.js
export const mixin = {
  methods: {
    getMixin() {
      return "!!!!"
    }
  }
}

// src/components/User.vue
import { mixin } from "../mixins/mixin";
export default {
  methods: {
    getMixin() {
      return "****"  // 우선시 된다.
    }
  }
  mixins: [mixin]
}
```
* mixin으로 선언한 파일은 Vue인스턴스와 같이 computed, data 등 선언이 가능하다.
* 만약, mixin과 자기 자신 컴포넌트 내 함수명이 동일할 경우, 자신의 컴포넌트 내 함수가 우선시 된다.<br/>
  믹스인이 먼저 실행되고, 자기 자신의 컴포넌트가 실행되기 때문이다.


```javascript
// src/mixins/mixin.js
export const mixin = {
  methods: {
    getMixin() {
      console.log("믹스인")
      return "!!!!"
    }
  }
}

// src/components/User.vue
import { mixin } from "../mixins/mixin";
export default {
  created() {
    console.log("자기 자신 컴포넌트")
  },
  methods: {
    getMixin() {
      return "****"  // 우선시 된다.
    }
  }
  mixins: [mixin]
}

// -- 결과
// 믹스인
// 자기 자신 컴포넌트
```

<br/>
<br/>
<br/>


---
---

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
