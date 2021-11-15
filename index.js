const TelegramApi = require("node-telegram-bot-api");
const token = "2108088011:AAFwg7nKtZ_pV1eh5ZufiMwd31Xl2_a8oUs";

const bot = new TelegramApi(token, { polling: true });
const chats = {};
const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],

      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
      [{ text: "0", callback_data: "0" }],
    ],
  }),
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Получить информацию о пользователе" },
    { command: "/game", description: "Игра угадай число" },
  ]);
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendPhoto(chatId, "cat-bot.jpg");
      return bot.sendMessage(chatId, "Добро пожаловать!");
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`);
    }
    if (text === "/game") {
      await bot.sendMessage(
        chatId,
        "Сейчас я загадаю цифру от 0 до 9,а ты должен ее угадать!"
      );
      const randomNumber = Math.floor(Math.random() * 10);
      chats[chatId] = randomNumber;
      return bot.sendMessage(chatId, "Отгадывай!", gameOptions);
    }
    return bot.sendMessage(chatId, "Я тебя не понимаю,попробуй еще раз!");
  });
  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === chats[chatId]) {
      return await bot.sendMessage(
        chatId,
        `Поздравляю,ты угадал цифру ${chats[chatId]}`
      );
    } else {
      return await bot.sendMessage(
        chatId,
        `К сожалению,ты не угадал,бот выбрал цифру ${chats[chatId]}`
      );
    }
  });
};
start();
