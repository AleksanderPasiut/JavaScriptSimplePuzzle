var board = [ [1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16] ];

function Init()
{
	Randomize();
}

function Randomize()
{
	for (var c = 0; c < 16; c++)
		for (var i = 0; i < 4; i++)
			for (var j = 0; j < 4; j++)
			{
				var aname = 'spot' + i + j;
				
				var x = Math.floor(Math.random()*4);
				var y = Math.floor(Math.random()*4);
				
				var bname = 'spot' + x + y;
				
				ReplaceInBoard(i, j, x, y);
				ReplacePictures(aname, bname);
			}
}

function ReplaceInBoard(old_row, old_col, new_row, new_col)
{
	var tmp = board[old_row][old_col];
	board[old_row][old_col] = board[new_row][new_col];
	board[new_row][new_col] = tmp;
}

function ReplacePictures(xcurrent, xnew)
{
	var nsource = document.images[xnew].src;
	document.images[xnew].src = document.images[xcurrent].src;
	document.images[xcurrent].src = nsource;
}

function Change(row, col)
{
	Move(row, col, row, col-1);
	Move(row, col, row, col+1);
	Move(row, col, row-1, col);
	Move(row, col, row+1, col);
	
	CheckForWin();
}

function Move(old_row, old_col, new_row, new_col)
{
	var new_name = 'spot' + new_row + new_col;
	
	if (document.images[new_name])
	{	
		if (board[new_row][new_col] == 16)
		{
			var old_name = 'spot' + old_row + old_col;
			
			ReplaceInBoard(old_row, old_col, new_row, new_col);
			ReplacePictures(old_name, new_name);
		}
	}
}

function CheckForWin()
{
	var win = 1;
	
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++)
			if (board[i][j] != 4*i+j+1)
				win = 0;
				
	if (win == 1)
	{
		document.getElementById("status").innerHTML = "IN ORDER";
		document.getElementById("status").style.color = "#00FF00";
	}
	else
	{
		document.getElementById("status").innerHTML = "SCRAMBLED";
		document.getElementById("status").style.color = "#CC3333";
	}
}

var MODE = { EUROPE : 0, SPIDER : 1 };
function ChangeMode(new_mode)
{
	board = [ [1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16] ];
	
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++)
			switch(new_mode)
			{
			case MODE.EUROPE: document.images['spot'+i+j].src = ".\\PctSet\\europe\\Pct"+i+j+".png"; break;
			case MODE.SPIDER: document.images['spot'+i+j].src = ".\\PctSet\\spider\\Pct"+i+j+".png"; break;
			}
}

function Scramble(new_mode)
{
	ChangeMode(new_mode);
	Randomize();
}