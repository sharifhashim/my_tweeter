/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Loops through array of objects to get data from tweets and pass them into another function
  const renderTweets = function(arr) {
    for (const item of arr) {
      $(`.prepend`).prepend(createTweetElement(item));
    }
  };
  // Gets the lastest tweet and prepends to top of html section $(`.prepend)
  const prePendTweet = function(arr) {
    const $lastItem = arr[arr.length - 1];
    $(`.prepend`).prepend(createTweetElement($lastItem));
  };
  // Access tweet object and create elemets around that data to insert into html
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
  // Hide html error message on intial page load
  $(`.errorMsg`).hide();
  // Event listener attacted to form element 
  $("form").on("submit", function(event) {
    event.preventDefault();
    // If textarea empty send error message 
    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      $(`.insertError`).text("Please fill out tweet");
      return $(`.errorMsg`).slideDown(() => {
        setTimeout(() => {
          $(`.errorMsg`).slideUp();
        }, 2000);
      });
    }
    // If textarea over 140 characters send error message
    else if ($("#tweet-text").val().length > 140) {
      $(`.insertError`).text("Tweet too long. Please limit to 140 characters or less");
      return $(`.errorMsg`).slideDown(() => {
        setTimeout(() => {
          $(`.errorMsg`).slideUp();
        }, 2000);
      });
    }
    const $tweetText = $("#tweet-text");
    // If tweet passes validation send the tweet to /tweets (post request) after post request send a Get request to update page with new tweet
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
    // Reset text area 
    $("#tweet-text").val('');
    // Reset charachter counter
    $(`.counter`).val('140');
  });
  // Get request to load any tweets stored at /tweets on page load
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