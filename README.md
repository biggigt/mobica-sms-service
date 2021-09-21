
# SMS service for LMS Money+
# Getting started
## Prerequisites

You need these tools to be installed:

-   node v14.17.* >

## Starting service for first time

### Running service

Install dependencies and run the service

```
npm install
npm start
```
By default it will launched on port `3000`, you can set it in `.env` file as `PORT` if needed.

## API

Description | Request type | Request url | Payload
------------ | ------------ | ------------ | -------------
Sending single message | POST | http://localhost:3000/sms/send | See [Sending SMS payload](https://github.com/biggigt/mobica-sms-service#sending-sms-payload)
Get status of the sent message | GET | http://localhost:3000/sms/checkStatus | See [SMS status check payload](https://github.com/biggigt/mobica-sms-service#sms-status-check-payload)
Get delivery report request status on sent message | GET | http://localhost:3000/sms/deliveryReport | See [Delivery Report payload](https://github.com/biggigt/mobica-sms-service#delivery-report-payload)
Check balance of account in Mobica | GET | http://localhost:3000/sms/balance | See [Balance check payload](https://github.com/biggigt/mobica-sms-service#balance-check-payload)

## Sending SMS payload
### Sample Request
```json
{
    "user":" username/email ",
    "pass":" password ",
    "phone":" phone# ",
    "message":" Your message here! ",
    "from":" from ",
    "idd":" unique id of the message ",
    "route":"defeault",
    "priority":" 0 ",
    "smartCut":" 1 ",
    "toDate":""
}
```

### Sample response
```json
{
 "status": "1004" , 
 "desc": "message accepted" ,
}
```

## SMS status check payload
### Sample Request
```json
{
    "user":" username/email ",
    "pass":" password ",
    "phone":" phone# ",
    "message":" Your message here! ",
    "from":" from ",
    "route":"default"
}
```

### Sample response
```json
1004 //if all is OK
```

## Delivery report payload
### Sample Request
```json
{
    "user":" username/email ",
    "pass":" password ",
    "idd":" unique id of the message "
}
```
### Sample response
```json
1000 //sms is delivered
```

## Balance check payload
### Sample Request
```json
{
    "user":" username/email ",
    "pass":" password "
}
```
### Sample response
```json
10 Лв. //Your money
```
