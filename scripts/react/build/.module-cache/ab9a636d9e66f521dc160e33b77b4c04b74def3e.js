var g_username = "admin";
var g_password = "admin";
var g_bookData = {};
var g_currentBook = -1;

(function (){
	//main();
	process_data(
		{
			index: ["id","name"],
			book: [
			{
				id:"123",
				name:"eiei"
			}
			]
		}
	);
})();



function main () {
	console.log("main function called");
	$.getJSON( "http://127.0.0.1:3000", process_data);
}

function process_data(data) {
	if(!data){
		throw "new bookData is undefined"
	}
	if(!data.index){
		throw "Index of new bookData is not found";
	}
	if(!data.book){
		throw "Books of new bookData is not found";
	}
	g_bookData = data;
	update();
}

function update(){
	React.render(
		React.createElement(BookTable, {index: g_bookData.index, list: g_bookData.book}),
		document.getElementById('list')
	);
}

function borrow_book(){
	if(currentBook < 0)
		throw "No book selected";
	var request = {
		"auth":{
			"usr":g_username,
			"pass":g_password
		},
		"book":{
			"key":g_currentBook
		}
	}
	request = JSON.stringify(request);
	$.post( "http://127.0.0.1/borrow:3000", request, checkResponse);
}

function return_book(){
	if(currentBook < 0)
		throw "No book selected";
	var request = {
		"auth":{
			"usr":g_username,
			"pass":g_password
		},
		"book":{
			"key":g_currentBook
		}
	}
	request = JSON.stringify(request);
	$.post( "http://127.0.0.1/return:3000", request, checkResponse);
}

function checkResponse(res){
	if(data.status != "success")
		throw data.error;
}