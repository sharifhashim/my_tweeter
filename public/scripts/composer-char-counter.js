$(document).ready(function() {
  // Attached event listener to textarea 
  $("#tweet-text").on("input", function() {
    const $counter = $(this).val().length
    // update character counter when text is input into textarea
    $(this).siblings(".tweetbtn").children(".counter").html(140 - $counter)
    const $maxLength = $(this).siblings(".tweetbtn").children(".counter").html()
    // If textarea exceeds limit of 140 characters apply class to give red color
    if ($maxLength < 0) {
      $(this).siblings(".tweetbtn").children(".counter").addClass("negativeCount")
    } else {
      $(this).siblings(".tweetbtn").children(".counter").removeClass("negativeCount")
    }
  })
})