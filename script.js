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
		populateList();
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
		} 
	}

	function checkEditPress(e) {
		if(e.keyCode == 13) {
			updateEntry();
		} else if(e.keyCode == 27) {
			abortEditing();
		}
	}

	// build the entire list based on the contents of localStorage
	function populateList() {
		todos = JSON.parse(localStorage.getItem('todos'));
		if(todos.length > 0) {
			for (var i = 0; i <= todos.length -1 ; i++) {
				insertEntry(todos[i]['name'],todos[i]['id'],todos[i]['completed']);
			};
		}
	} 

	function insertEntry(entry, id,status) {
		$('.template li').clone().appendTo('#todo-list');
		$('#todo-list li:last-child label').text(entry);
		$('#todo-list li:last-child').attr('data-id',id);
		if(status) {
			$('#todo-list li:last-child').addClass('completed');
			$('#todo-list li:last-child .toggle').attr('checked', true)
		}
		$('#new-todo').val('');
		addListItemListener(id);
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
		var entry = $('#new-todo').val();
		var id = uuid();
		var todoEntry = {
			'id':id,
			'name':entry,
			'completed':false
		}

		var todos = [];
			if (localStorage.getItem('todos') === null) {
		        todos = [];
		    } else {
		        // Parse the serialized data back into an array of objects
		        todos = JSON.parse(localStorage.getItem('todos'));
		    }

	    // Push the new data (whether it be an object or anything else) onto the array
	    todos.push(todoEntry);
	    // Re-serialize the array back into a string and store it in localStorage
	    localStorage.setItem('todos', JSON.stringify(todos));

		// localStorage.setItem('Todos', JSON.stringify(todoEntry));

		insertEntry(entry,id);
	}

	function addListItemListener(id) {
		$("li[data-id *= '" + id + "']").dblclick(function(event) {			
			// if dblclick was on a label and the parent isn't marked completed.
			if(event.target.nodeName == "LABEL" && (!$(event.target).closest('li').hasClass('completed'))) {
				// remove the 'editing' class from any other todo items and remove any other editor listeners
				$('.editing').removeClass('editing');
				$('.edit').off('keyup');
				var input = $(event.target);
				var text = input.text();
				input.closest('li').addClass('editing');
				input.closest('li').find('.edit').val(text).focus();
				addEditorListener();
			}
		});
		$("li[data-id *= '" + id + "']").click(function(event) {
			if(event.target.nodeName == 'INPUT') {
				var item = $(event.target).closest('li');
				if(item.hasClass('completed')){
					item.removeClass('completed');
					updateCompleted(id, false)
				} else {					
					item.addClass('completed');
					updateCompleted(id, true)
				}
			}
		});
	}

	function addEditorListener() {
		$('.editing .edit').on('keyup', function(e) {
			checkEditPress(e);
		})

	}

	function updateEntry() {
		var id = $('.editing').attr('data-id');
		for(i=0; i <= todos.length-1; i++) {
			if(todos[i]['id'] == id) {				
				todos[i]['name'] = $('.editing .edit').val();
			}
		}
		localStorage.setItem('todos', JSON.stringify(todos));
		$('.editing label').text($('.editing .edit').val());
		$('.editing').removeClass('editing').find('.edit').val('');
	}

	function updateCompleted(id, status) {
		for(i=0; i <= todos.length-1; i++) {
			if(todos[i]['id'] == id) {				
				todos[i]['completed'] = status;
			}
			localStorage.setItem('todos', JSON.stringify(todos));
		}	
	}

	function abortEditing() {
		$('.editing').removeClass('editing');
		$('.edit').val('');
	}

	// refresh count of todos to be completed.

	// add destroy function

	// add complete all function

	// show footer when todos are in list.

	// add filter functions.


	standUp();
});