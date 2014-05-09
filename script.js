$(function() {

	var todos = '';
	function standUp() {
		// get entries from localstorage if they exist.
		// populate the list with entries and ids.
		
		if(localStorage && localStorage.length > 0) {

			// run populateList to insert all the entries
			// populateList();
		} else {
			var a = [];
			localStorage.setItem('todos',JSON.stringify(a));
		}

		// setListners after the list has been built.
		setListeners();
	}
	function setListeners() {
		//listen for keypresses
		$('#new-todo').keyup(function(e) {
			// check which key has been pressed.
			checkKeyPress(e);
		})
	}

	function checkKeyPress(e) {
		// if the key is the 'enter' key
		if(e.keyCode == 13) {
			//save the entry to localStorage
			saveEntry();

			//if the key is the 'esc' key
		} else if(e.keyCode == 27) {
			console.log('esc');
		}
	}

	// build the entire list based on the contents of localStorage
	function populateList() {
		for (var i = localStorage.length - 1; i >= 0; i--) {
			//localStorage[i]
			console.log("There are entries in localStorage");
		};
	} 

	function insertEntry(entry, id) {
		var entry = $('#new-todo').val();
		$('.template li').clone().appendTo('#todo-list');
		$('#todo-list li:last-child label').text(entry);
		$('#todo-list li:last-child').attr('data-id',id);
		$('#new-todo').val('');
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

		var a = [];
			if (localStorage.getItem('todos') === null) {
		        a = [];
		    } else {
		        // Parse the serialized data back into an array of objects
		        a = JSON.parse(localStorage.getItem('todos'));
		    }

	    // Push the new data (whether it be an object or anything else) onto the array
	    a.push(todoEntry);
	    // Re-serialize the array back into a string and store it in localStorage
	    localStorage.setItem('todos', JSON.stringify(a));

		// localStorage.setItem('Todos', JSON.stringify(todoEntry));

		insertEntry(entry,id);
	}



	standUp();
});