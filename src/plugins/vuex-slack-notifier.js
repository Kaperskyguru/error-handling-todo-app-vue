import axios from "axios";

const url = process.env.SLACK_WEBHOOK;

export default (store) => {
  store.subscribe((mutation) => {
    if (mutation.type === "STORE_ERRORS") {
      // Alert Slack here
      errorSlackAlert(mutation.payload);
    }
  });

  store.subscribeAction((action) => {
    // Alert Slack here
    vuexActionSlackAlert(action.type);
  });
};

function vuexActionSlackAlert(type) {
  const data = {
    username: "Action Notifier",
    icon_emoji: ":bangbang:",
  };
  data.text = `Vuex "${type}" action was excuted`;

  data.attachments = [];
  data.attachments = [
    {
      color: "#eed140",

      fields: [
        {
          title: "Environment",
          value: "Development",
          short: true,
        },
      ],
    },
  ];
  postToSlack(data);
}

function errorSlackAlert(payload) {
  const data = {
    username: "Error Notifier",
    icon_emoji: ":bangbang:",
  };
  data.text = payload.message;
  if (payload.resource) {
    data.text = payload.resource.message;
  }
  data.attachments = [];
  data.attachments = [
    {
      color: "#eed140",

      fields: [
        {
          title: "Environment",
          value: "Development",
          short: true,
        },
        {
          title: "StackTrace",
          value: payload.fileName,
          short: true,
        },
      ],
    },
  ];
  postToSlack(data);
}

function postToSlack(message) {
  axios
    .post(url, JSON.stringify(message))
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}
