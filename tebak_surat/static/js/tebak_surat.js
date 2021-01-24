$(document).ready(() => {
	$.ajax({
		url:'/api',
		success: (event) => {
			for (let i=0; i<event.data.length; i++) {
				$(".custom-select").append(
					`<option value="${i}">${i+1}. ${event.data[i].name.transliteration.id}</option>`);
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

const nama_surat = (nomor) => {
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


$(".button-tebak").click(() => {
	var start = parseInt($("#inputGroupSelect01").val());
	var end = parseInt($("#inputGroupSelect02").val())

	if (start === end || start>end || end-start < 3) {
		if (start>end) {
			alert("Format input terbalik");
		} else {
			alert("Start harus berjarak minimal 3 surat dengan end");
		}
		return;
	};
	var suratTerpilih = getRandom(start, end);
	var ayatTerpilih;

	$.ajax({
		url:`https://api.quran.sutanlab.id/surah/${suratTerpilih+1}`,
		success: (event) => {
			let indexSurat = event.data.number-1;
			ayatTerpilih = getRandom(1,event.data.numberOfVerses);
			let suratKedua = getRandom(start, end);
			while (suratKedua === indexSurat) {
				suratKedua = getRandom(start, end);
			}

			let suratKetiga = getRandom(start,end);
			while (suratKedua === suratKetiga || indexSurat === suratKetiga) {
				suratKetiga = getRandom(start, end);
			}

			let suratKeempat = getRandom(start,end);
			
			while (suratKeempat === suratKetiga || suratKeempat === suratKedua || suratKeempat === indexSurat) {
				suratKeempat = getRandom(start,end);
			}

			let audioTerpilih = event.data.verses[ayatTerpilih-1].audio.primary
			let suratTerpilih = event.data.name.transliteration.id;
			let arabTerpilih = event.data.verses[ayatTerpilih-1].text.arab;
			let namaSuratKedua = nama_surat(suratKedua);
			let namaSuratKetiga = nama_surat(suratKetiga);
			let namaSuratKeempat = nama_surat(suratKeempat);

			if (window.innerWidth<= 576) {
				$(".wrapper").css("height", "auto");
				$(".wrapper").css("margin-top", "5vh");
			}

			for (let i=0; i<3; i++) {
				$(".wrapper .container").children().last().remove();
			}

			$(".wrapper .container").append(`
				<div class="row d-flex flex-row justify-content-center mt-3"> 
					<p dir="rtl" lang="ar" style="font-size:25px;font-family:'lpmq';background-color:black; color:white;text-align:right">${arabTerpilih}</p> 
				</div>
				<div class="row d-flex flex-row justify-content-center">
					<audio controls>
				  		<source src="${audioTerpilih}" type="audio/mpeg">
						Your browser does not support the audio element.
					</audio>
				</div>`  
			)

			let arr = [namaSuratKedua, namaSuratKetiga, namaSuratKeempat];
			ayatTerpilih = ayatTerpilih%4;
			arr.splice(ayatTerpilih, 0, suratTerpilih);

			for (let i=0; i<3; i+=2) {
				$(".wrapper .container").append(
					`<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 mt-4 button-pilih">${arr[i]}</button>
					<button type="button" class="btn btn-secondary m-3 mt-4 button-pilih">${arr[i+1]}</button>
					</div>`
				  );
			}

			$(document).on('click','.btn-secondary', function(button) {
				let jawaban = button.target.innerHTML;

				for (let i=0; i<4; i++) {
					$(".wrapper .container").children().last().remove();
				}

				if (jawaban == suratTerpilih) {
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
	$.ajax({
		url:`https://api.quran.sutanlab.id/surah/${suratTerpilih+1}`,
		success: (event) => {
			let indexSurat = event.data.number-1
			ayatTerpilih = getRandom(1,event.data.numberOfVerses);
			let suratKedua = getRandom(start, end);
			while (suratKedua === indexSurat) {
				suratKedua = getRandom(start, end);
			}

			let suratKetiga = getRandom(start,end);
			while (suratKedua === suratKetiga || indexSurat === suratKetiga) {
				suratKetiga = getRandom(start, end);
			}

			let suratKeempat = getRandom(start,end);
			
			while (suratKeempat === suratKetiga || suratKeempat === suratKedua || suratKeempat === indexSurat) {
				suratKeempat = getRandom(start,end);
			}

			let audioTerpilih = event.data.verses[ayatTerpilih-1].audio.primary
			let suratTerpilih = event.data.name.transliteration.id;
			let arabTerpilih = event.data.verses[ayatTerpilih-1].text.arab;
			let namaSuratKedua = nama_surat(suratKedua);
			let namaSuratKetiga = nama_surat(suratKetiga);
			let namaSuratKeempat = nama_surat(suratKeempat);


			let array = [namaSuratKedua, namaSuratKetiga, namaSuratKeempat];
			ayatTerpilih = ayatTerpilih%4;
			array.splice(ayatTerpilih, 0, suratTerpilih);

			$(".wrapper .container").append(`
				<div class="row d-flex flex-row justify-content-center mt-3"> 
					<p dir="rtl" lang="ar" style="font-size:25px;font-family:'lpmq';background-color:black; color:white;text-align:right">${arabTerpilih}</p> 
				</div>
				<div class="row d-flex flex-row justify-content-center">
				<audio controls>
			  <source src="${audioTerpilih}" type="audio/mpeg">
			Your browser does not support the audio element.
			</audio>
			</div>`)

			for (let i=0; i<3; i+=2) {
				$(".wrapper .container").append(
					`<div class="row d-flex flex-row justify-content-center">
					<button type="button" class="btn btn-secondary m-3 mt-4 button-pilih">${array[i]}</button>
					<button type="button" class="btn btn-secondary m-3 mt-4 button-pilih">${array[i+1]}</button>
					</div>`
				  );
			}

			$(document).on('click','.btn-secondary', function(button) {
				let jawaban = button.target.innerHTML;
				$(".wrapper .container").children().last().remove();
				if (jawaban == suratTerpilih) {
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