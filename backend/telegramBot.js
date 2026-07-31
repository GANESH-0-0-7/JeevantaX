import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import { symptom } from "./utils/symptom.js";
import { gemini } from "./utils/gemini.js";
import User from "./models/user.model.js";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.error("❌ TELEGRAM_BOT_TOKEN is missing.");
    process.exit(1);
}

console.log("🤖 Starting Telegram Bot...");

const bot = new TelegramBot(token, {
    polling: true,
});

bot.getMe()
    .then((me) => {
        console.log(`✅ Logged in as @${me.username}`);
    })
    .catch((err) => {
        console.error("❌ Telegram Login Error:", err.message);
    });

bot.on("polling_error", (err) => {
    console.error("❌ Polling Error:", err.message);
});

bot.on("webhook_error", (err) => {
    console.error("❌ Webhook Error:", err.message);
});

// ======================
// /start
// ======================

bot.onText(/^\/start$/i, async (msg) => {
    await bot.sendMessage(
        msg.chat.id,
`👋 Welcome to JeevantaX!

🤖 I am JeevaMitra

Available Commands

/start

/help

/symptom <your symptoms>

/doctor <problem>

/diet <goal>

Example

/symptom I have fever and headache`
    );
});

// ======================
// /help
// ======================

bot.onText(/^\/help$/i, async (msg) => {
    await bot.sendMessage(
        msg.chat.id,
`📖 Commands

/start

/help

/symptom I have cold

/doctor Chest pain

/diet Weight loss`
    );
});

// ======================
// /symptom
// ======================

bot.onText(/^\/symptom (.+)$/i, async (msg, match) => {

    try {

        const text = match[1];

        await bot.sendChatAction(msg.chat.id, "typing");

        const response = await symptom(text);

        await bot.sendMessage(msg.chat.id, response);

    } catch (error) {

        console.error("========== SYMPTOM ERROR ==========");
        console.error(error);
        console.error(error.message);
        console.error(error.stack);
        console.error("==================================");

        await bot.sendMessage(
            msg.chat.id,
            "❌ Symptom analysis failed."
        );
    }

});

// ======================
// /doctor
// ======================

bot.onText(/^\/doctor (.+)$/i, async (msg, match) => {

    try {

        const description = match[1];

        await bot.sendChatAction(msg.chat.id, "typing");

        const specialization = await gemini(description);

        const doctor = await User.findOne({
            role: "doctor",
            specialization,
        }).sort({ rating: -1 });

        if (!doctor) {

            return bot.sendMessage(
                msg.chat.id,
                "❌ No doctor found."
            );

        }

        await bot.sendMessage(
            msg.chat.id,

`👨‍⚕️ Doctor Found

Name : ${doctor.fullName}

Specialization : ${doctor.specialization}

Rating ⭐ ${doctor.rating}`
        );

    } catch (error) {

        console.error("========== DOCTOR ERROR ==========");
        console.error(error);
        console.error(error.message);
        console.error(error.stack);
        console.error("==================================");

        await bot.sendMessage(
            msg.chat.id,
            "❌ Doctor recommendation failed."
        );

    }

});

// ======================
// /diet
// ======================

bot.onText(/^\/diet (.+)$/i, async (msg, match) => {

    try {

        await bot.sendChatAction(msg.chat.id, "typing");

        const response = await symptom(
            `Create a healthy diet plan for ${match[1]}`
        );

        await bot.sendMessage(msg.chat.id, response);

    } catch (error) {

        console.error("========== DIET ERROR ==========");
        console.error(error);
        console.error(error.message);
        console.error(error.stack);
        console.error("==================================");

        await bot.sendMessage(
            msg.chat.id,
            "❌ Diet generation failed."
        );

    }

});

// ======================
// Normal Chat
// ======================

bot.on("message", async (msg) => {

    const text = (msg.text || "").trim();

    if (text.startsWith("/"))
        return;

    try {

        await bot.sendChatAction(msg.chat.id, "typing");

        const response = await symptom(text);

        await bot.sendMessage(msg.chat.id, response);

    } catch (error) {

        console.error("========== CHAT ERROR ==========");
        console.error(error);
        console.error(error.message);
        console.error(error.stack);
        console.error("==================================");

        await bot.sendMessage(
            msg.chat.id,
            "❌ AI is currently unavailable."
        );

    }

});

export default bot;