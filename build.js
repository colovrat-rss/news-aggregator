const Parser = require('rss-parser');
const fs = require('fs');
const parser = new Parser();

const feeds = [
  "http://zmiiv-lyceum1.kh.sch.in.ua/rss",
  "https://media-zmiev.net.ua/engine/rss.php",
  "http://osvita-zm.org.ua/category/novini/feed/",
  "http://www.zmiivmisto.gov.ua/?format=feed&type=rss",
  "http://www.zmiiv-cbs.edu.kh.ua/rss",
  "https://zpf.company/feed/",
  "https://rayrada.org.ua/rss/9167/",
  "https://gomilsha.org.ua/feed/",
  "https://izum.church.ua/ru/feed/",
  "https://zmiev-societas.at.ua/news/rss/",
  "https://lycei1museum.at.ua/news/rss/",
  "http://zmiiv-school2.kh.sch.in.ua/rss",
  "https://zmiiv.com.ua/news-zmiiv/feed/",
  "https://rda.org.ua/rss/286/",
  "https://zmiiv-service.com.ua/index.php/news?format=feed&type=rss"
];

(async () => {
  let all = [];

  for (let url of feeds) {
    try {
      let feed = await parser.parseURL(url);
      feed.items.forEach(item => {
        all.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || item.isoDate,
          source: feed.title
        });
      });
    } catch (e) {
      console.log("Error with:", url);
    }
  }

  all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  all = all.slice(0, 10);

  fs.writeFileSync("feed.json", JSON.stringify(all, null, 2));
})();
