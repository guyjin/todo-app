$(function() {
	function setListeners() {
		$('#new-todo').keyup(function(e) {
			checkKeyPress(e);
		})
	}

	function checkKeyPress(e) {
		if(e.keyCode == 13) {
			
			insertEntry();
		} else if(e.keyCode == 27) {
			console.log('esc');
		}
	}

	function insertEntry() {
		var entry = $('#new-todo').val();
		$('.template li').clone().appendTo('#todo-list');
		$('#todo-list li:last-child label').text(entry);

		saveEntry(entry);
	}

	function uuid() {
		/*jshint bitwise:false */
		var i, random;
		var uuid = '';

		for (i = 0; i < 32; i++) {
			random = Math.random() * 16 | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += '-';
			}
			uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
		}

		return uuid;
	}

	function saveEntry(entry) {
		var id = uuid();
		var todoEntry = {
			'id':id,
			'name':entry
		}
		localStorage.setItem('Todos', JSON.stringify(todoEntry));
	}



	setListeners();
});