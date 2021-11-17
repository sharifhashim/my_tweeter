/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
//   const tweetData = {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//         "handle": "@SirIsaac"
//       },
//     "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//     "created_at": 1461116232227
//  }

  const renderTweets = function(arr) {
    for (const item of arr) {
      $(`.container`).append(createTweetElement(item))
    }
  }

  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article></article>`)
    const $header = $(`
    <header>
      <div class="faceIcon">
        <img src=${tweetData.user.avatars} alt="Face Icon">
        <span>${tweetData.user.name}</span>
      </div>
      <span class="grey">${tweetData.user.handle}</span>
    </header>`)
    const $tweetBody = $(`<p>${tweetData.content.text}</p>`)
    const $timeAgo = timeago.format(tweetData.created_at)
    const $footer = $(`
    <footer>
      <span>${$timeAgo}</span>
      <div class="icons">
        <span><i class="fa-solid fa-flag"></i></span>
        <span><i class="fa-solid fa-retweet"></i></span>
        <span><i class="fa-solid fa-heart"></i></span>
      </div>
    </footer>`)
    $tweet.append($header)
    $tweet.append($tweetBody)
    $tweet.append($footer)

    return $tweet

  }
  renderTweets(data);

})