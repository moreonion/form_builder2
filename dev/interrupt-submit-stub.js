(function () {
  function dispatch (el, type) {
    const e = document.createEvent('Event')
    e.initEvent(type, true, true)
    el.dispatchEvent(e)
  }

  var appHasListeners = false

  function addListeners (app) {
    if (!appHasListeners) {
      app.addEventListener('resume-leave-page', function () {
        alert('You can leave the page now.')
      })
      app.addEventListener('cancel-leave-page', function () {
        alert('Just stay here for a moment.')
      })
      appHasListeners = true
    }
  }

  document.querySelectorAll('[id^=trigger-]').forEach(function (el) {
    el.addEventListener('click', function () {
      var app = document.querySelector('[data-interrupt-submit]')
      addListeners(app)
      dispatch(app, el.id.substr(8))
    })
  })
})()
