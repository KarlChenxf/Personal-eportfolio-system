Format:

Method: post,put,delete,get   
Url: eg. /user/login  (add http://3.135.244.103:9090 before that)    
message body to send (json) 
returned message (json)


For those apis which need login, please put the token in the request header

If request fail return json will be as following
```json
{
    "status":"fail",
    "message":"why it failed"
}
```

# Login

post  
/user/login

```json
{
	"password":"123",
	"email":"admin"
}
```

return
```json
{
    "user": {
        "id": "64245f13-b350-4e33-8038-8475811cc73f",
        "email": "admin",
        "password": "202cb962ac59075b964b07152d234b70",
        "profiles": [
            {
                "id": 1,
                "html": "<div blabla></div>",
                "url": "https://google.com"
            },
            {
                "id": 2,
                "html": "<div blabla></div>",
                "url": "https://google.com"
            }
        ]
    },
    "status": "success",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDI0NWYxMy1iMzUwLTRlMzMtODAzOC04NDc1ODExY2M3M2YifQ.9E0Sz9xGTRnhuw_8BWWwDcY-NeCR7SghRhVrZOHCEpE"
}{
	"userName":"admin",
	"password":"123",
	"email":"admin"
}
```


# sign up

post

/user/signup
```json
{
	"password":"123",
	"email":"admin"
}
```
return
```json
{
    "user": {
        "id": "9f0f982a-9f20-484d-80c4-a91c3aea494c",
        "email": "admin@gamil.com",
        "password": "202cb962ac59075b964b07152d234b70",
        "profiles": []
    },
    "status": "success",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjBmOTgyYS05ZjIwLTQ4NGQtODBjNC1hOTFjM2FlYTQ5NGMifQ.fK5UHe0UgCRPYUfOJxFYD1gaDyx_R177rgrq-ZIEgWs"
}

```


# get profile (Need login)
get

/profile/get

```json
{
	"userid": "64245f13-b350-4e33-8038-8475811cc73f"
}
```
return 
```json
{
    "profile": [
        {
            "id": 1,
            "html": "<div blabla></div>",
            "url": "https://google.com"
        },
        {
            "id": 2,
            "html": "<div blabla></div>",
            "url": "https://google.com"
        }
    ],
    "status": "success"
}
```

or
send
```json
{
	"profileid":1
}
```
return
```json
{
    "profile": {
        "id": 1,
        "html": "<div blabla></div>",
        "url": "https://google.com"
    },
    "status": "success"
}
```

#add profile(need login)

post

/profile/add

html and url could be null
```json
{
        "userid": "c71512a7-e1a9-4fa0-b656-f44b464a976f",
        "html":"<div>test2</div>",
        "url":"www.google.com"
}
```
return
```json
{
    "profile": {
        "id": 3,
        "html": "<div>test2</div>",
        "url": "www.google.com"
    },
    "user": {
        "id": "64245f13-b350-4e33-8038-8475811cc73f",
        "email": "admin",
        "password": "202cb962ac59075b964b07152d234b70",
        "profiles": [
            {
                "id": 1,
                "html": "<div blabla></div>",
                "url": "https://google.com"
            },
            {
                "id": 2,
                "html": "<div blabla></div>",
                "url": "https://google.com"
            },
            {
                "id": 3,
                "html": "<div>test2</div>",
                "url": null
            }
        ]
    },
    "status": "success"
}
```

# Update profile(Need login)
PUT

/profile/update

update every thing in profile. If you do not include html here, html will be set to null.
```json
{
        "id": 3,
        "html": "<div>test211</div>",
        "url": null
    
}
```
return
```json
{
    "profile": {
        "id": 3,
        "html": "<div>test211</div>",
        "url": null
    },
    "status": "success"
}
```

# Delete profile (Need login)

Delete

/profile/delete

```json
{
        "id": 3
    
    }
```
return
```json
{
    "status": "success"
}
```


# Get share token(Need login)
get

/share/getlink
```json
    {
        "profileid": 1
    }
```
return
```json
{
    "now": "2020-03-19T11:49:51.288+0000",
    "expiredate": "2020-03-20T11:49:51.288+0000",
    "status": "success",
    "sharetoken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ0ZWFtMTJzaGFyZWxpbmsxIiwiZXhwIjoxNTg0NzA0OTkxfQ.New5jrLpNfT03la0DjVqIK9jQtwmGsE9pEI_NuhLJ0Q"
}
```

# Get shared profile
get

http://3.135.244.103:9090/share/getprofile?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ0ZWFtMTJzaGFyZWxpbmsxIiwiZXhwIjoxNTg0NzA0OTkxfQ.New5jrLpNfT03la0DjVqIK9jQtwmGsE9pEI_NuhLJ0Q

return 
```json
{
    "profile": {
        "id": 1,
        "html": "<div blabla></div>",
        "url": "https://google.com"
    },
    "status": "success"
}

```
