// JS for all web interface editing / deletion of scrobble data

function toggleDeleteConfirm(element) {
	element.parentElement.parentElement.classList.toggle('active');
}

function deleteScrobble(id,element) {
	element.parentElement.parentElement.parentElement.classList.add('removed');

	neo.xhttpreq("/apis/mlj_1/delete_scrobble",data={'timestamp':id},method="POST",callback=(()=>null),json=true);

}


function selectAll(e) {
	// https://stackoverflow.com/a/6150060/6651341
	var range = document.createRange();
    range.selectNodeContents(e);
	var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function editEntity() {
	var namefield = document.getElementById('main_entity_name');
	namefield.contentEditable = "plaintext-only";

	// dont allow new lines, done on enter
	namefield.addEventListener('keypress',function(e){
		if (e.which === 13) {
			e.preventDefault();
			doneEditing();
		}

	})
	// emergency, not pretty because it will move cursor
	namefield.addEventListener('input',function(e){
		if (namefield.innerHTML.includes("\n")) {
			namefield.innerHTML = namefield.innerHTML.replace("\n","");
		}

	})

	// manually clicking away
	namefield.addEventListener('blur',function(e){
		doneEditing();

	})

	namefield.focus();
	selectAll(namefield);
}

function doneEditing() {
	var namefield = document.getElementById('main_entity_name');
	namefield.contentEditable = "false";
	newname = document.getElementById('main_entity_name').innerHTML;

	neo.xhttpreq(
		"/apis/mlj_1/edit_artist",
		data={'oldname':original_entity,'newname':newname},
		method="POST",
		callback=(()=>window.location = "?artist=" + newname),
		json=true
	);
}
