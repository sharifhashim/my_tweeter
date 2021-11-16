$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    const $counter = $(this).val().length
    $(this).siblings(".tweetbtn").children(".counter").html(140 - $counter)
    const $maxLength = $(this).siblings(".tweetbtn").children(".counter").html()
    console.log($maxLength)
    if ($maxLength < 0) {
      $(this).siblings(".tweetbtn").children(".counter").addClass("negativeCount")
    } else {
      $(this).siblings(".tweetbtn").children(".counter").removeClass("negativeCount")
    }
  })
})