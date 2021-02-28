# Server Side API Documents

### User
#### User model
```js

    username: {
        type: String,
        required: true,
        trim : true,
        lowercase : true,
    },
    email: {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required: true,
    },
    score : {
        type : Number,
        default : 0,
    },
    userType : {
        type : String,
        required : true,
        default : "student",
    }

```

<hr>


### Question
#### Question model

```js
questionTitle  : {
    type : String,
    trim : true,
    required : true,
    default : null
},
questionDescribe : {
    type : String,
    trim : true,
    default : null
},
choices : [
    {
        body: {
            type : String,
            required : true
        },
        isAnswer : {
            type : Boolean,
            required : true,
            default : false
        }
    }
],
score : {
    type : Number,
    default : 0
},
userId : {
    type : mongoose.Types.ObjectId
},
category : {
    type : String
}
```



