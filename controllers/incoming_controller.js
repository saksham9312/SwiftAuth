const Client = require("../modals/clients");
const twilio = require("twilio");
const WA = require("../controllers/helper_functions/whatsapp");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

module.exports.checkClient = async function (req, res) {
  let message = req.body;
  let { Body, From } = req.body;
  let splitMessage = Body.split("to ");
  // console.log(From);

  try {
    try {
      var clientName = splitMessage[1].toLowerCase();
    } catch (err) {
      if (err.name === "TypeError") {
        await WA.sendMessage(`Invalid Response. Please Try Again!`, From);
        return;
      }
    }

    if (clientName == "swiftauth") {

      let clientNum = From.split("+91");
      let client = await Client.findOne({ contact: clientNum[1] });
      console.log(client);
      if(client){
        const token = jwt.sign(client.toJSON(), secretKey, { expiresIn: "1d" });
        console.log(token);
        const url = `https://swiftauth.onrender.com/client/dashboard/setup/${token}`;
        console.log(url);
        await WA.sendMessage(`Please continue on this link.\n${url}`,From);
        return;
      }

    } else {
      //for API
      let client = await Client.findOne({ name: clientName });
      // console.log(client);
      if (!client) {
        await WA.sendMessage(
          `${splitMessage[1]} is not Registered with us.`,
          From
        );
      } else if (client) {
        const encodedData = encodeURIComponent(JSON.stringify(message));
        //change the url later
        res.redirect(307, "/api/v1/process?data=" + encodedData);
      } else {
        await WA.sendMessage(`Invalid Response`, From);
      }
    }
  } catch (err) {
    console.log("Error in finding client in DB", err);
  }
};
