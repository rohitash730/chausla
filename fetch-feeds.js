// Path: scripts/fetch-feeds.js
const Parser = require("rss-parser");
const fs = require("fs");
const parser = new Parser();

(async () => {
  const feeds = [
    { name: "Reuters", url: "https://www.reuters.com/tools/rss" },
    { name: "NPR", url: "https://www.npr.org/rss/rss.php?id=1001" }
  ];

  let data = {};
  for (let feed of feeds) {
    const parsed = await parser.parseURL(feed.url);
    data[feed.name] = parsed.items.slice(0, 10).map(item => ({
      title: item.title,
      link: item.link,
      date: item.pubDate
    }));
  }
  fs.writeFileSync("src/_data/feeds.json", JSON.stringify(data, null, 2));
})();
