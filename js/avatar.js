'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var preview = document.querySelector('.setup-user-pic');
  var mainAvatar = document.querySelector('.setup-open-icon');

  var onLoad = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        mainAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  window.avatar = {
    onLoad: onLoad
  };
})();
