var PlayerCard = (function(win, doc) {
	
	var inputs = doc.querySelectorAll('input[type="text"]');
	
	inputs.forEach(function(input) {
		input.addEventListener('blur', function() {
			if(this.value.trim().length > 0)
				this.classList.add('used');
			else
				this.classList.remove('used');
		});
		
		input.addEventListener('keyup', function(e) {
			previewValue(this, e);
		});
		input.addEventListener('paste', function(e) {
			previewValue(this, e);
		});
	});
	
	var previewValue = function(elem, e) {
		var scope = elem.getAttribute('data-scope');
		var value = elem.value;
		var previewInput = document.querySelector('.previewer [data-scope="'+ scope +'"]');
		
		if (scope=='round')
			value = value.replace(/(\d+)/g,'<div class="roundNumber">\$1</div><span class="orangeText">');
		
		if(value.indexOf('orangeText') > -1)
			value += '</span>'
		
		previewInput.innerHTML = value;
	}
	
	var uploadImage = function(input, imageType)
	{
		var file = input.files[0];
		
		var fReader = new FileReader();

		fReader.onload = function() {
			var imageContainer = document.querySelector('.previewer [data-scope="'+ imageType +'"]');
		
			if(imageType == 'teamlogo')
				imageContainer.src = fReader.result;
			else
				imageContainer.setAttribute('style', 'background-image: url('+ fReader.result +');');
		};

		fReader.readAsDataURL(file);
	}
	
	var generateImage = function()
	{
		html2canvas(doc.querySelector('#playercard')).then(canvas => {
			saveAs(canvas.toDataURL(), 'player-card.jpg');
		});
	}
	
	var saveAs = function(uri, filename) {
		var link = document.createElement('a');

		if (typeof link.download === 'string') {

			link.href = uri;
			link.download = filename;

			document.body.appendChild(link);

			link.click();

			document.body.removeChild(link);

		} else {
			window.open(uri);
		}
	}
	
	return {
		uploadImage: uploadImage,
		generateImage: generateImage
	}
	
})(window, document);