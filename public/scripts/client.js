/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(arr) {
    for (const item of arr) {
      $(`.prepend`).prepend(createTweetElement(item));
    }
  };
  const prePendTweet = function(arr) {
    const $lastItem = arr[arr.length - 1];
    $(`.prepend`).prepend(createTweetElement($lastItem));
  };
  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article></article>`);
    const $header = $(`
    <header>
      <div class="faceIcon">
        <img src=${tweetData.user.avatars} alt="Face Icon">
        <span>${tweetData.user.name}</span>
      </div>
      <span class="grey">${tweetData.user.handle}</span>
    </header>`);
    const $textareaTweet = tweetData.content.text;
    const $tweetBody = $(`<p></p>`).text($textareaTweet);
    const $timeAgo = timeago.format(tweetData.created_at);
    const $footer = $(`
    <footer>
      <span>${$timeAgo}</span>
      <div class="icons">
        <span><i class="fa-solid fa-flag"></i></span>
        <span><i class="fa-solid fa-retweet"></i></span>
        <span><i class="fa-solid fa-heart"></i></span>
      </div>
    </footer>`);
    $tweet.append($header);
    $tweet.append($tweetBody);
    $tweet.append($footer);

    return $tweet;

  };
  
  $(`.errorMsg`).hide();

  $("form").on("submit", function(event) {
    event.preventDefault();
    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      $(`.insertError`).text("Please fill out tweet");
      return $(`.errorMsg`).slideDown(() => {
        setTimeout(() => {
          $(`.errorMsg`).slideUp();
        }, 2000);
      });
    }
    else if ($("#tweet-text").val().length > 140) {
      $(`.insertError`).text("Tweet too long. Please limit to 140 characters or less");
      return $(`.errorMsg`).slideDown(() => {
        setTimeout(() => {
          $(`.errorMsg`).slideUp();
        }, 2000);
      });
    }
    const $tweetText = $("#tweet-text");
    
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $tweetText.serialize()
    })
    .then(() => {
      $.ajax({
        url: "http://localhost:8080/tweets",
        method: "GET",
      })
      .done((result) => {
        prePendTweet(result);
      });
    });
    $("#tweet-text").val('');
    $(`.counter`).val('140');
  });

  const loadTweets = function() {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    })
    .done((result) => {
      renderTweets(result);
    });
  };
  loadTweets();
});