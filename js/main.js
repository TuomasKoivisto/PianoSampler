$('#username-error').hide();
var error = $('#username-error');

$('#signup-link, #login-link').on('click', function() {
  $('form').toggleClass('hidden');
});

function verify_register_username(username) {
  error.hide();
  if (username == '') {
    error.css('color', 'red');
    error.fadeIn(200);
    error.html('Please enter username');
    error.delay(5000).fadeOut(200);
  } else {
    $.ajax({
      url: 'php/register.php',
      method: 'POST',
      data: { check_username: 1, username: username },
      success: function(data) {
        alert(data);
        error.css('color', 'red');
        error.show();
        if (data.includes('Username already exists')) {
          error.html('Username is taken');
        } else if (data.includes('Invalid username')) {
          error.html('Invalid username');
        } else if (data.includes('ok')) {
          error.html('OK');
          error.css('color', 'green');
        }
      }
    });
  }
}

$('#register-username').focusout(function() {
  var username = $('#register-username').val();
  verify_register_username(username);
});

function verify_login_username(username) {
  error.hide();
  if (username == '') {
    error.css('color', 'red');
    error.fadeIn(200);
    error.html('Please enter username');
    error.delay(5000).fadeOut(200);
  } else {
    $.ajax({
      url: 'php/signin.php',
      method: 'POST',
      data: { check_username: 1, username: username },
      success: function(data) {
        alert(data);
        var error = error;
        error.css('color', 'red');
        //fadein fadeout ei toimi
        error.show();
        if (data.includes('Username found')) {
          error.html('Username found');
          error.css('color', 'green');
        } else if (data.includes('Username not found')) {
          error.html('Username not found');
        } else if (data.includes('Sign in succesful!')) {
          error.html('Sign in succesful!');
          error.css('color', 'green');
        } else if (data.includes('Sign in failed')) {
          error.html('Sign in failed');
        }
      }
    });
  }
}

$('#login-username').focusout(function() {
  var username = $('#login-username').val();
  verify_register_username(username);
});

$('#password').keyup(function() {
  if ($('#password').val().length >= 6 && $('.username').val().length > 0) {
    $('#login-button, #submit-button').prop('disabled', false);
    error.hide();
  } else if ($('#password').val().length == 1) {
    error.dequeue();
    error.hide();
    error.css('color', 'red');
    error.fadeIn(200);
    error.html('<p>Password must be at least six characters long</p>');
    error.delay(5000).fadeOut(200);
  } else {
    $('#login-button, #submit-button').prop('disabled', true);
  }
});
$('#submit-button').click(function() {
  $('#register-form').submit(function() {
    $.ajax({
      url: 'php/register.php',
      method: 'POST',
      data: $('#register-form').serialize(),
      success: function(data) {
        alert(data);
      }
    });
  });
});

$('#login-button').click(function() {
  $('#login-form').submit(function() {
    $.ajax({
      url: 'php/signin.php',
      method: 'POST',
      data: $('#login-form').serialize(),
      success: function(data) {
        alert(data);
        var error = $('.username-error');
        error.css('color', 'red');
        //fadein fadeout ei toimi
        error.show();
        if (data.includes('Sign in succesful!')) {
          error.html('Sign in succesful!');
          error.css('color', 'green');
        } else if (data.includes('Sign in failed')) {
          error.html('Sign in failed');
        } else if (data.includes('Username found')) {
          error.html('Username found');
          error.css('color', 'green');
        } else if (data.includes('Username not found')) {
          error.html('Username not found');
        }
      }
    });
  });
});

var c = new AudioContext();

var keyboardVolume = 0.04;

$('audio').prop('volume', 1);

$(function() {
  var handle = $('#custom-handle');
  $('#slider').slider({
    value: 10,
    create: function() {
      //handle.text( $( this ).slider( "value" ) );
      $('#custom-handle').html('<img src="img/low-volume.png">');
    },
    slide: function(event, ui) {
      //handle.text( ui.value );
      if (ui.value >= 66) {
        $('#custom-handle').html('<img src="img/high-volume.png">');
      } else if (ui.value >= 33) {
        $('#custom-handle').html('<img src="img/mid-volume.png">');
      } else if (ui.value > 0) {
        $('#custom-handle').html('<img src="img/low-volume.png">');
      } else {
        $('#custom-handle').html('<img src="img/no-volume.png">');
      }
    },
    change: function() {
      var value = $('#slider').slider('value');
      value = value / 500;
      keyboardVolume = value;
      $('audio').prop('volume', value);
    }
  });
});

$(function() {
  $('#password').tooltip();
});

$(function() {
  $('#why-register').tooltip({
    position: {
      at: 'center bottom-20'
    }
  });
});

function initOscillator(freq) {
  var osc = c.createOscillator();
  gainNode = c.createGain();
  osc.frequency.setValueAtTime(freq, c.currentTime);
  if (keyboardVolume > 0.2) {
    keyboardVolume = 0.2;
  }
  gainNode.gain.value = keyboardVolume;
  osc.connect(gainNode);
  gainNode.connect(c.destination);
  currentTime = c.currentTime;
  osc.start(currentTime);
  osc.stop(currentTime + 0.5);
}

function playC() {
  initOscillator(261.626);
}

function playCsharp() {
  initOscillator(277.183);
}

function playD() {
  initOscillator(293.665);
}

function playDsharp() {
  initOscillator(311.127);
}

function playE() {
  initOscillator(329.628);
}

function playF() {
  initOscillator(349.228);
}

function playFsharp() {
  initOscillator(369.994);
}

function playG() {
  initOscillator(391.995);
}

function playGsharp() {
  initOscillator(415.305);
}

function playA() {
  initOscillator(440.0);
}

function playAsharp() {
  initOscillator(466.164);
}

function playH() {
  initOscillator(493.883);
}
