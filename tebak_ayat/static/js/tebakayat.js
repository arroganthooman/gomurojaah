$(document).ready(() => {
	$.ajax({
		url:'/api',
		success: (event) => {
			if (typeof event != 'object') {
				event = JSON.parse(event);
			}
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

const generateArab = (ayat) => {
	let temp;
	let style = "";
	temp = `<p dir="rtl" lang="ar" style="font-size:25px;font-family:'lpmq';background-color:black;color:white; font-size:25px; margin-top:20px; text-align:right">${ayat}</p>`
		
	return temp;
}

function ajaxCallSurat(idxSurat) {
	let info;
	$.ajax({
		url:`https://api.quran.sutanlab.id/surah/${idxSurat+1}`,
		async:false,
		success: (event) => {
			info = event;
		}
	})
	return info;
}


$(".button-tebak").click(() => {
	var start = $("#inputGroupSelect01").val();
	var end = $("#inputGroupSelect02").val();
	var suratTerpilih = getRandom(start, end);
	var suratKedua = getRandom(start,end);
	while(suratTerpilih == suratKedua) {
		suratKedua = getRandom(start,end);
	}
	// console.log(suratKedua + "1");
	var ayatTerpilih;

	$.ajax({
		url:`https://api.quran.sutanlab.id/surah/${suratTerpilih+1}`,
		async:false,
		success: (event) => {
			if (typeof event != 'object') {
				event = JSON.parse(event);
			}
			ayatTerpilih = getRandom(2,event.data.numberOfVerses)-1;
			ayatKedua = ayatTerpilih+1;
			// let ayatKedua = getRandom(1,event.data.numberOfVerses);
			// while (ayatKedua === ayatTerpilih) {
			// 	ayatKedua = getRandom(1,event.data.numberOfVerses);
			// }
			let arabTerpilih = event.data.verses[ayatTerpilih-1].text.arab;
			let audioTerpilih = event.data.verses[ayatTerpilih-1].audio.primary
			let suratTerpilih = event.data.name.transliteration.id;
			let banyakAyatTerpilih = event.data.numberOfVerses; //tadinya banyak ayat

			// suratKedua = ajaxCallSurat(suratKedua);
			// console.log(suratKedua);
			let infoSuratKedua = ajaxCallSurat(suratKedua);
			// console.log(infoSuratKedua);
			let banyakAyatKedua = infoSuratKedua.data.numberOfVerses;
			let namaSuratKedua = infoSuratKedua.data.name.transliteration.id;
			let ayatKetiga = getRandom(2,infoSuratKedua.data.numberOfVerses)-1;
			let ayatKeempat = ayatKetiga+1;



			for (let i=0; i<3; i++) {
				$(".wrapper .container").children().last().remove();
			}

			if (window.innerWidth<= 576) {
				$(".wrapper").css("height", "auto");
				$(".wrapper").css("margin-top", "5vh");
			}


			$(".wrapper .container").append(
				`<div class="row d-flex flex-row justify-content-center">
				${generateArab(arabTerpilih)}
			</div>`);

			$(".wrapper .container").append(`
				<div class="row d-flex flex-row justify-content-center">
				<audio controls>
			  <source src="${audioTerpilih}" type="audio/mpeg">
			Your browser does not support the audio element.
			</audio>
			</div>`)

			if (ayatTerpilih % 4 === 0) {
				$(".wrapper .container").append(
					`<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatTerpilih} dari ${banyakAyatTerpilih}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatKedua} dari ${banyakAyatTerpilih} </button>
					</div>
					<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKetiga} dari ${banyakAyatKedua}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKeempat} dari ${banyakAyatKedua} </button>
					</div>`
				  );
			} else if (ayatTerpilih % 4 === 1) {
					$(".wrapper .container").append(
					`<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatKedua} dari ${banyakAyatTerpilih}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatTerpilih} dari ${banyakAyatTerpilih}</button>
					</div>
					<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKetiga} dari ${banyakAyatKedua}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKeempat} dari ${banyakAyatKedua}</button>
					</div>
					`
				  );
			}else if (ayatTerpilih % 4 === 2) {
					$(".wrapper .container").append(
					`<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatKedua} dari ${banyakAyatTerpilih}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKetiga} dari ${banyakAyatKedua}</button>
					</div>
					<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatTerpilih} dari ${banyakAyatTerpilih}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKeempat} dari ${banyakAyatKedua}</button>
					</div>
					`
				  );
			} else if (ayatTerpilih % 4 === 3) {
					$(".wrapper .container").append(
					`<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatKedua} dari ${banyakAyatTerpilih}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKetiga} dari ${banyakAyatKedua}</button>
					</div>
					<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKeempat} dari ${banyakAyatKedua}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatTerpilih} dari ${banyakAyatTerpilih}</button>
					</div>
					`
				  );
			}
			$(document).on('click','.btn-secondary', function(button) {
				let jawabanSurat = button.target.innerHTML.split(" ")[0];
				let jawabanAyat = button.target.innerHTML.split(" ")[2];
				// for (let i=0; i<3; i++) {
				// 	$(".wrapper .container").children().last().remove();
				// }
				$(".wrapper .container").empty();
				$(".wrapper .container").append(`<div class="row d-flex justify-content-center mb-4">
			      <h1 class="poppins text-white">Tebak Ayat</h1>
			    </div>`)
				if (jawabanAyat == ayatTerpilih && jawabanSurat == suratTerpilih) {
					$(".wrapper .container").append(
						`<div class="row d-flex justify-content-center">
						<h1 style="color:blue; font-family:'Poppins"; font-weight:700>Benar</h1>
						</div>`);
				} else {
					$(".wrapper .container").append(`<div class="row d-flex justify-content-center">
						<h1 style="color:red; font-family:'Poppins"; font-weight:700">Salah</h1>
						</div>`);
				}

				var nomorSurat = getRandom(start, end);
				sleep(2000).then(() => {
					$(".wrapper .container").children().last().remove();
					ajaxCall(start,end,nomorSurat);
				});
				
			})
		}
	})
})




function ajaxCall(start,end,suratTerpilih) {
	var nomorSurat = suratTerpilih;
	var suratKedua = getRandom(start,end);
	while(suratTerpilih == suratKedua) {
		suratKedua = getRandom(start,end);
	}
	$.ajax({
		url:`https://api.quran.sutanlab.id/surah/${suratTerpilih+1}`,
		async:false,
		success: (event) => {
			if (typeof event != 'object') {
				event = JSON.parse(event);
			}
			ayatTerpilih = getRandom(2,event.data.numberOfVerses)-1;
			ayatKedua = ayatTerpilih+1;
			// let ayatKedua = getRandom(1,event.data.numberOfVerses);
			// while (ayatKedua === ayatTerpilih) {
			// 	ayatKedua = getRandom(1,event.data.numberOfVerses);
			// }
			let arabTerpilih = event.data.verses[ayatTerpilih-1].text.arab;
			let audioTerpilih = event.data.verses[ayatTerpilih-1].audio.primary
			let suratTerpilih = event.data.name.transliteration.id;
			let banyakAyatTerpilih = event.data.numberOfVerses; //tadinya banyak ayat

			let infoSuratKedua = ajaxCallSurat(suratKedua);
			let banyakAyatKedua = infoSuratKedua.data.numberOfVerses;
			let namaSuratKedua = infoSuratKedua.data.name.transliteration.id;
			let ayatKetiga = getRandom(2,event.data.numberOfVerses)-1;
			let ayatKeempat = ayatKetiga+1;


			$(".wrapper .container").append(
				`<div class="row d-flex flex-row justify-content-center">
				${generateArab(arabTerpilih)}
			</div>`);



			$(".wrapper .container").append(`
				<div class="row d-flex flex-row justify-content-center">
				<audio controls>
			  <source src="${audioTerpilih}" type="audio/mpeg">
			Your browser does not support the audio element.
			</audio>
			</div>`)

			if (ayatTerpilih % 4 === 0) {
				$(".wrapper .container").append(
					`<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatTerpilih} dari ${banyakAyatTerpilih}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatKedua} dari ${banyakAyatTerpilih} </button>
					</div>
					<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKetiga} dari ${banyakAyatKedua}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKeempat} dari ${banyakAyatKedua} </button>
					</div>`
				  );
			} else if (ayatTerpilih % 4 === 1) {
					$(".wrapper .container").append(
					`<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatKedua} dari ${banyakAyatTerpilih}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatTerpilih} dari ${banyakAyatTerpilih}</button>
					</div>
					<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKetiga} dari ${banyakAyatKedua}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKeempat} dari ${banyakAyatKedua}</button>
					</div>
					`
				  );
			}else if (ayatTerpilih % 4 === 2) {
					$(".wrapper .container").append(
					`<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatKedua} dari ${banyakAyatTerpilih}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKetiga} dari ${banyakAyatKedua}</button>
					</div>
					<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatTerpilih} dari ${banyakAyatTerpilih}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKeempat} dari ${banyakAyatKedua}</button>
					</div>
					`
				  );
			} else if (ayatTerpilih % 4 === 3) {
					$(".wrapper .container").append(
					`<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatKedua} dari ${banyakAyatTerpilih}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKetiga} dari ${banyakAyatKedua}</button>
					</div>
					<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 button-pilih">${namaSuratKedua} ayat ${ayatKeempat} dari ${banyakAyatKedua}</button>
					<button type="button" class="btn btn-secondary m-3 button-pilih">${suratTerpilih} ayat ${ayatTerpilih} dari ${banyakAyatTerpilih}</button>
					</div>
					`
				  );
			}
			$(document).on('click','.btn-secondary', function(button) {
				let jawabanSurat = button.target.innerHTML.split(" ")[0];
				let jawabanAyat = button.target.innerHTML.split(" ")[2];
				// for (let i=0; i<2; i++) {
				// 	$(".wrapper .container").children().last().remove();
				// }
				$(".wrapper .container").empty();
				$(".wrapper .container").append(`<div class="row d-flex justify-content-center mb-4">
			      <h1 class="poppins text-white">Tebak Ayat</h1>
			    </div>`)

				if (jawabanAyat == ayatTerpilih && jawabanSurat == suratTerpilih) {
					$(".wrapper .container").append(
						`<div class="row d-flex justify-content-center">
						<h1 style="color:blue; font-family:'Poppins"; font-weight:700>Benar</h1>
						</div>`);
				} else {
					$(".wrapper .container").append(`<div class="row d-flex justify-content-center">
						<h1 style="color:red; font-family:'Poppins"; font-weight:700">Salah</h1>
						</div>`);
				}
				sleep(2000).then(() => {});
			})
		}
	})
}
