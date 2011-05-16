
var container = document.createElement('div');
container.id = 'pixiv-bookmark-filter';
container.style.position = 'fixed';
container.style.left = 0;
container.style.top = 0;
container.style.width = '100%';
container.style.zIndex = 100;
document.body.appendChild(container);

var box = document.createElement('div');
box.style.marginLeft = 'auto';
box.style.marginRight = 'auto';
box.style.width = '970px';

container.appendChild(box);

var main = document.createElement('div');
main.style.width = '200px';
main.style.padding = '10px';

main.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
main.style.boxShadow = '0 0 10px black';

box.appendChild(main);

var thresholdText = document.createElement('p');
thresholdText.textContent = 'Threshold';

main.appendChild(thresholdText);

var thresholdBox = document.createElement('input');
thresholdBox.type = 'number';
thresholdBox.valueAsNumber = 0;
thresholdBox.min = 0;
thresholdBox.style.display = 'block-inline';
thresholdBox.style.width = '192px';
thresholdBox.style.height = '20px';

main.appendChild(thresholdBox);

var update = function() {
  var threshold = thresholdBox.valueAsNumber;
  if(isNaN(threshold)) {
    threshold = 0;
  }
  var images = document.querySelectorAll('ul.images li.image');
  Array.prototype.slice.call(images).forEach(function(image) {
    var users = 0;
    if(image.querySelector('.count-list li a').textContent.match(/([0-9]+)/)) {
      users = parseInt(RegExp.$1, 10);
    }
    image.querySelector('a p img').style.visibility =
      (users >= thresholdBox.valueAsNumber) ? 'visible' : 'hidden';
  });
};

thresholdBox.addEventListener('change', function(e) {
  update();
}, false);

var timer;
var nodes = [];

function inserted(e) {
  nodes.push(e.target);
  clearTimeout(timer);
  timer = setTimeout(function() {
    nodes.forEach(function(node) {
      if(node.className.indexOf('images') != -1) {
        update();
      }
    });
    nodes = [];
  }, 50);
}
document.addEventListener('DOMNodeInserted', inserted, false);

