
var container = document.createElement('div');
container.id = 'pixiv-bookmark-filter';
container.style.position = 'fixed';
container.style.left = '50%';
container.style.top = 0;
container.style.width = '0px';
container.style.height = '0px';
container.style.zIndex = 100;
document.body.appendChild(container);

var box = document.createElement('div');
box.style.position = 'absolute';
box.style.left = '-485px';
box.style.top = '0px';
box.style.width = '200px';
box.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
box.style.boxShadow = '0 0 10px black';
box.style.padding = '10px';
box.style.borderBottomLeftRadius = box.style.borderBottomRightRadius = '4px';

container.appendChild(box);

var thresholdText = document.createElement('p');
thresholdText.textContent = 'Threshold';

box.appendChild(thresholdText);

var thresholdBox = document.createElement('input');
thresholdBox.type = 'number';
thresholdBox.valueAsNumber = 0;
thresholdBox.min = 0;
thresholdBox.style.display = 'block-inline';
thresholdBox.style.width = '192px';
thresholdBox.style.height = '20px';

box.appendChild(thresholdBox);

var update = function() {
  var threshold = thresholdBox.valueAsNumber;
  if(isNaN(threshold)) {
    threshold = 0;
  }
  var images = document.querySelectorAll('ul.images li.image');
  Array.prototype.slice.call(images).forEach(function(image) {
    var countNode = image.querySelector('.count-list .bookmark-count');
    var users = countNode ? parseInt(countNode.textContent, 10) : 0;
    var visibility = users >= thresholdBox.valueAsNumber;
    image.querySelector('a p img').style.display = visibility ? 'inline' : 'none';
    image.style.height = visibility ? '250px' : 'auto';
  });
};

thresholdBox.addEventListener('change', function(e) {
  update();
}, false);

var timer;
var nodes = [];

function inserted(e) {
  if(e.target.className.indexOf('images') != -1) {
    setTimeout(update, 10);
  }
}
document.addEventListener('DOMNodeInserted', inserted, false);

