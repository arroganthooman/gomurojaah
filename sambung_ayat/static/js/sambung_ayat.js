$(document).ready(() => {
	$.ajax({
		url:'/api',
		async:false,
		success: (event) => {
			for (let i=0; i<event.data.length; i++) {
				$(".custom-select").append(
					`<option value="${i}">${i+1}.${event.data[i].name.transliteration.id}</option>`);
			}
		}
	})
})

function getRandom(min, max) {
  	min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var nama_surat = (nomor) => {
	var nama;
	$.ajax({
		url:`https://api.quran.sutanlab.id/surah/${nomor+1}`,
		async:false,
		success: (event) => {
			nama = event.data.name.transliteration.id;
		}
	});
	return nama;
}

function generateAyat(idxSurat) {
	var banyakAyat;

	$.ajax({
		url:`https://api.quran.sutanlab.id/surah/${idxSurat+1}`,
		async:false,
		success: (event) => {
			banyakAyat = event.data.numberOfVerses;
		}
	})

	return banyakAyat;
}

function generateAudio(idxSurat, ayat) {
	let temp;
	$.ajax({
		url:`https://api.quran.sutanlab.id/surah/${idxSurat+1}/${ayat+1}`,
		async:false,
		success: (event) => {
			temp = `
				<audio controls class="ml-3">
			  <source src="${event.data.audio.primary}" type="audio/mpeg">
			Your browser does not support the audio element.
			</audio>`
		}
	})
	return temp;
}

const generateArab = (idxSurat, ayat) => {
	let temp;
	$.ajax({
		url:`https://api.quran.sutanlab.id/surah/${idxSurat+1}/${ayat+1}`,
		async:false,
		success:(event) => {
			let style = "background-color:white;color:black; font-size:25px; margin-top:20px; text-align:right;";
			temp = `<p dir="rtl" lang="ar" style=${style}>${event.data.text.arab}</p>`
		}
	})
	return temp;
}

function generateButton(option, value) {
	let acc = `<button class="btn btn-light button-pilih jawaban" value=${value}>${option}</button>`;
	return acc;
}


$(".button-tebak").click(() => {
	var start = $("#inputGroupSelect01").val();
	var end = $("#inputGroupSelect02").val();

	var idxSuratTerpilih = getRandom(start,end);
	var ayatTerpilih = getRandom(2,generateAyat(idxSuratTerpilih))-1;
	var idxSuratKedua = getRandom(start,end);

	var ayatKedua = getRandom(1,generateAyat(idxSuratKedua));
	while (ayatKedua == ayatTerpilih || ayatKedua == ayatTerpilih+1) {
		ayatKedua = getRandom(1,generateAyat(idxSuratKedua));
	}

	var audioTerpilih = generateAudio(idxSuratTerpilih, ayatTerpilih-1);
	var arabTerpilih = generateArab(idxSuratTerpilih,ayatTerpilih-1)
	var audioTerpilihJawaban = generateAudio(idxSuratTerpilih, ayatTerpilih);
	var arabJawaban = generateArab(idxSuratTerpilih, ayatTerpilih);

	var audioKedua = generateAudio(idxSuratKedua, ayatKedua-1);
	var arabKedua = generateArab(idxSuratKedua, ayatKedua-1)
	for (let i=0; i<3; i++) {
		$(".wrapper .container").children().last().remove();
	}

	$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center"> ${arabTerpilih} </div>`);
	$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center"> ${audioTerpilih} </div>`);

	if (ayatTerpilih %2 == 0) {
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${generateButton("A",1)} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${arabJawaban} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${generateButton("B",0)} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${arabKedua} </div>`);
	} else {
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${generateButton("A",0)} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${arabKedua} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${generateButton("B",1)} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${arabJawaban} </div>`);
	}

	$(document).on('click',".jawaban", function (button) {
		for (let i = 0; i < 6; i++) {
			$(".wrapper .container").children().last().remove();
		}

		if (button.target.value == 1) {
			$(".wrapper .container").append('<div class="row d-flex flex-row justify-content-center"><h1 style="color:blue;">Benar</h1></div>');
		} else {
			$(".wrapper .container").append('<div class="row d-flex flex-row justify-content-center"><h1 style="color:red;">Salah</h1></div>')
		}

		sleep(2000).then(() => {
			$(".wrapper .container").children().last().remove();
			ajaxCall(start,end);
		});
	})
})


function ajaxCall(start,end) {

	let idxSuratTerpilih = getRandom(start,end);
	let ayatTerpilih = getRandom(2,generateAyat(idxSuratTerpilih))-1;
	let idxSuratKedua = getRandom(start,end);

	let ayatKedua = getRandom(1,generateAyat(idxSuratKedua));
	while (ayatKedua == ayatTerpilih || ayatKedua == ayatTerpilih+1) {
		ayatKedua = getRandom(1,generateAyat(idxSuratKedua));
	}

	let audioTerpilih = generateAudio(idxSuratTerpilih, ayatTerpilih-1);
	let audioTerpilihJawaban = generateAudio(idxSuratTerpilih, ayatTerpilih);
	var arabTerpilih = generateArab(idxSuratTerpilih,ayatTerpilih-1)

	let audioKedua = generateAudio(idxSuratKedua, ayatKedua-1);

	var arabJawaban = generateArab(idxSuratTerpilih, ayatTerpilih);
	var arabKedua = generateArab(idxSuratKedua, ayatKedua-1)

	$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center"> ${arabTerpilih} </div>`);
	$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center"> ${audioTerpilih} </div>`);

	if (ayatTerpilih %2 == 0) {
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${generateButton("A",1)} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${arabJawaban} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${generateButton("B",0)} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${arabKedua} </div>`);
	} else {
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${generateButton("A",0)} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${arabKedua} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${generateButton("B",1)} </div>`);
		$(".wrapper .container").append(`<div class="row d-flex flex-row justify-content-center mt-3"> ${arabJawaban} </div>`);
	}

	$(document).on('click',".jawaban", function (button) {
		$(".wrapper .container").children().last().remove();

		if (button.target.value == 1) {
			$(".wrapper .container").append('<div class="row d-flex flex-row justify-content-center"><h1 style="color:blue;">Benar</h1></div>');
		} else {
			$(".wrapper .container").append('<div class="row d-flex flex-row justify-content-center"><h1 style="color:red;">Salah</h1></div>')
		}

		sleep(2000).then(() => {});
	})
}
