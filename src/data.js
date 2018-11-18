import uuidv4 from 'uuid/v4';

export const conversations = [
  {
    id: 1,
    business: {
      id: 72,
      name: "Weddings by Gordon",
      businessType: "Celebrant",
      avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/madcitygg-profile_image-d182e6f9183999a2-300x300.jpeg",
    },
    quoteStatus: "none",
    cost: 400,
    lastMessageDateTime: "5:30 AM",
    lastMessageTruncated: "Deserunt tempor minim aliquip irure et commodo.",
    totalMessageCount: 15
  },
  {
    id: 2,
    business: {
      id: 73,
      name: "Kaplan's Weddings",
      businessType: "Celebrant",
      avatar: "http://profilepicturesdp.com/wp-content/uploads/2018/07/red-and-black-profile-picture-1.png",
    },
    quoteStatus: "declined",
    cost: 600,
    lastMessageDateTime: "Yesterday",
    lastMessageTruncated: "Sounds good, what's next?",
    totalMessageCount: 2
  },
  {
    id: 3,
    business: {
      id: 74,
      name: "Peter's Plumbing",
      businessType: "Plumber",
      avatar: "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
    },
    quoteStatus: "hired",
    cost: 80,
    lastMessageDateTime: "6:00 PM",
    lastMessageTruncated: "Thank you",
    totalMessageCount: 8
  },
  {
    id: 4,
    business: {
      id: 75,
      name: "Celebration by Anthony",
      businessType: "Celebrant",
      avatar: "https://i.pinimg.com/236x/69/73/04/6973040320e7b4a41bca0c7b1e016c61.jpg",
    },
    quoteStatus: "declined",
    cost: 250,
    lastMessageDateTime: "20/15/18",
    lastMessageTruncated: "Fugiat dolore consectetur Being such a basic skill, it is expected that you will be able to organise your own work so that, if someone needs your assistance, you can access whatever aids are required straight away",
    totalMessageCount: 0
  }
]

export const messages = {
  1: [
    {
      id: 1,
      name: "Gordon",
      message: "Hello",
      attachment: null,
      for_me: false,
      created_at: "",
      seen: true
    },
    {
      id: 2,
      name: "Mike",
      message: "Hello back",
      attachment: null,
      for_me: true,
      created_at: "",
      seen: true
    }
  ]
};

export const altMessages = [
  {
    id: 1,
    name: "Gordon",
    message: "Hello",
    attachment: null,
    for_me: false,
    created_at: "",
    seen: true
  },
  {
    id: 2,
    name: "Mike",
    message: "Hello back",
    attachment: null,
    for_me: true,
    created_at: "",
    seen: true
  }
];

export const createNewMessage = (message) => {
  const newMessageId = uuidv4();
  return {
    id: newMessageId,
    name: null,
    message,
    attachment: null,
    for_me: true,
    created_at: "",
    seen: false
  };
}
