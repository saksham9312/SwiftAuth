

# SwiftAuth 🚀
### Seamless Authentication; Hassle-free Integeration

SwiftAuth is a SaaS platform that enables businesses to authenticate their users directly from messaging apps and emails, bypassing the need for passwords or OTPs. This innovative solution simplifies the authentication process for both businesses and their customers, providing a secure and reliable authentication process that eliminates the need for users to maintain passwords or wait for OTPs to log in to their desired services. This not only saves time and resources but also improves customer satisfaction by providing a hassle-free and seamless authentication experience. 



## Tech Stack 💻

**Client:** ExpressJs, Twilio API, Whatsapp

**Server:** NodeJs

**Database:** MongoDb




## Features ✨

* **Passwordless Authentication**: SwiftAuth eliminates the need for passwords by enabling users to authenticate directly from their messaging apps or emails. This ensures a streamlined and secure authentication process.
* **OTP Bypass:** Users no longer need to wait for OTPs (One-Time Passwords) to arrive and enter them manually. SwiftAuth bypasses the OTP step, saving time and providing a frictionless user experience.
* **Messaging App Integration:** SwiftAuth integrates seamlessly with popular messaging apps such as WhatsApp, Facebook Messenger, or Slack. Users receive authentication links or codes directly in their preferred messaging app, enhancing convenience and accessibility. Businesses can acquire more users and drive more conversions using this whatsapp and other messaging platforms.
* **Cost-Effective Solution:** SwiftAuth enables businesses to reduce their costs by almost 50%, associated with managing and sending OTPs via SMS. By leveraging messaging platforms like WhatsApp, Telegram, or other similar messaging apps, businesses can replace the expensive SMS-based OTP system with a more cost-effective solution. This eliminates the need for dedicated SMS gateways and reduces the operational expenses related to OTP delivery.
* **Developer-Friendly API:** SwiftAuth offers a developer-friendly API that allows businesses to integrate authentication capabilities seamlessly into their existing applications and services.
* **Track Your Customers easily:** Using SwiftAuth Dashboard as well as API, businesses can easily track the login activity of users on their platform.

## Get Started
### Since we are using Twilio SandBox, we have to set it up:
* Click on this number - [Here](https://wa.me/14155238886)

* Send "join air-ranch" to get connected to Twilio Api.

* Pin this chat to the top for faster accessibility.

* You are all set to recieve links!

### For further guide, please follow this video: [Guide](https://youtu.be/FXkFOKAP4pE)

    
## API Reference

#### Configure Parameters

```http
  PUT https://swiftauth.onrender.com/api/v1/business/config?credential=<YOUR_API_KEY>
```
Send this as Body 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `customDomain` | `string` | **Required**. Set your domain name|
 `redirectPage` | `string` |**Required**. Set your page, where you want your user to get redirected to once logged in|

#### Register User on SignUp
Whenever user signs up on your platform, also call this API to register in the database

```http
  POST https://swiftauth.onrender.com/api/v1/register/<YOUR_API_KEY>
```
Send this as Body 

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the user |
| `email`      | `string` | **Required**. Email of the user |
| `phone`      | `number` | **Required**. Phone No of the user |




## Demo
### To understand, step by step, Please refer to this video [Guide](https://youtu.be/FXkFOKAP4pE)


## Contributing ➕➕

Contributions are always welcome!

Follow the steps below to get started:
* Step 1 - Fork the project
* Step 2 - Clone the Project
* Step 3 - Install Dependencies
* Step 4 - Create A New Branch
* Step 5 - Develop, Stage, and Commit
* Step 6 - Push the Changes
* Step 7 - Create a Pull Request


## Feedback

If you have any feedback, please reach out to us at saksham271.sg@gmail.com

## Developed ❤️ By

- [@saksham9312](https://github.com/saksham9312)


