(function () {
  var assetRoot = './assets/';
  var projectContainer = document.querySelector('#container-project');
  var loadableYears = [1992, 1993, 1995, 1996, 1997, 1998, 2000, 2002, 2003, 2005, 2007, 2009, 2010, 2011, 2012, 2014, 2016, 2017, 2019]
  updateVideo(1992);

  var lastYear = null
  document.addEventListener("timeline-scroll", function(e) {
    var date = new Date(e.detail.date);
    var year = date.getFullYear();
    
    if (lastYear !== year && isLoadableYear(year)) {
      updateVideo(year);
    }

    lastYear = year;
  })

  var deleteTimeout = null

  function updateVideo (year) {
    var lastVideos = projectContainer.querySelectorAll('video');
    var newVideo = document.createElement('video');
    newVideo.muted = true;
    newVideo.classList.add('video');
    newVideo.src = getVideoUrl(year);
    newVideo.play();

    projectContainer.appendChild(newVideo);

    requestAnimationFrame(function () {
      newVideo.style.opacity = 1;
    })

    clearTimeout(deleteTimeout);
    deleteTimeout = setTimeout(function () {
      for (var i = lastVideos.length - 1; i >= 0; i--) {
        var currentVideo = lastVideos[i];
        projectContainer.removeChild(currentVideo);
      }
    }, 1000)
  }

  function isLoadableYear (year) {
    return loadableYears.indexOf(year) > -1;
  }

  function getVideoUrl (year) {
    return assetRoot + year + '.mp4';
  }
})();