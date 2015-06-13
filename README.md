# Hippo App

###Contributors:
- Jowell
- Lamson
- Kumar (aka: Eeshan)
- Clint





#### User Response Data
/v2.3/me

{
  "id": "10209208393971668",
  "first_name": "Clint",
  "gender": "male",
  "last_name": "Nelson",
  "link": "https://www.facebook.com/app_scoped_user_id/10209208393971668/",
  "locale": "en_US",
  "name": "Clint Nelson",
  "timezone": -7,
  "updated_time": "2015-06-05T23:41:38+0000",
  "verified": true
}



#### Taggable Friends Response Data
/v2.3/me/taggable_friends?fields=picture.width(500),name

Response includes two objects:

**data**: Array of Objects - one for each friend. (only one friend shown, typically many more)

**paging**: Loading next block of friends
```
{
  "data": [
    {
      "picture": {
        "data": {
          "height": 720,
          "is_silhouette": false,
          "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/p720x720/10959479_10104682324476030_5185150844756614382_n.jpg?oh=227a42f025aa5e7c2fe1be322818f623&oe=562EAF18&__gda__=1442297475_eb60bc6c60c40b2e8f8e6d26982a3b32",
          "width": 720
        }
      },
      "name": "Eeshan Kumar",
      "id": "AaJpMnAGP4NATQTmcfg0DKmEVvBrn9LSdKfu9Gq3KzHLYT7bhcRG3gr8HX-Pu18xjPVHhQiRedfGFSYR8GRYMiZEQC3hQBFG6xgB-mw2wzonvw"
    }
  ],
  "paging": {
    "cursors": {
      "before": "QWFLT0FqQ0tGZHp5NDM3YWhPSWNKQTVJa1JhM0Vmd1dDVHZDVHF0RDVoTzl4M3dmbjNWVnd6Z0EyUzFqSkUzTjdZN2QxeU82SGNIdnBiYjhlQmpwNk4yTGdqUnNpLVA0Q1VKMldEVFRIelFxQnc=",
      "after": "QWFMTmF6WC01MkNjQnA1UkdQOUtpMHBVZTNmU1ZsRDZYdENoSU12V2xxbjhTN1F6emZfc0FwcnZBNlhSbS03R1dwOWI5Z0hMTnA3QzhtS0lxZG40X0hYUzU3QVI3X2lhbEdVYjhvU1FOeUNfQ3c="
    },
    "next": "https://graph.facebook.com/v2.3/10104208393961668/taggable_friends?pretty=0&fields=picture.width(500),name&limit=25&after=QWFMTmF6WC01MkNjQnA1UkdQOUtpMHBVZTNmU1ZsRDZYdENoSU12V2xxbjhTN1F6emZfc0FwcnZBNlhSbS03R1dwOWI5Z0hMTnA3QzhtS0lxZG40X0hYUzU3QVI3X2lhbEdVYjhvU1FOeUNfQ3c="
  }
}
```
