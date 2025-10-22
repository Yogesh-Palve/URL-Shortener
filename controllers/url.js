const URL = require("../models/url");
const { nanoid } = require("nanoid");

const handleGenerateNewShortUrl = async (req, res) => {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ msg: "url is required" });

    // to avoid duplicates
    const existing = await URL.findOne({ redirectURL: body.url });
    if (existing) {
      return res.render("home", {
        shortId: existing.shortId,
        urls: await URL.find({}),
      });
    }
    const shortId = nanoid(8);
    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.render("home", { shortId: shortId, urls: await URL.find({}) });
    // return res.status(201).json({msg : "success", id : shortId})
  } catch (err) {
    res.status(400).json({ msg: "failed" });
  }
};

const handleRedirect = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timeStamp: Date.now(),
          },
        },
      },
      { new: true }
    );
    console.log(entry.redirectURL);
    return res.redirect(entry.redirectURL);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err });
  }
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  console.log(result);
  return res
    .status(200)
    .json({
      totalClicks: result.visitHistory.length,
      analysics: result.visitHistory,
    });
};
module.exports = {
  handleGenerateNewShortUrl,
  handleRedirect,
  handleGetAnalytics,
};
