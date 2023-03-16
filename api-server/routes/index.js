var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET방식
router.get("/api/nodejs-api", function (req, res) {
  res.status(200).json({
    message: "hello get api nodejs-api",
  });
});

// POST방식
router.post("/api/nodejs-api", function (req, res) {
  res.status(200).json({
    message: "hello post api nodejs-api",
  });
});

// GET방식
router.get("/api/example-v1", function (req, res) {
  res.status(200).json({
    rsp: {
      stat: "ok",
      uuid: "012345678-9abc-def0-1234-567890abcdef",
      categories: [
        {
          domain: "channel",
        },
        {
          domain: "movie",
        },
        {
          domain: "show",
        },
        {
          domain: "youtube",
        },
      ],
      system_sentence: "action",
      tvcontent: [
        {
          type: "movie",
          type_id: "H100",
          domain: ["movie"],
          search_id: "1234567",
          program: {
            parent_id: "-1",
            id: "1234567",
            title: "Last Vegas",
            lang: "en",
            original_air_date: "2013-01-01",
            rating: "PG-13",
            original_popularity: 48,
            poster: {
              images: {
                url: "https://img-resize-cdn-stg.samsungumd.net/resize?url=http://umd-stg-images.s3.amazonaws.com/processed/tribune/assets/p9991364_v_h10_al.jpg&h=416",
                width: 1920,
                height: 1080,
              },
            },
            genres: [
              {
                name: "Comedy",
              },
            ],
          },
          vods: [
            {
              host_id: 1272,
              app_id: "1234567890123",
              app_name: "Apple TV",
              poster: {
                images: {
                  url: "https://img-resize-cdn-stg.samsungumd.net/resize?url=http://umd-stg-images.s3.amazonaws.com/manual/ott/apps/3201807016597/aria_logo.png",
                },
              },
              options: [
                {
                  license: "rental",
                  quality: "HD",
                  price: 3.99,
                  currency: "USD",
                  deeplink: "deeplink_data",
                  available_starting: "2021-09-24T00:00:00Z",
                  available_ending: "2255-01-01T00:00:00Z",
                },
              ],
            },
            {
              host_id: 1478,
              app_id: "2234567890123",
              app_name: "Paramount+",
              poster: {
                images: {
                  url: "https://img-resize-cdn-stg.samsungumd.net/resize?url=http://umd-stg-images.s3.amazonaws.com/manual/ott/apps/3201710014981/paramount_logo.png",
                },
              },
              options: [
                {
                  license: "subscription",
                  quality: "HD",
                  price: null,
                  currency: "",
                  deeplink: "deeplink_data",
                  available_starting: "2022-07-28T23:11:04Z",
                  available_ending: "2050-12-31T20:00:00Z",
                },
              ],
            },
          ],
          channels: [
            {
              channel_id: "1234",
              source_id: "1234",
              lineup_id: "123",
              channel_number: "567",
              attributes: "Digital,HDTV,Premium",
              channel_name: "Showtime HD",
              timezone_offset: -300,
              poster: {
                images: {
                  url: "https://round-logo.samsungumd.net/round?url=http://umd-stg-images.s3.amazonaws.com/processed/tribune/assets/s21868_h3_aa.png",
                },
              },
              rovi_source_id: "9091",
              schedules: [
                {
                  start_time: "2023-02-24T10:00:00Z",
                  end_time: "2023-02-24T12:00:00Z",
                  duration: 120,
                },
              ],
            },
          ],
          scores: {
            match: "WORD_MATCH",
            recency: 0.898466,
            popularity: 0.012905,
            search_popularity: 0,
            score: 58000.50520576,
            boost: ["on air"],
          },
          search_type: "normal_search",
        },
        {
          type: "youtube",
          type_id: "E160",
          domain: ["youtube"],
          search_id: "hq3yfQnllfQ",
          content_info: {
            id: "hq3yfQnllfQ",
            title:
              "Phonics Song with TWO Words - A For Apple - ABC Alphabet Songs with Sounds for Children",
            publisher: "ChuChu TV Nursery Rhymes & Kids Songs",
            published_at: "2014-03-06T20:57:50Z",
            nextPageToken: "CDIQAA",
            poster: {
              images: {
                url: "https://i.ytimg.com/vi/hq3yfQnllfQ/mqdefault.jpg",
              },
            },
            link_poster: {
              images: {
                type: "image/png",
                url: "https://d1oxlq5h9kq8q5.cloudfront.net/tvstore/contents/111299001912/icon_250x250_r_20170921013733000.png",
              },
            },
            link_target: "111299001912",
            duration: 246,
            view_count: "5181758381",
          },
          scores: {
            match: "PARTIAL",
            recency: 0,
            popularity: 0,
            search_popularity: 0,
            score: 1000,
          },
          search_type: "normal_search",
        },
      ],
    },
  });
});

module.exports = router;
