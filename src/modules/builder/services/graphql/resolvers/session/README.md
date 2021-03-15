## GraphQL::Resolvers::Session

Resolver to create and  return sessions

### Requisites 

#### Session.create 

☑ check is **valid date**

☑ check have **seats free** (go/go and back)

☑ check session **seats free** in another sessions (go/go and back)

☑ remove old sessions 

☑ create id locator
  - check id exist, if exist create another and check

☑ reserve temporary seat


#### Session.get 

☐ check exist in store

☑ if not exist check exist locator in database

☑ check is not expirated

☑ is both ok send back session


#### Session.registerPassengers 

☑ use Session.get to get locator

☑ fields required

☑ check is valid birthday

☑ update age

☐ check is valid phone number

☑ check is valid email

☑ save passengers

☑ send back session updated
